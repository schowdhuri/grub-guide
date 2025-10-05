#!/usr/bin/env node

/**
 * Extract coordinates from Google Maps Place URLs in CSV
 *
 * Reads: .plan/thailand-places.csv
 * Outputs: src/data/chiangMaiPlaces.ts, src/data/bangkokPlaces.ts
 *
 * Requires: GOOGLE_MAPS_API_KEY in .env
 */

const fs = require('fs');
const https = require('https');
const csvParser = require('csv-parser');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const CSV_FILE = '.plan/thailand-places.csv';
const DELAY_MS = 150; // Rate limiting between API calls

// City boundaries (approximate)
const CHIANG_MAI_CENTER = { lat: 18.7883, lng: 98.9853 };
const BANGKOK_CENTER = { lat: 13.7563, lng: 100.5018 };
const CITY_RADIUS_KM = 50;

if (!API_KEY) {
  console.error('❌ Error: GOOGLE_MAPS_API_KEY not found in .env file');
  process.exit(1);
}

/**
 * Parse CSV and extract place data
 */
async function parseCSV() {
  return new Promise((resolve, reject) => {
    const places = [];

    fs.createReadStream(CSV_FILE)
      .pipe(csvParser())
      .on('data', (row) => {
        const title = row.Title?.trim();
        const url = row.URL?.trim();
        const note = row.Note?.trim();
        const tags = row.Tags?.trim();

        if (title && url) {
          places.push({ title, url, note, tags });
        }
      })
      .on('end', () => resolve(places))
      .on('error', reject);
  });
}

/**
 * Extract Place ID from Google Maps URL
 */
function extractPlaceId(url) {
  // Pattern 1: /data=!4m2!3m1!1s{PLACE_ID}
  const match1 = url.match(/1s([^?&!]+)/);
  if (match1) return match1[1];

  // Pattern 2: /place/{NAME}/data=!4m2!3m1!1s{PLACE_ID}
  const match2 = url.match(/data=!.*?1s([^?&!]+)/);
  if (match2) return match2[1];

  // Pattern 3: Dropped pin with coordinates /search/{LAT},{LNG}
  const coordMatch = url.match(/search\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return {
      type: 'coordinates',
      lat: parseFloat(coordMatch[1]),
      lng: parseFloat(coordMatch[2])
    };
  }

  return null;
}

/**
 * Fetch place details using Text Search API
 * Works with place names - avoids Place ID format issues
 */
async function fetchPlaceDetailsByName(placeName, locationBias = null) {
  return new Promise((resolve, reject) => {
    // Build query with Thailand location bias
    let query = encodeURIComponent(placeName + ' Thailand');
    let bias = locationBias ? `&location=${locationBias.lat},${locationBias.lng}&radius=50000` : '';

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}${bias}&key=${API_KEY}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          if (json.status === 'OK' && json.results && json.results.length > 0) {
            const place = json.results[0]; // Take first result

            resolve({
              place_id: place.place_id,
              name: place.name,
              geometry: place.geometry,
              formatted_address: place.formatted_address || '',
              types: place.types || []
            });
          } else if (json.status === 'ZERO_RESULTS') {
            reject(new Error('No results found'));
          } else {
            reject(new Error(`API error: ${json.status} - ${json.error_message || 'Unknown error'}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Calculate distance between two coordinates (km)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Determine if place is in Chiang Mai
 */
function isChiangMai(lat, lng) {
  const distance = calculateDistance(lat, lng, CHIANG_MAI_CENTER.lat, CHIANG_MAI_CENTER.lng);
  return distance < CITY_RADIUS_KM;
}

/**
 * Infer category from place name
 */
function inferCategory(name) {
  const nameLower = name.toLowerCase();

  if (nameLower.includes('khao soi') || nameLower.includes('ข้าวซอย')) {
    return 'Khao Soi';
  }
  if (nameLower.includes('pork leg') || nameLower.includes('khao kaa moo') || nameLower.includes('kha mu') || nameLower.includes('ขาหมู')) {
    return 'Pork Leg';
  }
  if (nameLower.includes('vegetarian') || nameLower.includes('vegan') || nameLower.includes('เจ')) {
    return 'Vegetarian';
  }
  if (nameLower.includes('noodle') || nameLower.includes('kuay teow') || nameLower.includes('ก๋วยเตี๋ยว')) {
    return 'Noodles';
  }
  if (nameLower.includes('duck') || nameLower.includes('เป็ด')) {
    return 'Duck';
  }
  if (nameLower.includes('market') || nameLower.includes('ตลาด')) {
    return 'Market';
  }
  if (nameLower.includes('crispy pork') || nameLower.includes('หมูกรอบ')) {
    return 'Crispy Pork';
  }
  if (nameLower.includes('rice') || nameLower.includes('ข้าว')) {
    return 'Rice Dishes';
  }

  return undefined;
}

/**
 * Process all places
 */
async function processPlaces() {
  console.log('🔍 Parsing CSV...');
  const csvPlaces = await parseCSV();
  console.log(`✓ Found ${csvPlaces.length} places in CSV\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < csvPlaces.length; i++) {
    const place = csvPlaces[i];
    const placeIdData = extractPlaceId(place.url);

    try {
      let placeDetails;

      // Handle dropped pins (coordinates only)
      if (placeIdData && placeIdData.type === 'coordinates') {
        placeDetails = {
          place_id: `coord_${placeIdData.lat}_${placeIdData.lng}`,
          name: place.title,
          geometry: {
            location: {
              lat: placeIdData.lat,
              lng: placeIdData.lng
            }
          },
          formatted_address: 'Address not available (dropped pin)',
          types: ['point_of_interest']
        };
        console.log(`📍 [${i + 1}/${csvPlaces.length}] ${place.title}: Using coordinates from URL`);
      } else {
        // Use Text Search API with place name
        // Determine location bias based on place name
        const locationBias = place.title.toLowerCase().includes('chiang mai') ||
                            place.title.includes('เชียงใหม่')
          ? CHIANG_MAI_CENTER
          : BANGKOK_CENTER;

        placeDetails = await fetchPlaceDetailsByName(place.title, locationBias);
        console.log(`✓ [${i + 1}/${csvPlaces.length}] ${place.title}`);
      }

      const lat = placeDetails.geometry.location.lat;
      const lng = placeDetails.geometry.location.lng;
      const category = inferCategory(place.title);

      results.push({
        id: placeDetails.place_id,
        name: placeDetails.name || place.title,
        coordinates: { lat, lng },
        address: placeDetails.formatted_address || '',
        googleMapsUrl: place.url,
        placeTypes: placeDetails.types || [],
        category,
        tags: place.tags ? place.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        notes: place.note || undefined,
        phoneNumber: placeDetails.international_phone_number || undefined,
        isChiangMai: isChiangMai(lat, lng)
      });

      successCount++;

      // Rate limiting (skip for dropped pins with coordinates)
      if (!placeIdData || placeIdData.type !== 'coordinates') {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }

    } catch (error) {
      console.log(`✗ [${i + 1}/${csvPlaces.length}] ${place.title}: ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n📊 Summary: ${successCount} successful, ${failCount} failed\n`);

  return results;
}

/**
 * Write TypeScript data file
 */
function writeDataFile(filename, places, cityName) {
  const content = `/**
 * ${cityName} places data
 * Auto-generated from CSV on ${new Date().toISOString().split('T')[0]}
 *
 * To regenerate: npm run fetch-coordinates
 */

import { PlaceData } from '@site/src/types/places';

export const ${cityName.toLowerCase().replace(/\s+/g, '')}Places: PlaceData[] = ${JSON.stringify(places, null, 2)};
`;

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✓ Wrote ${places.length} places to ${filename}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting place coordinate extraction\n');
  console.log(`API Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}\n`);

  try {
    const allPlaces = await processPlaces();

    // Separate by city
    const chiangMaiPlaces = allPlaces.filter(p => p.isChiangMai);
    const bangkokPlaces = allPlaces.filter(p => !p.isChiangMai);

    // Remove the isChiangMai flag before writing
    chiangMaiPlaces.forEach(p => delete p.isChiangMai);
    bangkokPlaces.forEach(p => delete p.isChiangMai);

    console.log(`\n📍 City breakdown:`);
    console.log(`   Chiang Mai: ${chiangMaiPlaces.length}`);
    console.log(`   Bangkok: ${bangkokPlaces.length}\n`);

    // Write data files
    if (chiangMaiPlaces.length > 0) {
      writeDataFile('src/data/chiangMaiPlaces.ts', chiangMaiPlaces, 'Chiang Mai');
    }

    if (bangkokPlaces.length > 0) {
      writeDataFile('src/data/bangkokPlaces.ts', bangkokPlaces, 'Bangkok');
    }

    console.log('\n✅ Done! You can now manually enhance the data with:');
    console.log('   - Thai names (nameLocal)');
    console.log('   - Photos (photos[])');
    console.log('   - Ratings (myRating)');
    console.log('   - Notes (notes)');
    console.log('   - Must-try dishes (mustTry[])\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();

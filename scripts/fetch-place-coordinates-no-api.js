#!/usr/bin/env node

/**
 * Extract coordinates from Google Maps URLs WITHOUT API
 * Uses URL redirect to get coordinates directly
 *
 * Reads: .plan/thailand-places.csv
 * Outputs: src/data/chiangMaiPlaces.ts, src/data/bangkokPlaces.ts
 */

const fs = require("fs");
const https = require("https");
const { exec } = require("child_process");
const util = require("util");
const csvParser = require("csv-parser");

const execPromise = util.promisify(exec);

const CSV_FILE = ".plan/thailand-places.csv";
const DELAY_MS = 100; // Rate limiting

// City boundaries (approximate)
const CHIANG_MAI_CENTER = { lat: 18.7883, lng: 98.9853 };
const BANGKOK_CENTER = { lat: 13.7563, lng: 100.5018 };
const CITY_RADIUS_KM = 50;

/**
 * Parse CSV and extract place data
 */
async function parseCSV() {
  return new Promise((resolve, reject) => {
    const places = [];

    fs.createReadStream(CSV_FILE)
      .pipe(csvParser())
      .on("data", (row) => {
        const title = row.Title?.trim();
        const url = row.URL?.trim();
        const note = row.Note?.trim();
        const tags = row.Tags?.trim();

        if (title && url) {
          places.push({ title, url, note, tags });
        }
      })
      .on("end", () => resolve(places))
      .on("error", reject);
  });
}

/**
 * Extract coordinates from Google Maps URL using curl redirect
 */
async function extractCoordinatesFromURL(url) {
  try {
    // Check for dropped pin pattern first
    const coordMatch = url.match(/search\/(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return {
        lat: parseFloat(coordMatch[1]),
        lng: parseFloat(coordMatch[2]),
      };
    }

    // Follow redirect and extract coordinates from final URL
    const command = `curl -sL "${url}" 2>/dev/null | grep -o '@[0-9][0-9.]*,[0-9][0-9.]*' | head -1`;
    const { stdout } = await execPromise(command);

    const match = stdout.trim().match(/@([0-9.]+),([0-9.]+)/);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Calculate distance between two coordinates (km)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Determine if place is in Chiang Mai
 */
function isChiangMai(lat, lng) {
  const distance = calculateDistance(
    lat,
    lng,
    CHIANG_MAI_CENTER.lat,
    CHIANG_MAI_CENTER.lng
  );
  return distance < CITY_RADIUS_KM;
}

/**
 * Infer category from place name
 */
function inferCategory(name) {
  const nameLower = name.toLowerCase();

  if (nameLower.includes("khao soi") || nameLower.includes("ข้าวซอย")) {
    return "Khao Soi";
  }
  if (
    nameLower.includes("pork leg") ||
    nameLower.includes("khao kaa moo") ||
    nameLower.includes("kha mu") ||
    nameLower.includes("ขาหมู")
  ) {
    return "Pork Leg";
  }
  if (
    nameLower.includes("vegetarian") ||
    nameLower.includes("vegan") ||
    nameLower.includes("เจ")
  ) {
    return "Vegetarian";
  }
  if (
    nameLower.includes("noodle") ||
    nameLower.includes("kuay teow") ||
    nameLower.includes("ก๋วยเตี๋ยว")
  ) {
    return "Noodles";
  }
  if (nameLower.includes("duck") || nameLower.includes("เป็ด")) {
    return "Duck";
  }
  if (nameLower.includes("market") || nameLower.includes("ตลาด")) {
    return "Market";
  }
  if (nameLower.includes("crispy pork") || nameLower.includes("หมูกรอบ")) {
    return "Crispy Pork";
  }
  if (nameLower.includes("rice") || nameLower.includes("ข้าว")) {
    return "Rice Dishes";
  }

  return undefined;
}

/**
 * Process all places
 */
async function processPlaces() {
  console.log("🔍 Parsing CSV...");
  const csvPlaces = await parseCSV();
  console.log(`✓ Found ${csvPlaces.length} places in CSV\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < csvPlaces.length; i++) {
    const place = csvPlaces[i];

    try {
      const coords = await extractCoordinatesFromURL(place.url);

      if (!coords) {
        console.log(
          `✗ [${i + 1}/${csvPlaces.length}] ${place.title}: Could not extract coordinates`
        );
        failCount++;
        continue;
      }

      const category = inferCategory(place.title);

      results.push({
        id: `place_${i}`,
        name: place.title,
        coordinates: coords,
        address: "", // We don't have address without API
        googleMapsUrl: place.url,
        placeTypes: [],
        category,
        tags: place.tags
          ? place.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        notes: place.note || undefined,
        isChiangMai: isChiangMai(coords.lat, coords.lng),
      });

      console.log(
        `✓ [${i + 1}/${csvPlaces.length}] ${place.title} (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
      );
      successCount++;

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    } catch (error) {
      console.log(
        `✗ [${i + 1}/${csvPlaces.length}] ${place.title}: ${error.message}`
      );
      failCount++;
    }
  }

  console.log(
    `\n📊 Summary: ${successCount} successful, ${failCount} failed\n`
  );

  return results;
}

/**
 * Write TypeScript data file
 */
function writeDataFile(filename, places, cityName) {
  const content = `/**
 * ${cityName} places data
 * Auto-generated from CSV on ${new Date().toISOString().split("T")[0]}
 *
 * To regenerate: npm run fetch-coordinates
 */

import { PlaceData } from '@site/src/types/places';

export const ${cityName.toLowerCase().replace(/\s+/g, "")}Places: PlaceData[] = ${JSON.stringify(places, null, 2)};
`;

  fs.writeFileSync(filename, content, "utf8");
  console.log(`✓ Wrote ${places.length} places to ${filename}`);
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting place coordinate extraction (NO API NEEDED!)\n");

  try {
    const allPlaces = await processPlaces();

    // Separate by city
    const chiangMaiPlaces = allPlaces.filter((p) => p.isChiangMai);
    const bangkokPlaces = allPlaces.filter((p) => !p.isChiangMai);

    // Remove the isChiangMai flag before writing
    chiangMaiPlaces.forEach((p) => delete p.isChiangMai);
    bangkokPlaces.forEach((p) => delete p.isChiangMai);

    console.log(`\n📍 City breakdown:`);
    console.log(`   Chiang Mai: ${chiangMaiPlaces.length}`);
    console.log(`   Bangkok: ${bangkokPlaces.length}\n`);

    // Write data files
    if (chiangMaiPlaces.length > 0) {
      writeDataFile(
        "src/data/chiangMaiPlaces.ts",
        chiangMaiPlaces,
        "Chiang Mai"
      );
    }

    if (bangkokPlaces.length > 0) {
      writeDataFile("src/data/bangkokPlaces.ts", bangkokPlaces, "Bangkok");
    }

    console.log("\n✅ Done! You can now manually enhance the data with:");
    console.log("   - Thai names (nameLocal)");
    console.log("   - Photos (photos[])");
    console.log("   - Ratings (myRating)");
    console.log("   - Notes (notes)");
    console.log("   - Must-try dishes (mustTry[])\n");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();

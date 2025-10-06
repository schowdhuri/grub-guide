/**
 * Enrich existing place data with Place IDs from coordinates
 * Uses Places API (New) - Nearby Search to find Place ID from lat/lng
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error("Error: GOOGLE_MAPS_API_KEY not found in .env file");
  process.exit(1);
}

/**
 * Get Place ID from coordinates using Places API (New) Nearby Search
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string|null>} Place ID or null
 */
function getPlaceIdFromCoordinates(lat, lng) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 50.0, // 50 meters radius - very tight to get exact place
        },
      },
    });

    const options = {
      hostname: "places.googleapis.com",
      path: "/v1/places:searchNearby",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const result = JSON.parse(data);

          if (result.error) {
            console.error(
              `API Error for (${lat}, ${lng}):`,
              result.error.message
            );
            resolve(null);
            return;
          }

          if (result.places && result.places.length > 0) {
            // Get the closest place (first result)
            const place = result.places[0];
            resolve(place.id);
          } else {
            console.log(`No place found for coordinates (${lat}, ${lng})`);
            resolve(null);
          }
        } catch (error) {
          console.error(`Parse error for (${lat}, ${lng}):`, error.message);
          resolve(null);
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Request error for (${lat}, ${lng}):`, error.message);
      resolve(null);
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Add delay between API calls to avoid rate limiting
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Process a places file and add Place IDs
 */
async function enrichPlacesFile(filePath, cityName) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing ${cityName} places...`);
  console.log(`${"=".repeat(60)}\n`);

  // Read the TypeScript file
  const content = fs.readFileSync(filePath, "utf8");

  // Extract the places array using regex
  const placesMatch = content.match(
    /export const \w+Places: PlaceData\[\] = (\[[\s\S]+\]);/
  );

  if (!placesMatch) {
    console.error(`Could not parse places array from ${filePath}`);
    return;
  }

  // Parse the JSON array
  const placesJson = placesMatch[1];
  const places = eval(placesJson); // Safe here since we control the input

  let enrichedCount = 0;
  let failedCount = 0;

  // Process each place
  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const { lat, lng } = place.coordinates;

    console.log(`[${i + 1}/${places.length}] ${place.name}`);
    console.log(`  Coordinates: ${lat}, ${lng}`);

    // Get Place ID from coordinates
    const placeId = await getPlaceIdFromCoordinates(lat, lng);

    if (placeId) {
      place.placeId = placeId;
      enrichedCount++;
      console.log(`  ✅ Place ID: ${placeId}`);
    } else {
      failedCount++;
      console.log(`  ❌ Failed to get Place ID`);
    }

    // Rate limiting: wait 200ms between requests
    if (i < places.length - 1) {
      await delay(200);
    }
  }

  // Generate updated TypeScript file
  const header = `/**
 * ${cityName} places data
 * Auto-generated from CSV on ${new Date().toISOString().split("T")[0]}
 * Enriched with Place IDs on ${new Date().toISOString().split("T")[0]}
 *
 * To regenerate coordinates: npm run fetch-coordinates
 * To enrich with Place IDs: npm run enrich-place-ids
 */

import { PlaceData } from '@site/src/types/places';

export const ${cityName.toLowerCase()}Places: PlaceData[] = `;

  const newContent = header + JSON.stringify(places, null, 2) + ";\n";

  // Write back to file
  fs.writeFileSync(filePath, newContent);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`${cityName} Summary:`);
  console.log(`  ✅ Successfully enriched: ${enrichedCount}`);
  console.log(`  ❌ Failed: ${failedCount}`);
  console.log(`  📁 Updated: ${filePath}`);
  console.log(`${"=".repeat(60)}\n`);
}

/**
 * Main execution
 */
async function main() {
  console.log(
    "🔍 Enriching places with Place IDs from Google Places API (New)...\n"
  );

  // Process both cities
  await enrichPlacesFile(
    path.join(__dirname, "../src/data/chiangMaiPlaces.ts"),
    "ChiangMai"
  );

  await enrichPlacesFile(
    path.join(__dirname, "../src/data/bangkokPlaces.ts"),
    "Bangkok"
  );

  console.log("✅ All done! Place data has been enriched with Place IDs.");
  console.log("\nYou can now use these Place IDs to fetch:");
  console.log("  - Photos (places.photos)");
  console.log("  - Ratings (places.rating)");
  console.log("  - Reviews (places.reviews)");
  console.log("  - Opening hours (places.regularOpeningHours)");
}

main().catch(console.error);

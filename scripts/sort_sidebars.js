const fs = require("fs");
const path = require("path");

const sidebarsPath = path.join(__dirname, "../src/sidebars.ts");
const content = fs.readFileSync(sidebarsPath, "utf-8");

// Parse the sidebars file
const sidebarsModule = content
  .replace(/import.*from.*;\n/g, "")
  .replace("export default sidebars;", "")
  .replace("const sidebars: SidebarsConfig = ", "module.exports = ");

// Write temp file and require it
const tempPath = path.join(__dirname, "temp_sidebars.js");
fs.writeFileSync(tempPath, sidebarsModule);
const sidebars = require(tempPath);
fs.unlinkSync(tempPath);

// Function to sort items alphabetically by their path or label
function sortItems(items) {
  return items.sort((a, b) => {
    const aKey = typeof a === "string" ? a : a.label;
    const bKey = typeof b === "string" ? b : b.label;
    return aKey.localeCompare(bKey);
  });
}

// Function to recursively sort sidebar items
function sortSidebar(items, sortDishes = true, sortCategories = false) {
  const sorted = sortCategories ? sortItems([...items]) : [...items];

  return sorted.map((item) => {
    if (item.type === "category" && item.items) {
      return {
        ...item,
        items:
          Array.isArray(item.items) &&
          item.items.length > 0 &&
          typeof item.items[0] === "string"
            ? sortDishes
              ? sortItems([...item.items])
              : item.items
            : sortSidebar(item.items, sortDishes, sortCategories),
      };
    }
    return item;
  });
}

// Sort cuisineSidebar: countries alphabetically, categories as-is, dishes alphabetically
const sortedCuisineSidebar = sortItems(
  sidebars.cuisineSidebar.map((country) => ({
    ...country,
    items: country.items.map((category) => ({
      ...category,
      items:
        typeof category.items[0] === "string"
          ? sortItems([...category.items])
          : category.items,
    })),
  }))
);

// Sort locationSidebar: countries and cities alphabetically, dishes alphabetically
const sortedLocationSidebar = sortItems(
  sidebars.locationSidebar.map((country) => ({
    ...country,
    items: sortItems(
      country.items.map((city) => ({
        ...city,
        items: sortItems([...city.items]),
      }))
    ),
  }))
);

// Update sidebars
sidebars.cuisineSidebar = sortedCuisineSidebar;
sidebars.locationSidebar = sortedLocationSidebar;

// Generate the new TypeScript content
const header = `/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = `;

const footer = `
export default sidebars;
`;

const newContent = header + JSON.stringify(sidebars, null, 2) + ";" + footer;

fs.writeFileSync(sidebarsPath, newContent);

console.log("✅ Sidebars sorted successfully!");
console.log("   - Countries: Alphabetically sorted");
console.log("   - Cities/Regions: Alphabetically sorted");
console.log("   - Cuisine categories: Kept thematic order");
console.log("   - Dishes: Alphabetically sorted");

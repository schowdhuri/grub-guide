#!/usr/bin/env node

/**
 * Generate dual-view pages for cuisines and locations
 * Creates wrapper MDX files that import the main food content
 * but with different frontmatter for different sidebars
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FOOD_DIR = path.join(__dirname, '..', 'docs', 'food');
const CUISINES_DIR = path.join(__dirname, '..', 'docs', 'cuisines-view');
const LOCATIONS_DIR = path.join(__dirname, '..', 'docs', 'locations-view');

// Create output directories
if (!fs.existsSync(CUISINES_DIR)) {
  fs.mkdirSync(CUISINES_DIR, { recursive: true });
}
if (!fs.existsSync(LOCATIONS_DIR)) {
  fs.mkdirSync(LOCATIONS_DIR, { recursive: true });
}

// Get all food MDX files
const foodFiles = fs.readdirSync(FOOD_DIR).filter(file => file.endsWith('.mdx'));

console.log(`Generating dual views for ${foodFiles.length} food pages...`);

let cuisineCount = 0;
let locationCount = 0;

foodFiles.forEach(file => {
  const filePath = path.join(FOOD_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: bodyContent } = matter(content);

  const slug = file.replace('.mdx', '');

  // Create cuisine view wrapper
  const cuisineFrontmatter = {
    slug: `/cuisines/${slug}`,
    title: frontmatter.title,
    description: frontmatter.description,
    tags: frontmatter.tags || [],
    created: frontmatter.created,
    updated: frontmatter.updated,
    locations: frontmatter.locations || [],
    displayed_sidebar: 'cuisineSidebar',
    hide_table_of_contents: frontmatter.hide_table_of_contents,
    canonical: `/food/${slug}`,
  };

  const cuisineWrapper = `---
${Object.entries(cuisineFrontmatter)
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}:\n${value.map(item =>
        typeof item === 'object'
          ? `  - ${Object.entries(item).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n    ')}`
          : `  - ${item}`
      ).join('\n')}`;
    }
    return `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`;
  })
  .join('\n')}
---

${bodyContent}
`;

  fs.writeFileSync(path.join(CUISINES_DIR, file), cuisineWrapper);
  cuisineCount++;

  // Create location view wrapper
  const locationFrontmatter = {
    ...cuisineFrontmatter,
    slug: `/locations/${slug}`,
    displayed_sidebar: 'locationSidebar',
    canonical: `/food/${slug}`,
  };

  const locationWrapper = `---
${Object.entries(locationFrontmatter)
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}:\n${value.map(item =>
        typeof item === 'object'
          ? `  - ${Object.entries(item).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n    ')}`
          : `  - ${item}`
      ).join('\n')}`;
    }
    return `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`;
  })
  .join('\n')}
---

${bodyContent}
`;

  fs.writeFileSync(path.join(LOCATIONS_DIR, file), locationWrapper);
  locationCount++;
});

console.log(`✅ Generated ${cuisineCount} cuisine view pages in docs/cuisines-view/`);
console.log(`✅ Generated ${locationCount} location view pages in docs/locations-view/`);
console.log('✨ Done!');

# Global Grub Guide (GGG) 🌍🍜

A personal food documentation project meticulously tracking amazing foods discovered while traveling the world.

**Live Site**: [https://food.subir.in](https://food.subir.in)

## 🎯 Project Overview

Global Grub Guide is a TypeScript-enabled Docusaurus static site featuring dual-view navigation, comprehensive food documentation with cultural context, and an in-house search system. Each entry includes detailed descriptions, personal experiences, recipes, photos, and location metadata.

## 🏗️ Tech Stack

- **Docusaurus 3.5.2** - TypeScript-enabled static site generator
- **React 18** - Interactive components
- **TypeScript** - Full type safety
- **MDX** - Markdown with embedded React
- **CSS Custom Properties** - Theme-aware styling
- **Node.js** - >=22.0 required

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with file watching
npm start

# Build for production
npm run build

# Run TypeScript type checking
npm run typecheck

# Clean generated files and build artifacts
npm run clean
```

Development server: `http://localhost:3000`

## 📁 Project Structure

```
global-grub-guide/
├── docs/
│   ├── index.mdx                  # Homepage (no sidebar)
│   ├── cuisines.mdx               # Cuisine browser hub
│   ├── locations.mdx              # Location browser hub
│   ├── food/                      # Source food entries (93 dishes)
│   │   ├── pad-thai.mdx
│   │   └── ...
│   ├── cuisines-view/             # Generated: /cuisines/:slug routes
│   └── locations-view/            # Generated: /locations/:slug routes
├── src/
│   ├── components/                # TypeScript React components
│   │   ├── FoodCard.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── MapEmbed.tsx           # Multi-location support
│   │   ├── RecipeLinks.tsx
│   │   ├── CountryStats.tsx
│   │   └── SearchComponent.tsx    # In-house search with tag priority
│   ├── data/
│   │   └── searchIndex.ts         # Auto-generated search index
│   ├── theme/
│   │   └── NavbarItem/            # Custom navbar components
│   └── css/
│       └── custom.css
├── scripts/
│   ├── generate_dual_views.js     # Dual-view page generator
│   └── generate_search_index.js   # Search index builder
├── static/
│   ├── img/                       # Static assets
│   └── robots.txt                 # SEO protection (blocks indexing)
├── sidebars.ts                    # Dual sidebar configuration
├── docusaurus.config.ts           # Main configuration
└── tsconfig.json                  # TypeScript config
```

## 🧭 Navigation Architecture

### Dual-View System

Browse the same food content two different ways:

1. **By Cuisine** (`/cuisines`) - Organized by culinary tradition

   - Thai, Filipino, Vietnamese cuisines
   - Categories: Curries, Noodles, Soups, Desserts, etc.
   - URLs: `/cuisines/:slug`

2. **By Location** (`/locations`) - Organized by geography
   - Countries and cities
   - Example: Thailand → Bangkok, Chiang Mai
   - URLs: `/locations/:slug`

**Implementation**:

- Source files in `docs/food/` (single source of truth)
- `generate_dual_views.js` creates two versions with different frontmatter
- Automatic regeneration in dev mode via file watcher
- Canonical URLs point to `/food/:slug` for SEO

### URL Structure

- **Homepage**: `/` (no sidebar)
- **Cuisine Hub**: `/cuisines` (cuisineSidebar)
- **Location Hub**: `/locations` (locationSidebar)
- **Food Pages**: `/cuisines/:slug`, `/locations/:slug` (stable canonical: `/food/:slug`)

## 🔍 Search System

**Static In-House Search** with tag prioritization:

1. **Tag matches** (score: 100) - Highest priority
2. **Title matches** (score: 50)
3. **Thai name matches** (score: 45)
4. **Pronunciation matches** (score: 40)
5. **Description matches** (score: 20)
6. **Content matches** (score: 10) - Lowest priority

```bash
# Regenerate search index after adding/editing MDX files
npm run generate-search-index
```

Search automatically integrated in navbar via custom component.

## 🎨 Components

### PhotoGallery

```tsx
<PhotoGallery images={[{ src: "verified-url", alt: "descriptive alt text" }]} />
```

### MapEmbed (Multi-location support)

```tsx
<MapEmbed
  locations={[
    {
      country: "Thailand",
      city: "Bangkok",
      address: "Optional full address",
      coordinates: { lat: 13.7563, lng: 100.5018 },
      mapLink: "https://maps.google.com/...",
      notes: "Personal notes",
    },
  ]}
/>
```

### RecipeLinks

```tsx
<RecipeLinks
  recipes={[
    {
      name: "Recipe Title",
      url: "working-url",
      chef: "Chef/Source Name",
    },
  ]}
/>
```

## 📊 Current Progress

### ✅ Complete Documentation

**🇹🇭 Thailand** - 36 dishes

- Categories: Curries, Noodles, Salads, Soups, Rice Dishes, Grilled & BBQ, Stir-Fried, Desserts, Street Food
- Full cultural context, images, dates, pronunciations

**🇵🇭 Philippines** - 46 dishes

- Categories: National Dishes, Soups, Regional Specialties, Street Food, Desserts, Silog Meals

**🇻🇳 Vietnam** - 11 dishes

- Categories: Soups & Broths, Rice Dishes, Spring Rolls, Street Food

### 🎯 Future Countries

Egypt, Uzbekistan, Kazakhstan, Malaysia, Laos, Cambodia

## 📝 Food Entry Schema

### Required Frontmatter

```yaml
---
slug: /food/dish-slug
title: Dish Name (Native Script)
description: Brief compelling description
tags: [country, region, type, characteristics, ingredients]
created: YYYY-MM-DD
updated: YYYY-MM-DD
canonical: /food/dish-slug
locations:
  - country: Country Name
    city: City Name
    address: "Optional"
    coordinates: { lat: 0.0, lng: 0.0 }
    mapLink: "https://maps.google.com/..."
    notes: "Personal notes"
---
```

### Required Content Structure

```markdown
# Dish Name (Native Script)

_Pronunciation: "phonetic guide"_

## English Description

<div className="food-rating">
  <span className="star">⭐</span>My Rating: X/5
</div>

<div className="food-metadata">
  <span className="food-date">📅 Created: DD Month, YYYY</span>
  <span className="food-date">🔄 Updated: DD Month, YYYY</span>
</div>

<div className="spice-level">
  🌶️🌶️ Spice Level: X/5
</div>

<div className="food-tags">
  <span className="food-tag">Tag</span>
</div>

## Cultural Significance & History

## My Experience

<PhotoGallery images={[...]} />

## Where I've Tried It

<MapEmbed locations={[...]} />

## Recipe Links

<RecipeLinks recipes={[...]} />
```

## 🛠️ Development Workflow

### Adding New Food Entries

1. Create MDX file in `docs/food/` with proper frontmatter
2. File watcher auto-regenerates dual-view pages in dev mode
3. Search index updates with `npm run generate-search-index`
4. TypeScript validation with `npm run typecheck`

### Image Guidelines

**Always test image URLs before adding:**

```bash
curl -s -o /dev/null -w "%{http_code}" "image-url"
# Must return: 200
```

**Preferred sources:**

- ✅ Wikimedia Commons (reliable, permanent URLs)
- ✅ Government tourism sites
- ✅ Official restaurant/chef websites
- ❌ Social media (often broken)
- ❌ Temporary hosting

### Quality Checklist

- [ ] All image URLs tested with curl (200 OK)
- [ ] TypeScript compilation passes
- [ ] Pronunciation guides for non-English names
- [ ] Human-friendly dates in content
- [ ] Proper tagging for searchability
- [ ] Canonical URLs present

## 🔒 SEO & Protection

**Current Status**: Indexing blocked (development phase)

- `robots.txt` blocks all search engines and AI crawlers
- Meta tags: `noindex, nofollow, ai-content-declaration: no-scrape`
- Blocks: GPTBot, Claude-Web, CCBot, Google-Extended, PerplexityBot, and 15+ AI scrapers

**When Ready to Launch**:

1. Remove `headTags` section from `docusaurus.config.ts`
2. Replace `robots.txt` with open version

## 📜 Available Scripts

```bash
npm start                    # Dev server + file watching
npm run build                # Production build with dual-view generation
npm run serve                # Serve production build locally
npm run typecheck            # TypeScript validation
npm run clean                # Remove generated files and build artifacts
npm run generate-dual-views  # Manually regenerate cuisine/location views
npm run generate-search-index # Rebuild search index
npm run clear                # Clear Docusaurus cache
```

## 🎨 Styling System

- **Theme-aware colors**: `var(--ifm-color-*)`
- **Transparent backgrounds** for rating widgets
- **Consistent typography** and spacing
- **Mobile-first** responsive design
- **Dark/Light mode** support

### Component Classes

- `.food-rating` - Rating display container
- `.star` - Star emoji styling (gold)
- `.food-metadata` - Date information
- `.spice-level` - Spice level indicators
- `.food-tags` - Tag container and individual tags

## 🔧 TypeScript Integration

Full type safety across:

- All React components
- Docusaurus configuration
- Sidebar definitions
- Search index generation

```bash
npm run typecheck  # Run before committing
```

## 📦 Deployment

**Production URL**: https://food.subir.in

```bash
npm run build   # Generates optimized static files in build/
npm run deploy  # Deploy to hosting (configure in docusaurus.config.ts)
```

## 🙏 Acknowledgments

Built with [Docusaurus](https://docusaurus.io/) - Meta's static site generator for documentation.

---

_Documenting the world, one bite at a time_ 🌍✨

# Global Grub Guide (GGG) 🌍🍜

A comprehensive food documentation project to meticulously track and document amazing foods discovered while traveling the world.

## 🎯 Project Overview

Global Grub Guide is a static website built with Docusaurus + MDX that creates a searchable encyclopedia of foods organized by countries. Each entry includes detailed cultural context, personal experiences, recipes, photos, and comprehensive tagging for easy discovery.

## 🏗️ Tech Stack

- **Framework**: Docusaurus 3.5.2 (Static Site Generator)
- **Content**: MDX (Markdown + React Components)
- **Language**: TypeScript
- **Styling**: CSS Custom Properties + Infima Framework
- **Components**: React 18
- **Node**: >=18.0

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd global-grub-guide

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run serve      # Serve production build locally
npm run typecheck  # Run TypeScript type checking
npm run clear      # Clear Docusaurus cache
```

## 📁 Project Structure

```
global-grub-guide/
├── docs/
│   └── countries/
│       └── thailand/          # Country-specific food entries
│           ├── index.mdx      # Country overview
│           ├── pad-thai.mdx   # Individual dish entries
│           └── ...
├── src/
│   ├── components/            # React components
│   │   ├── PhotoGallery.tsx
│   │   ├── MapEmbed.tsx
│   │   └── RecipeLinks.tsx
│   ├── css/
│   │   └── custom.css         # Global styles
│   └── pages/                 # Static pages
├── static/                    # Static assets
└── docusaurus.config.js       # Docusaurus configuration
```

## 🏷️ Tagging System

Foods are comprehensively tagged for searchability:

- **Geographic**: `thailand`, `bangkok`, `isan`, `central`
- **Type**: `soup`, `noodles`, `dessert`, `street-food`
- **Characteristics**: `spicy`, `sour`, `sweet`, `aromatic`
- **Cultural**: `unesco-heritage`, `national-dish`, `traditional`
- **Dietary**: `vegetarian`, `vegan`, `gluten-free`

## 🎨 Components

### PhotoGallery
```jsx
<PhotoGallery
  images={[
    { src: 'image-url', alt: 'description' }
  ]}
/>
```

### MapEmbed
```jsx
<MapEmbed
  location="Bangkok, Thailand"
  description="Street food locations"
/>
```

### RecipeLinks
```jsx
<RecipeLinks
  recipes={[
    { name: "Recipe Name", url: "url", chef: "Chef Name" }
  ]}
/>
```

## 📊 Current Progress

### Thailand 🇹🇭
- **Completed**: 36/70 approved dishes
- **Status**: ✅ Complete with working images, dates, and styling
- **Categories**: Soups, Noodles, Rice, Grilled, Salads, Desserts, Drinks

### Upcoming Countries
- Vietnam 🇻🇳
- Japan 🇯🇵
- Italy 🇮🇹
- Mexico 🇲🇽
- India 🇮🇳

## 🎯 Food Entry Template

Each food entry follows a standardized MDX format:

```mdx
---
title: Food Name (Native Script)
description: Brief description
tags: [country, region, type, characteristics]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Food Name
## Subtitle

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

[Content with cultural context, personal experience, etc.]

<PhotoGallery images={[...]} />
<MapEmbed location="..." />
<RecipeLinks recipes={[...]} />
```

## 🎨 Styling Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Automatic theme switching
- **Custom Components**: Food cards, rating widgets, tag systems
- **Typography**: Optimized for readability
- **Color Scheme**: Warm, food-inspired palette

## 🔍 Search & Discovery

- **Tag-based filtering**: Search by any combination of tags
- **Geographic navigation**: Browse by country/region
- **Category browsing**: Filter by food type
- **Progress tracking**: See completion status per country

## 🤝 Contributing

This is a personal documentation project, but the structure and components can serve as a template for similar food documentation efforts.

## 📝 License

Private project for personal food documentation.

---

*Documenting the world, one bite at a time* 🌍✨
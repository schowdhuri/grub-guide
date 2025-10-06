/**
 * CategoryFilterPills - Horizontal scrolling filter chips
 *
 * Airbnb-style category filters shown below search bar in map mode
 * Allows quick filtering by place categories
 */

import React from "react";
import { PlaceData } from "@site/src/types/places";

interface CategoryFilterPillsProps {
  places: PlaceData[];
  activeCategories: string[];
  onCategoryToggle: (category: string) => void;
}

export default function CategoryFilterPills({
  places,
  activeCategories,
  onCategoryToggle,
}: CategoryFilterPillsProps): React.JSX.Element {
  // Extract unique categories from places
  const categories = Array.from(
    new Set(
      places
        .map((place) => place.category)
        .filter((category): category is string => Boolean(category))
    )
  ).sort();

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className="category-filter-pills">
      {/* "All" pill */}
      <button
        className={`filter-pill ${activeCategories.length === 0 ? "active" : ""}`}
        onClick={() => {
          // Clear all filters
          activeCategories.forEach((cat) => onCategoryToggle(cat));
        }}
        aria-label="Show all categories"
      >
        All ({places.length})
      </button>

      {/* Category pills */}
      {categories.map((category) => {
        const count = places.filter((p) => p.category === category).length;
        const isActive = activeCategories.includes(category);

        return (
          <button
            key={category}
            className={`filter-pill ${isActive ? "active" : ""}`}
            onClick={() => onCategoryToggle(category)}
            aria-label={`Filter by ${category}`}
            aria-pressed={isActive}
          >
            {category} ({count})
          </button>
        );
      })}
    </div>
  );
}

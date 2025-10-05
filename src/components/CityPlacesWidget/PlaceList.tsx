/**
 * PlaceList - Scrollable list of places with expandable cards
 */

import React from 'react';
import { PlaceData } from '@site/src/types/places';
import PlaceListItem from './PlaceListItem';

interface PlaceListProps {
  places: PlaceData[];
  selectedPlaceId: string | null;
  hoveredPlaceId: string | null;
  onPlaceClick: (placeId: string) => void;
  onPlaceHover: (placeId: string | null) => void;
}

export default function PlaceList({
  places,
  selectedPlaceId,
  hoveredPlaceId,
  onPlaceClick,
  onPlaceHover,
}: PlaceListProps): React.JSX.Element {
  // Group places by category
  const groupedPlaces = places.reduce<Record<string, PlaceData[]>>((acc, place) => {
    const category = place.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category]!.push(place);
    return acc;
  }, {});

  const categories = Object.keys(groupedPlaces).sort();

  return (
    <div className="place-list">
      {categories.map((category) => {
        const categoryPlaces = groupedPlaces[category];
        if (!categoryPlaces) return null;

        return (
          <div key={category} className="place-category">
            <h3 className="category-title">{category}</h3>
            <div className="category-places">
              {categoryPlaces.map((place) => (
                <PlaceListItem
                  key={place.id}
                  place={place}
                  isSelected={place.id === selectedPlaceId}
                  isHovered={place.id === hoveredPlaceId}
                  onClick={() => onPlaceClick(place.id)}
                  onMouseEnter={() => onPlaceHover(place.id)}
                  onMouseLeave={() => onPlaceHover(null)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

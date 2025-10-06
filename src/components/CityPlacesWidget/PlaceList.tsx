/**
 * PlaceList - iOS-style drill-down navigation for places
 */

import React, { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { PlaceData } from "@site/src/types/places";
import PlaceListItem from "./PlaceListItem";
import PlaceDetailView from "./PlaceDetailView";
import { selectedPlaceIdAtom, hoveredPlaceIdAtom } from "./store";

interface PlaceListProps {
  places: PlaceData[];
  onPlaceClick: (placeId: string) => void;
  onPlaceSelect: (placeId: string) => void;
  onDetailViewClose: () => void;
  detailViewPlaceId: string | null;
}

export default function PlaceList({
  places,
  onPlaceClick,
  onPlaceSelect,
  onDetailViewClose,
  detailViewPlaceId,
}: PlaceListProps): React.JSX.Element {
  // Get state from Jotai atoms
  const selectedPlaceId = useAtomValue(selectedPlaceIdAtom);
  const hoveredPlaceId = useAtomValue(hoveredPlaceIdAtom);
  const setHoveredPlaceId = useSetAtom(hoveredPlaceIdAtom);
  const [detailViewPlace, setDetailViewPlace] = useState<PlaceData | null>(
    null
  );

  // Sync external selection (from map marker clicks) with internal detail view state
  useEffect(() => {
    if (detailViewPlaceId) {
      const place = places.find((p) => p.id === detailViewPlaceId);
      if (place) {
        setDetailViewPlace(place);
      }
    } else {
      setDetailViewPlace(null);
    }
  }, [detailViewPlaceId, places]);

  // Group places by category
  const groupedPlaces = places.reduce<Record<string, PlaceData[]>>(
    (acc, place) => {
      const category = place.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category]!.push(place);
      return acc;
    },
    {}
  );

  const categories = Object.keys(groupedPlaces).sort();

  const handlePlaceClick = (place: PlaceData) => {
    setDetailViewPlace(place);
    onPlaceSelect(place.id);
  };

  const handleBackClick = () => {
    setDetailViewPlace(null);
    onDetailViewClose();
  };

  // Show detail view if a place is selected
  if (detailViewPlace) {
    return <PlaceDetailView place={detailViewPlace} onBack={handleBackClick} />;
  }

  // Show list view
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
                  isSelected={false}
                  isHovered={place.id === hoveredPlaceId}
                  onClick={() => handlePlaceClick(place)}
                  onMouseEnter={() => setHoveredPlaceId(place.id)}
                  onMouseLeave={() => setHoveredPlaceId(null)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

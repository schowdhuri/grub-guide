/**
 * BottomToolbar - Horizontal scrolling carousel of place cards
 *
 * Airbnb-style bottom toolbar shown in fullscreen map mode
 * Auto-updates to show places nearest to map center
 * Supports snap scrolling and highlights selected place
 */

import React, { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { PlaceData } from "@site/src/types/places";
import PlaceCard from "./PlaceCard";
import { selectedPlaceIdAtom, mapCenterAtom, mapBoundsAtom } from "./store";

interface BottomToolbarProps {
  places: PlaceData[];
  onPlaceClick: (placeId: string) => void;
}

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
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

export default function BottomToolbar({
  places,
  onPlaceClick,
}: BottomToolbarProps): React.JSX.Element {
  // Get state from Jotai atoms
  const selectedPlaceId = useAtomValue(selectedPlaceIdAtom);
  const mapCenter = useAtomValue(mapCenterAtom);
  const mapBounds = useAtomValue(mapBoundsAtom);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter places within viewport bounds, then sort by distance from center
  const placesWithDistance = places
    .filter((place) => {
      // If bounds not available yet, show all places
      if (!mapBounds) return true;

      // Check if place is within viewport bounds
      return mapBounds.contains({
        lat: place.coordinates.lat,
        lng: place.coordinates.lng,
      });
    })
    .map((place) => ({
      ...place,
      distance: calculateDistance(
        mapCenter.lat,
        mapCenter.lng,
        place.coordinates.lat,
        place.coordinates.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  // Auto-scroll to selected place when it changes
  useEffect(() => {
    if (!selectedPlaceId || !carouselRef.current) return;

    const selectedIndex = placesWithDistance.findIndex(
      (p) => p.id === selectedPlaceId
    );

    if (selectedIndex !== -1) {
      // Card width is now 90vw - 2rem + 12px gap
      const cardWidth = window.innerWidth * 0.9 - 32 + 12;
      const scrollPosition = selectedIndex * cardWidth;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [selectedPlaceId, placesWithDistance]);

  if (placesWithDistance.length === 0) {
    return (
      <div className="bottom-toolbar">
        <div className="toolbar-empty">
          <p>No places found in this area</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-toolbar">
      <div className="toolbar-carousel" ref={carouselRef}>
        {placesWithDistance.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isHighlighted={place.id === selectedPlaceId}
            distance={place.distance}
            onClick={() => onPlaceClick(place.id)}
          />
        ))}
      </div>
    </div>
  );
}

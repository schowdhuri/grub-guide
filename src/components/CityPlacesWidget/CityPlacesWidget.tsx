/**
 * CityPlacesWidget - Interactive map and list display for saved places
 *
 * Features:
 * - Side-by-side map and list layout
 * - Bidirectional interaction: click marker → highlight list item, click list → center map
 * - Responsive design: stacks on mobile
 */

import React, { useState, useCallback } from 'react';
import { PlaceData } from '@site/src/types/places';
import InteractiveMap from './InteractiveMap';
import PlaceList from './PlaceList';
import './styles.css';

interface CityPlacesWidgetProps {
  places: PlaceData[];
  cityName: string;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
}

export default function CityPlacesWidget({
  places,
  cityName,
  defaultCenter,
  defaultZoom = 13,
}: CityPlacesWidgetProps): React.JSX.Element {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);

  // Calculate center from places if not provided
  const center = defaultCenter || {
    lat: places.reduce((sum, p) => sum + p.coordinates.lat, 0) / places.length,
    lng: places.reduce((sum, p) => sum + p.coordinates.lng, 0) / places.length,
  };

  const handlePlaceClick = useCallback((placeId: string) => {
    setSelectedPlaceId(placeId === selectedPlaceId ? null : placeId);
  }, [selectedPlaceId]);

  const handlePlaceHover = useCallback((placeId: string | null) => {
    setHoveredPlaceId(placeId);
  }, []);

  return (
    <div className="city-places-widget">
      <div className="widget-header">
        <h2>📍 {cityName} Places</h2>
        <div className="widget-stats">
          {places.length} {places.length === 1 ? 'place' : 'places'}
        </div>
      </div>

      <div className="widget-content">
        <div className="widget-map">
          <InteractiveMap
            places={places}
            center={center}
            zoom={defaultZoom}
            selectedPlaceId={selectedPlaceId}
            hoveredPlaceId={hoveredPlaceId}
            onMarkerClick={handlePlaceClick}
            onMarkerHover={handlePlaceHover}
          />
        </div>

        <div className="widget-list">
          <PlaceList
            places={places}
            selectedPlaceId={selectedPlaceId}
            hoveredPlaceId={hoveredPlaceId}
            onPlaceClick={handlePlaceClick}
            onPlaceHover={handlePlaceHover}
          />
        </div>
      </div>
    </div>
  );
}

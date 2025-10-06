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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailViewPlaceId, setDetailViewPlaceId] = useState<string | null>(null);

  // Calculate center from places if not provided
  const center = defaultCenter || {
    lat: places.reduce((sum, p) => sum + p.coordinates.lat, 0) / places.length,
    lng: places.reduce((sum, p) => sum + p.coordinates.lng, 0) / places.length,
  };

  // Filter places based on search query
  const filteredPlaces = searchQuery.trim()
    ? places.filter((place) => {
        const query = searchQuery.toLowerCase();
        return (
          place.name.toLowerCase().includes(query) ||
          place.nameLocal?.toLowerCase().includes(query) ||
          place.category?.toLowerCase().includes(query) ||
          place.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      })
    : places;

  const handlePlaceClick = useCallback((placeId: string) => {
    setSelectedPlaceId(placeId === selectedPlaceId ? null : placeId);
  }, [selectedPlaceId]);

  const handlePlaceHover = useCallback((placeId: string | null) => {
    setHoveredPlaceId(placeId);
  }, []);

  const handlePlaceSelect = useCallback((placeId: string) => {
    setDetailViewPlaceId(placeId);
    setSelectedPlaceId(placeId);
  }, []);

  return (
    <div className="city-places-widget">
      <div className="widget-header">
        <div className="search-container">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${cityName} places...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="widget-stats">
          {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'}
        </div>
      </div>

      <div className="widget-content">
        <div className="widget-map">
          <InteractiveMap
            places={filteredPlaces}
            center={center}
            zoom={defaultZoom}
            selectedPlaceId={detailViewPlaceId}
            hoveredPlaceId={hoveredPlaceId}
            onMarkerClick={handlePlaceClick}
            onMarkerHover={handlePlaceHover}
            onPlaceSelect={handlePlaceSelect}
          />
        </div>

        <div className="widget-list">
          <PlaceList
            places={filteredPlaces}
            selectedPlaceId={selectedPlaceId}
            hoveredPlaceId={hoveredPlaceId}
            onPlaceClick={handlePlaceClick}
            onPlaceHover={handlePlaceHover}
            onPlaceSelect={handlePlaceSelect}
            onDetailViewClose={() => setDetailViewPlaceId(null)}
            detailViewPlaceId={detailViewPlaceId}
          />
        </div>
      </div>
    </div>
  );
}

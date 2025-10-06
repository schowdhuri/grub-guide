/**
 * CityPlacesWidget - Interactive map and list display for saved places
 *
 * Features:
 * - Desktop: Side-by-side map and list layout
 * - Mobile: List-first with floating mini-map, fullscreen map mode with bottom toolbar
 * - Bidirectional interaction: click marker → highlight list item, click list → center map
 * - URL-based navigation for browser back button support
 */

import React, { useState, useCallback, useEffect } from "react";
import { PlaceData } from "@site/src/types/places";
import InteractiveMap from "./InteractiveMap";
import PlaceList from "./PlaceList";
import PlaceDetailView from "./PlaceDetailView";
import FloatingMiniMap from "./FloatingMiniMap";
import BottomToolbar from "./BottomToolbar";
import CategoryFilterPills from "./CategoryFilterPills";
import { useURLNavigation } from "./useURLNavigation";
import "./styles.css";

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
}: CityPlacesWidgetProps) {
  // URL-based navigation for mobile
  const {
    viewMode,
    selectedPlaceId: urlPlaceId,
    navigateToList,
    navigateToMap,
    navigateToPlace,
  } = useURLNavigation();

  // State management
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [detailViewPlaceId, setDetailViewPlaceId] = useState<string | null>(
    null
  );
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMapDetailView, setShowMapDetailView] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync URL-based selected place with internal state
  // Disabled for now to prevent widget disappearing issue
  // useEffect(() => {
  //   if (urlPlaceId) {
  //     setDetailViewPlaceId(urlPlaceId);
  //   }
  // }, [urlPlaceId]);

  // Calculate center from places if not provided
  const center = defaultCenter || {
    lat: places.reduce((sum, p) => sum + p.coordinates.lat, 0) / places.length,
    lng: places.reduce((sum, p) => sum + p.coordinates.lng, 0) / places.length,
  };

  // Filter places based on search query and active categories
  const filteredPlaces = places.filter((place) => {
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        place.name.toLowerCase().includes(query) ||
        place.nameLocal?.toLowerCase().includes(query) ||
        place.category?.toLowerCase().includes(query) ||
        place.tags?.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // Category filter (mobile map mode)
    if (activeCategories.length > 0) {
      return place.category && activeCategories.includes(place.category);
    }

    return true;
  });

  // Event handlers
  const handlePlaceClick = useCallback(
    (placeId: string) => {
      setSelectedPlaceId(placeId === selectedPlaceId ? null : placeId);
    },
    [selectedPlaceId]
  );

  const handlePlaceHover = useCallback((placeId: string | null) => {
    setHoveredPlaceId(placeId);
  }, []);

  const handlePlaceSelect = useCallback(
    (placeId: string) => {
      // Set the place ID
      setDetailViewPlaceId(placeId);
      setSelectedPlaceId(placeId);

      // If in map mode, show fullscreen detail overlay instead of transitioning modes
      if (viewMode === "map") {
        setShowMapDetailView(true);
      }
    },
    [viewMode]
  );

  const handleCategoryToggle = useCallback((category: string) => {
    setActiveCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  }, []);

  // Render desktop layout
  if (!isMobile) {
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
              placeholder={`Filter by name`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
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
            {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1 ? "place" : "places"}
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

  // Mobile layout: Centered inline map (no list view)
  if (viewMode === "list") {
    return (
      <div className="city-places-widget mobile-inline-map-mode">
        {/* Inline map - click to open fullscreen */}
        <div className="inline-map-container" onClick={navigateToMap}>
          <div className="inline-map-static">
            <InteractiveMap
              places={places}
              center={center}
              zoom={defaultZoom}
              selectedPlaceId={null}
              hoveredPlaceId={null}
              onMarkerClick={() => {}}
              onMarkerHover={() => {}}
              onPlaceSelect={() => {}}
              isFullscreen={false}
            />
          </div>
          <div className="inline-map-overlay">
            <div className="inline-map-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2C7.5 2 5.5 4 5.5 6.5C5.5 10 10 15 10 15C10 15 14.5 10 14.5 6.5C14.5 4 12.5 2 10 2Z"
                  fill="currentColor"
                />
              </svg>
              Tap to explore {places.length} places
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout: Fullscreen map mode with bottom toolbar
  if (viewMode === "map") {
    const mapModeClasses = `city-places-widget mobile-map-mode ${
      showMapDetailView ? "detail-view-open" : ""
    }`;
    return (
      <div className={mapModeClasses}>
        {/* Close button */}
        <button
          className="close-map-button"
          onClick={navigateToList}
          aria-label="Close map"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Search bar */}
        <div className="widget-header mobile-header fullscreen-header">
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
              placeholder={`Filter by name`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
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
        </div>

        {/* Category filter pills */}
        <CategoryFilterPills
          places={places}
          activeCategories={activeCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        {/* Fullscreen map */}
        <div className="widget-map fullscreen-map">
          <InteractiveMap
            places={filteredPlaces}
            center={center}
            zoom={defaultZoom}
            selectedPlaceId={detailViewPlaceId}
            hoveredPlaceId={hoveredPlaceId}
            onMarkerClick={handlePlaceClick}
            onMarkerHover={handlePlaceHover}
            onPlaceSelect={handlePlaceSelect}
            isFullscreen={true}
            enableClustering={places.length > 20}
            onMapLoaded={setIsMapLoaded}
          />
        </div>

        {/* Bottom toolbar with place cards */}
        <BottomToolbar
          places={filteredPlaces}
          selectedPlaceId={detailViewPlaceId}
          mapCenter={center}
          onPlaceClick={handlePlaceSelect}
          isMapLoaded={isMapLoaded}
        />

        {/* Fullscreen detail overlay for map mode */}
        {showMapDetailView && detailViewPlaceId && (
          <div className="map-detail-overlay">
            <div className="map-detail-header">
              <button
                className="back-button"
                onClick={() => {
                  setShowMapDetailView(false);
                  setDetailViewPlaceId(null);
                }}
                aria-label="Back to map"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h2 className="detail-header-title">
                {places.find((p) => p.id === detailViewPlaceId)?.name}
              </h2>
            </div>
            <div className="map-detail-content">
              {places.find((p) => p.id === detailViewPlaceId) && (
                <PlaceDetailView
                  place={places.find((p) => p.id === detailViewPlaceId)!}
                  onBack={() => {
                    setShowMapDetailView(false);
                    setDetailViewPlaceId(null);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detail view is handled by PlaceList component via URL navigation
  return null;
}

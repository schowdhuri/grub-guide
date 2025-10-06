/**
 * InteractiveMap - Google Maps component with custom markers
 */

import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { PlaceData } from "@site/src/types/places";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface InteractiveMapProps {
  places: PlaceData[];
  center: { lat: number; lng: number };
  zoom: number;
  selectedPlaceId: string | null;
  hoveredPlaceId: string | null;
  onMarkerClick: (placeId: string) => void;
  onMarkerHover: (placeId: string | null) => void;
  onPlaceSelect: (placeId: string) => void;
  isFullscreen?: boolean;
  enableClustering?: boolean;
  onBoundsChange?: (center: { lat: number; lng: number }) => void;
  onMapLoaded?: (isLoaded: boolean) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
  minHeight: "500px",
};

const getMapOptions = (isFullscreen: boolean): google.maps.MapOptions => ({
  disableDefaultUI: isFullscreen, // Hide all UI in fullscreen mode
  zoomControl: !isFullscreen,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy", // Allow dragging with one finger
  clickableIcons: false,
});

export default function InteractiveMap({
  places,
  center,
  zoom,
  selectedPlaceId,
  hoveredPlaceId,
  onMarkerClick,
  onMarkerHover,
  onPlaceSelect,
  isFullscreen = false,
  enableClustering = false,
  onBoundsChange,
  onMapLoaded,
}: InteractiveMapProps): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const clustererRef = useRef<MarkerClusterer | null>(null);

  const apiKey = (siteConfig.customFields?.googleMapsApiKey as string) || "";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'], // Load places library for PlaceCard
  });

  // Notify parent when map is loaded
  useEffect(() => {
    if (onMapLoaded) {
      onMapLoaded(isLoaded);
    }
  }, [isLoaded, onMapLoaded]);

  // Pan to selected place
  useEffect(() => {
    if (map && selectedPlaceId) {
      const place = places.find((p) => p.id === selectedPlaceId);
      if (place) {
        map.panTo(place.coordinates);
        map.setZoom(15);
      }
    }
  }, [map, selectedPlaceId, places]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    // Clean up clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
      clustererRef.current = null;
    }
    setMap(null);
  }, []);

  const handleMarkerClick = (placeId: string) => {
    onMarkerClick(placeId);
    onPlaceSelect(placeId);
  };

  const getMarkerIcon = (placeId: string) => {
    // Check if google maps is loaded
    if (typeof google === "undefined" || !google.maps) {
      return undefined;
    }

    const isSelected = placeId === selectedPlaceId;
    const isHovered = placeId === hoveredPlaceId;

    if (isSelected) {
      // Pin marker for selected place
      return {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        fillColor: "#ff6b35",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 1.8,
        anchor: new google.maps.Point(12, 22),
      };
    }

    if (isHovered) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#ff8c61",
        fillOpacity: 0.9,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 10,
      };
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "#4285f4",
      fillOpacity: 0.8,
      strokeColor: "#ffffff",
      strokeWeight: 2,
      scale: 8,
    };
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={getMapOptions(isFullscreen)}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {map &&
        places.map((place) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            onClick={() => handleMarkerClick(place.id)}
            onMouseOver={() => onMarkerHover(place.id)}
            onMouseOut={() => onMarkerHover(null)}
            icon={getMarkerIcon(place.id)}
          />
        ))}
    </GoogleMap>
  );
}

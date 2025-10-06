/**
 * FloatingMiniMap - Compact map preview with tap to expand
 *
 * Airbnb-inspired floating map widget shown in list mode on mobile
 * Shows marker density and place count, taps to fullscreen map
 *
 * Note: Uses GoogleMap without LoadScript (parent component loads the script)
 */

import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { PlaceData } from '@site/src/types/places';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface FloatingMiniMapProps {
  places: PlaceData[];
  center: { lat: number; lng: number };
  onTap: () => void;
}

const miniMapContainerStyle = {
  width: '100%',
  height: '100%',
};

const miniMapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'none' as const, // Disable all gestures (it's just a preview)
  clickableIcons: false,
  keyboardShortcuts: false,
  draggable: false,
};

export default function FloatingMiniMap({
  places,
  center,
  onTap,
}: FloatingMiniMapProps): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const apiKey = (siteConfig.customFields?.googleMapsApiKey as string) || '';

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Simple marker icon for mini map
  const getMiniMarkerIcon = () => {
    if (!isLoaded || typeof google === 'undefined' || !google.maps) {
      return undefined;
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#ff6b35',
      fillOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      scale: 4,
    };
  };

  return (
    <div
      className="floating-mini-map"
      onClick={onTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap();
        }
      }}
      aria-label={`Show map with ${places.length} places`}
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={miniMapContainerStyle}
          center={center}
          zoom={12}
          options={miniMapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {map && places.map((place) => (
            <Marker
              key={place.id}
              position={place.coordinates}
              icon={getMiniMarkerIcon()}
            />
          ))}
        </GoogleMap>
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'var(--ifm-color-emphasis-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--ifm-color-emphasis-600)' }}>
          Loading...
        </div>
      )}

      {/* Place count badge */}
      <div className="mini-map-badge">
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '2px' }}
        >
          <path
            d="M10 2C7.5 2 5.5 4 5.5 6.5C5.5 10 10 15 10 15C10 15 14.5 10 14.5 6.5C14.5 4 12.5 2 10 2Z"
            fill="currentColor"
          />
        </svg>
        {places.length}
      </div>

      {/* Map icon overlay to indicate it's tappable */}
      <div className="mini-map-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * InteractiveMap - Google Maps component with custom markers
 */

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { PlaceData } from '@site/src/types/places';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface InteractiveMapProps {
  places: PlaceData[];
  center: { lat: number; lng: number };
  zoom: number;
  selectedPlaceId: string | null;
  hoveredPlaceId: string | null;
  onMarkerClick: (placeId: string) => void;
  onMarkerHover: (placeId: string | null) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

export default function InteractiveMap({
  places,
  center,
  zoom,
  selectedPlaceId,
  hoveredPlaceId,
  onMarkerClick,
  onMarkerHover,
}: InteractiveMapProps): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);

  const apiKey = (siteConfig.customFields?.googleMapsApiKey as string) || '';

  // Pan to selected place
  useEffect(() => {
    if (map && selectedPlaceId) {
      const place = places.find(p => p.id === selectedPlaceId);
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
    setMap(null);
  }, []);

  const handleMarkerClick = (placeId: string) => {
    setActiveInfoWindow(placeId);
    onMarkerClick(placeId);
  };

  const getMarkerIcon = (placeId: string) => {
    // Check if google maps is loaded
    if (typeof google === 'undefined' || !google.maps) {
      return undefined;
    }

    const isSelected = placeId === selectedPlaceId;
    const isHovered = placeId === hoveredPlaceId;

    if (isSelected) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#ff6b35',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
        scale: 12,
      };
    }

    if (isHovered) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#ff8c61',
        fillOpacity: 0.9,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 10,
      };
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#4285f4',
      fillOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 8,
    };
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            onClick={() => handleMarkerClick(place.id)}
            onMouseOver={() => onMarkerHover(place.id)}
            onMouseOut={() => onMarkerHover(null)}
            icon={getMarkerIcon(place.id)}
          >
            {activeInfoWindow === place.id && (
              <InfoWindow onCloseClick={() => setActiveInfoWindow(null)}>
                <div style={{ maxWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    {place.name}
                  </h4>
                  {place.nameLocal && (
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                      {place.nameLocal}
                    </p>
                  )}
                  {place.category && (
                    <p style={{ margin: '4px 0', fontSize: '12px' }}>
                      <strong>Category:</strong> {place.category}
                    </p>
                  )}
                  {place.myRating && (
                    <p style={{ margin: '4px 0', fontSize: '12px' }}>
                      <strong>Rating:</strong> {'⭐'.repeat(place.myRating)}
                    </p>
                  )}
                  <a
                    href={place.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px' }}
                  >
                    View on Google Maps
                  </a>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

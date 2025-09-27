import React from 'react';

interface MapEmbedProps {
  location: string;
  description: string;
}

export function MapEmbed({ location, description }: MapEmbedProps): React.JSX.Element {
  // For now, we'll use a placeholder that can be replaced with actual maps later
  // Could integrate with Google Maps, OpenStreetMap, or other mapping services

  return (
    <div className="map-embed" style={{
      background: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      position: 'relative'
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem'
      }}>
        🗺️
      </div>

      <h4 style={{
        margin: '0 0 0.5rem 0',
        color: 'var(--ifm-color-primary)'
      }}>
        📍 {location}
      </h4>

      <p style={{
        margin: 0,
        color: 'var(--ifm-color-emphasis-700)',
        maxWidth: '400px'
      }}>
        {description}
      </p>

      <small style={{
        marginTop: '1rem',
        color: 'var(--ifm-color-emphasis-500)',
        fontStyle: 'italic'
      }}>
        Interactive map integration coming soon
      </small>
    </div>
  );
}

// Alternative version with actual Google Maps integration (commented out for now)
/*
interface GoogleMapEmbedProps {
  location: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  description?: string;
}

export function GoogleMapEmbed({ location, lat, lng, zoom = 13, description }: GoogleMapEmbedProps): JSX.Element {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}&zoom=${zoom}`;

  return (
    <div>
      <iframe
        className="map-embed"
        src={mapSrc}
        title={`Map of ${location}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {description && (
        <p style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          color: 'var(--ifm-color-emphasis-700)',
          fontSize: '0.9rem'
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
*/
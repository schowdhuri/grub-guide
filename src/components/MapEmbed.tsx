import React from "react";

interface Location {
  country: string;
  city?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapLink?: string;
  notes?: string;
}

interface MapEmbedProps {
  // Legacy single location support (backward compatible)
  location?: string;
  description?: string;
  // New multi-location support
  locations?: Location[];
}

export function MapEmbed({
  location,
  description,
  locations,
}: MapEmbedProps): React.JSX.Element {
  // Support both old single location format and new multiple locations format
  const locationsToDisplay: Location[] =
    locations ||
    (location
      ? [
          {
            country: location.split(",")[1]?.trim() || "",
            city: location.split(",")[0]?.trim() || location,
            ...(description && { notes: description }),
          },
        ]
      : []);

  if (locationsToDisplay.length === 0) {
    return (
      <div
        className="map-embed"
        style={{
          background: "var(--ifm-color-emphasis-100)",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "8px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--ifm-color-emphasis-700)" }}>
          No location information available
        </p>
      </div>
    );
  }

  return (
    <div
      className="map-embed"
      style={{
        background: "var(--ifm-color-emphasis-100)",
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: "8px",
        padding: "2rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        🗺️
      </div>

      <h3
        style={{
          margin: "0 0 1.5rem 0",
          textAlign: "center",
          color: "var(--ifm-color-primary)",
        }}
      >
        Where I've Tried This
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {locationsToDisplay.map((loc, index) => (
          <div
            key={index}
            style={{
              background: "var(--ifm-background-color)",
              border: "1px solid var(--ifm-color-emphasis-200)",
              borderRadius: "8px",
              padding: "1.5rem",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  flexShrink: 0,
                }}
              >
                📍
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 0.5rem 0",
                    color: "var(--ifm-color-primary)",
                    fontSize: "1.1rem",
                  }}
                >
                  {loc.city || loc.country}
                </h4>

                {loc.city && loc.country && (
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "var(--ifm-color-emphasis-600)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {loc.country}
                  </p>
                )}

                {loc.address && (
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "var(--ifm-color-emphasis-700)",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    📮 {loc.address}
                  </p>
                )}

                {loc.coordinates && (
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "var(--ifm-color-emphasis-600)",
                      fontSize: "0.85rem",
                      fontFamily: "monospace",
                    }}
                  >
                    🌐 {loc.coordinates.lat.toFixed(4)},{" "}
                    {loc.coordinates.lng.toFixed(4)}
                  </p>
                )}

                {loc.notes && (
                  <p
                    style={{
                      margin: "0.75rem 0 0 0",
                      color: "var(--ifm-color-emphasis-800)",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {loc.notes}
                  </p>
                )}

                {loc.mapLink && (
                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "0.75rem",
                      color: "var(--ifm-color-primary)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    🔗 View on map →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <small
        style={{
          display: "block",
          marginTop: "1.5rem",
          textAlign: "center",
          color: "var(--ifm-color-emphasis-500)",
          fontStyle: "italic",
        }}
      >
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

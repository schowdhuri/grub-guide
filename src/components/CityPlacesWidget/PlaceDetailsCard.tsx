/**
 * PlaceDetailsCard - Google Places UI Kit integration
 * Uses gmp-place-details-compact web component for rich place data
 */

import React, { useEffect, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface PlaceDetailsCardProps {
  placeId: string;
}

// Extend JSX to support Google Places UI Kit web components
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-place-details-compact": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { orientation?: string },
        HTMLElement
      >;
      "gmp-place-details-place-request": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { place?: string },
        HTMLElement
      >;
      "gmp-place-all-content": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function PlaceDetailsCard({
  placeId,
}: PlaceDetailsCardProps): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const apiKey = (siteConfig.customFields?.googleMapsApiKey as string) || "";

  useEffect(() => {
    // Load Google Maps Places UI Kit
    const loadPlacesUIKit = async () => {
      try {
        // Check if already loaded
        if (
          typeof google !== "undefined" &&
          google.maps &&
          google.maps.importLibrary
        ) {
          await google.maps.importLibrary("places");
          setIsLoaded(true);
          return;
        }

        // Load the Google Maps script
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = async () => {
          if (google?.maps?.importLibrary) {
            await google.maps.importLibrary("places");
            setIsLoaded(true);
          }
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("Error loading Places UI Kit:", error);
      }
    };

    loadPlacesUIKit();
  }, [apiKey]);

  if (!isLoaded || !placeId) {
    return (
      <div className="place-details-loading">Loading place details...</div>
    );
  }

  return (
    <div ref={containerRef} className="place-details-card">
      <gmp-place-details-compact orientation="vertical">
        <gmp-place-details-place-request place={placeId} />
        <gmp-place-all-content />
      </gmp-place-details-compact>
    </div>
  );
}

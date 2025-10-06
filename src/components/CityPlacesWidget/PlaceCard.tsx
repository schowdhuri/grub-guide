/**
 * PlaceCard - Booking.com-style horizontal card for bottom toolbar carousel
 *
 * Horizontal card with photo on left, details on right
 * Shows place photo, name (English + Thai), rating, category, and distance
 */

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { PlaceData } from "@site/src/types/places";
import { isMapLoadedAtom } from "./store";

interface PlaceCardProps {
  place: PlaceData;
  isHighlighted: boolean;
  distance?: number; // Distance from map center in km
  onClick: () => void;
}

export default function PlaceCard({
  place,
  isHighlighted,
  distance,
  onClick,
}: PlaceCardProps): React.JSX.Element {
  // Get state from Jotai atom
  const isMapLoaded = useAtomValue(isMapLoadedAtom);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [placeDetails, setPlaceDetails] = useState<{
    rating?: number;
    reviewCount?: number;
    priceLevel?: string;
    isOpen?: boolean;
    hoursText?: string;
    category?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const className = `place-card ${isHighlighted ? "highlighted" : ""}`;

  // Fetch photo and details from Google Places API if placeId exists
  useEffect(() => {
    if (!place.placeId) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const fetchPlaceData = async () => {
      // Wait for map to be loaded (poll every 100ms, max 100 times = 10 seconds)
      let attempts = 0;
      while (attempts < 100 && !isMapLoaded) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (
        cancelled ||
        !isMapLoaded ||
        typeof google === "undefined" ||
        !google.maps ||
        !google.maps.places
      ) {
        setIsLoading(false);
        return;
      }

      try {
        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );

        service.getDetails(
          {
            placeId: place.placeId!,
            fields: [
              "photos",
              "rating",
              "user_ratings_total",
              "price_level",
              "opening_hours",
              "types",
              "business_status",
            ],
          },
          (result, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              result
            ) {
              // Set photo
              if (result.photos?.[0]) {
                const photo = result.photos[0];
                setPhotoUrl(photo.getUrl({ maxWidth: 160, maxHeight: 160 }));
              }

              // Set place details
              const details: any = {};

              if (result.rating) {
                details.rating = result.rating;
              }

              if (result.user_ratings_total) {
                details.reviewCount = result.user_ratings_total;
              }

              if (result.price_level !== undefined) {
                // Convert price level (0-4) to price range format
                const priceLevels = [
                  "Free",
                  "฿1-200",
                  "฿200-500",
                  "฿500-1000",
                  "฿1000+",
                ];
                details.priceLevel = priceLevels[result.price_level] || "";
              }

              if (result.opening_hours) {
                details.isOpen = result.opening_hours.isOpen?.();

                // Get opening hours text
                if (result.opening_hours.weekday_text) {
                  const today = new Date().getDay();
                  const daysMap = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];
                  const todayText = result.opening_hours.weekday_text.find(
                    (text: string) => text.startsWith(daysMap[today]!)
                  );

                  if (todayText) {
                    // Extract just the hours part
                    const hoursMatch = todayText.match(/:\s*(.+)$/);
                    if (hoursMatch) {
                      details.hoursText = hoursMatch[1];
                    }
                  }
                } else if (result.opening_hours.periods) {
                  // Fallback to periods if weekday_text not available
                  const today = new Date().getDay();
                  const todayPeriod = result.opening_hours.periods.find(
                    (p: any) => p.open?.day === today
                  );

                  if (details.isOpen && todayPeriod?.close) {
                    const hour = todayPeriod.close.hours || 0;
                    const minute = todayPeriod.close.minutes || 0;
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const displayHour =
                      hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                    details.hoursText = `Closes ${displayHour}:${minute
                      .toString()
                      .padStart(2, "0")} ${ampm}`;
                  } else if (!details.isOpen && todayPeriod?.open) {
                    const hour = todayPeriod.open.hours || 0;
                    const minute = todayPeriod.open.minutes || 0;
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const displayHour =
                      hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                    const dayName = [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ][todayPeriod.open.day];
                    details.hoursText = `Opens ${displayHour}:${minute
                      .toString()
                      .padStart(2, "0")} ${ampm} ${dayName}`;
                  }
                }
              }

              // Get category from types - prefer specific cuisine types
              if (result.types && result.types.length > 0) {
                // Priority order for type matching (check in this order)
                const typePriority = [
                  // Specific cuisine types (highest priority)
                  "thai_restaurant",
                  "japanese_restaurant",
                  "chinese_restaurant",
                  "korean_restaurant",
                  "vietnamese_restaurant",
                  "italian_restaurant",
                  "mexican_restaurant",
                  "indian_restaurant",
                  "french_restaurant",
                  "american_restaurant",
                  "seafood_restaurant",
                  "steak_house",
                  "sushi_restaurant",
                  "pizza_restaurant",
                  "sandwich_shop",
                  "hamburger_restaurant",
                  "fast_food_restaurant",
                  // General restaurant/food types (medium priority)
                  "restaurant",
                  "cafe",
                  "bar",
                  "meal_takeaway",
                  "bakery",
                  // Generic types (lowest priority - avoid if possible)
                  "food",
                ];

                const typeMap: { [key: string]: string } = {
                  thai_restaurant: "Thai Restaurant",
                  japanese_restaurant: "Japanese Restaurant",
                  chinese_restaurant: "Chinese Restaurant",
                  korean_restaurant: "Korean Restaurant",
                  vietnamese_restaurant: "Vietnamese Restaurant",
                  italian_restaurant: "Italian Restaurant",
                  mexican_restaurant: "Mexican Restaurant",
                  indian_restaurant: "Indian Restaurant",
                  french_restaurant: "French Restaurant",
                  american_restaurant: "American Restaurant",
                  seafood_restaurant: "Seafood Restaurant",
                  steak_house: "Steakhouse",
                  sushi_restaurant: "Sushi Restaurant",
                  pizza_restaurant: "Pizza Restaurant",
                  sandwich_shop: "Sandwich Shop",
                  hamburger_restaurant: "Burger Restaurant",
                  fast_food_restaurant: "Fast Food",
                  restaurant: "Restaurant",
                  cafe: "Cafe",
                  bar: "Bar",
                  meal_takeaway: "Takeaway",
                  bakery: "Bakery",
                  food: "Food",
                };

                // Find highest priority matching type
                for (const priorityType of typePriority) {
                  if (result.types.includes(priorityType)) {
                    details.category = typeMap[priorityType];
                    break;
                  }
                }
              }

              setPlaceDetails(details);
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error("Error fetching place data:", error);
        setIsLoading(false);
      }
    };

    fetchPlaceData();

    return () => {
      cancelled = true;
    };
  }, [place.placeId, isMapLoaded]);

  return (
    <div
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${place.name}`}
    >
      {/* Photo Thumbnail */}
      <div className="place-card-photo">
        {photoUrl ? (
          <img src={photoUrl} alt={place.name} />
        ) : (
          <div className="place-card-photo-placeholder">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="place-card-content">
        <div className="place-card-header">
          <h4 className="place-card-name">{place.name}</h4>

          {/* Loading indicator */}
          {isLoading && (
            <div className="place-card-loading">Loading details...</div>
          )}

          {/* Google rating and review count */}
          {!isLoading && placeDetails?.rating && (
            <div className="place-card-rating-row">
              <span className="place-card-rating">
                {placeDetails.rating} ⭐
              </span>
              {placeDetails.reviewCount && (
                <span className="place-card-reviews">
                  ({placeDetails.reviewCount.toLocaleString()})
                </span>
              )}
            </div>
          )}
        </div>

        <div className="place-card-meta">
          {placeDetails?.category && (
            <span className="place-card-category">{placeDetails.category}</span>
          )}
          {placeDetails?.priceLevel && (
            <span className="place-card-price-level">
              {" "}
              · {placeDetails.priceLevel}
            </span>
          )}
        </div>

        {/* Opening hours */}
        {placeDetails?.isOpen !== undefined && placeDetails?.hoursText && (
          <div
            className={`place-card-hours ${
              placeDetails.isOpen ? "open" : "closed"
            }`}
          >
            {placeDetails.isOpen ? "Open" : "Closed"} · {placeDetails.hoursText}
          </div>
        )}
      </div>
    </div>
  );
}

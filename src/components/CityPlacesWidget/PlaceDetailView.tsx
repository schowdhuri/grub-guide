/**
 * PlaceDetailView - iOS-style detail view for a single place
 */

import React from "react";
import { PlaceData } from "@site/src/types/places";
import PlaceDetailsCard from "./PlaceDetailsCard";

interface PlaceDetailViewProps {
  place: PlaceData;
  onBack: () => void;
}

export default function PlaceDetailView({
  place,
  onBack,
}: PlaceDetailViewProps): React.JSX.Element {
  return (
    <div className="place-detail-view">
      {/* Mobile-optimized header with back button and title */}
      <div className="detail-view-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to list"
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
        <h2 className="detail-header-title">{place.name}</h2>
      </div>

      {/* Scrollable content */}
      <div className="detail-view-content">
        {/* Personal metadata */}
        <div className="detail-view-meta">
          {place.myRating && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">My Rating</span>
              <span className="detail-meta-value">
                {"⭐".repeat(place.myRating)}
              </span>
            </div>
          )}
          {place.spiceLevel && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Spice Level</span>
              <span className="detail-meta-value">
                {"🌶️".repeat(place.spiceLevel)}
              </span>
            </div>
          )}
          {place.priceRange && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Price</span>
              <span className="detail-meta-value">{place.priceRange}</span>
            </div>
          )}
          {place.category && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Category</span>
              <span className="detail-meta-value">{place.category}</span>
            </div>
          )}
        </div>

        {/* Google Places UI Kit */}
        {place.placeId && (
          <div className="detail-view-section">
            <PlaceDetailsCard placeId={place.placeId} />
          </div>
        )}

        {/* Personal notes and custom data */}
        {place.mustTry && place.mustTry.length > 0 && (
          <div className="detail-view-section">
            <h3 className="detail-section-title">My Must-Try Dishes</h3>
            <ul className="detail-must-try-list">
              {place.mustTry.map((dish, index) => (
                <li key={index}>{dish}</li>
              ))}
            </ul>
          </div>
        )}

        {place.notes && (
          <div className="detail-view-section">
            <h3 className="detail-section-title">My Notes</h3>
            <p className="detail-notes">{place.notes}</p>
          </div>
        )}

        {place.visitDate && (
          <div className="detail-view-section">
            <h3 className="detail-section-title">Visit Date</h3>
            <p className="detail-visit-date">{place.visitDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

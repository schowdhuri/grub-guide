/**
 * PlaceListItem - Individual place card in the list
 */

import React from 'react';
import { PlaceData } from '@site/src/types/places';

interface PlaceListItemProps {
  place: PlaceData;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function PlaceListItem({
  place,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PlaceListItemProps): React.JSX.Element {
  const className = `place-list-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`;

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="place-header">
        <h4 className="place-name">{place.name}</h4>
        {place.nameLocal && (
          <p className="place-name-local">{place.nameLocal}</p>
        )}
      </div>

      <div className="place-meta">
        {place.myRating && (
          <span className="place-rating">
            {'⭐'.repeat(place.myRating)}
          </span>
        )}
        {place.spiceLevel && (
          <span className="place-spice">
            {'🌶️'.repeat(place.spiceLevel)}
          </span>
        )}
        {place.priceRange && (
          <span className="place-price">{place.priceRange}</span>
        )}
      </div>

      {isSelected && (
        <div className="place-details">
          {place.mustTry && place.mustTry.length > 0 && (
            <div className="place-must-try">
              <strong>Must Try:</strong>
              <ul>
                {place.mustTry.map((dish, index) => (
                  <li key={index}>{dish}</li>
                ))}
              </ul>
            </div>
          )}

          {place.notes && (
            <div className="place-notes">
              <strong>Notes:</strong>
              <p>{place.notes}</p>
            </div>
          )}

          {place.visitDate && (
            <div className="place-visit-date">
              <strong>Visited:</strong> {place.visitDate}
            </div>
          )}

          <div className="place-actions">
            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="place-link"
              onClick={(e) => e.stopPropagation()}
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

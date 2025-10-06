/**
 * PlaceListItem - Individual place card in the list
 */

import React from 'react';
import { PlaceData } from '@site/src/types/places';
import PlaceDetailsCard from './PlaceDetailsCard';

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

      {/* Chevron indicator */}
      <svg
        className="place-chevron"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

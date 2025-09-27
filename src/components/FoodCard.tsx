import React from 'react';
import Link from '@docusaurus/Link';

interface FoodCardProps {
  name: string;
  description: string;
  rating: number;
  spiceLevel: number;
  tags?: string[];
  link?: string;
}

export function FoodCard({
  name,
  description,
  rating,
  spiceLevel,
  tags = [],
  link
}: FoodCardProps): React.JSX.Element {
  const renderStars = (rating: number): string => {
    return '⭐'.repeat(rating);
  };

  const renderChilis = (level: number): string => {
    return '🌶️'.repeat(level);
  };

  return (
    <div className="food-card">
      <h3>{name}</h3>
      <p>{description}</p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <div className="food-rating">
          {renderStars(rating)} ({rating}/5)
        </div>

        <div className="spice-level">
          {renderChilis(spiceLevel)} ({spiceLevel}/5)
        </div>
      </div>

      {tags.length > 0 && (
        <div className="food-tags">
          {tags.map((tag, index) => (
            <span key={index} className="food-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {link && (
        <div style={{ marginTop: '1rem' }}>
          <Link
            to={link}
            className="button button--primary"
          >
            Read More →
          </Link>
        </div>
      )}
    </div>
  );
}
import React from 'react';

interface Recipe {
  name: string;
  url: string;
  chef?: string;
}

interface RecipeLinksProps {
  recipes?: Recipe[];
}

export function RecipeLinks({ recipes = [] }: RecipeLinksProps): React.JSX.Element | null {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <h4>🍳 Authentic Recipes</h4>
      <div className="recipe-links">
        {recipes.map((recipe, index) => (
          <a
            key={index}
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="recipe-link"
          >
            <span>📖</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>{recipe.name}</div>
              {recipe.chef && (
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  by {recipe.chef}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
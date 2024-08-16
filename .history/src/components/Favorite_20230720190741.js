import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function Favorite() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(favorites);
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      <div>
        {favoriteRecipes.map((recipe, index) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />

            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.area}

            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ shareIcon } alt="share icon" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;

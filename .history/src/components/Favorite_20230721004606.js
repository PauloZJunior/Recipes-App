import React, { useEffect, useState, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeButtons from './RecipeButtons';
// import favoriteIcon from '../images/favoriteIcon.svg';
// import notFavoriteIcon from '../images/notFavoriteIcon.svg';

function Favorite() {
  const { favorited } = useContext(Context);
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
              {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}`}
            </p>

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.area}

            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share icon" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favorited ? whiteHeartIcon : blackHeartIcon }
            >
              <img
                src={ favorited ? whiteHeartIcon : blackHeartIcon }
                alt="favorite icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;

import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import favoriteIcon from '../images/favoriteIcon.svg';
// import notFavoriteIcon from '../images/notFavoriteIcon.svg';

function Favorite() {
  const { copied, setCopied, favorited, setFavorited } = useContext(Context);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(favorites);
    setFavorited(true);
  }, [setFavorited]);

  const handleShareClick = ({ id }) => {
    const favoriteUrl = `http://localhost:3000/meals/${id}`;
    copy(favoriteUrl);
    setCopied(true);
  };

  const handleFavoriteClick = ({ id }) => {
    setFavorited(!favorited);
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const magicNumber = -1;
    const recipeIndex = favorite.findIndex((index) => index.id === recipeId);
    if (recipeIndex !== magicNumber) {
      favorite.splice(recipeIndex, 1);
    } else {
      favorite.push({
        id: recipeId,
        type: recipeType === 'meals' ? 'meal' : 'drink',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
        image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  };

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
              style={ { width: '150px' } }
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
              onClick={ () => handleShareClick(recipe) }
            >
              <img src={ shareIcon } alt="share icon" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              onClick={ () => handleFavoriteClick(recipe) }
            >
              <img
                src={ favorited ? blackHeartIcon : whiteHeartIcon }
                alt="favorite icon"
              />
            </button>
            {copied && <p className="linkCopied">Link copied!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;

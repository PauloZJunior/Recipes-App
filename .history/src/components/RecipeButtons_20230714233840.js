import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeButtons({
  recipe,
  recipeType,
  recipeId,
  allIngredientsChecked,
}) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const recipeIndex = favoriteRecipes.findIndex((index) => index.id === recipeId);
    if (recipeIndex !== -1) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  });

  const handleClick = () => {
    const doneRecipe = [{
      id: recipeId,
      nationality: recipe.strArea || '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      category: recipe.strCategory || '',
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: recipeType === 'meals' ? 'meal' : 'drink',
      doneDate: new Date(),
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    history.push('/done-recipes');
  };

  const handleShareClick = () => {
    const recipeUrl = window.location.href.split('/in-progress')[0];
    copy(recipeUrl);
    setCopied(true);
  };

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const recipeIndex = favoriteRecipes.findIndex((index) => index.id === recipeId);
    if (recipeIndex !== -1) {
      favoriteRecipes.splice(recipeIndex, 1);
    } else {
      favoriteRecipes.push({
        id: recipeId,
        type: recipeType === 'meals' ? 'meal' : 'drink',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
        image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
      >
        {favorited ? (
          <img src={ blackHeartIcon } alt="Favorite" />
        ) : (
          <img src={ whiteHeartIcon } alt="Favorite" />
        )}
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
      {copied && <p>Link copied!</p>}
    </>
  );
}

export default RecipeButtons;

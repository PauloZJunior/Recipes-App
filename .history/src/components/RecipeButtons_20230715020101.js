import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Context from '../context/context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeButtons({ recipe, recipeType, recipeId }) {
  const history = useHistory();
  const { copied, setCopied, allIngredientsChecked, favorited, setFavorited } = useContext(Context);
  const location = useLocation();
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    const isDone = doneRecipes.some((doneRecipe) => doneRecipe.id === recipeId);
    setIsRecipeDone(isDone);

    const isRecipeInProgress = inProgressRecipes[recipeType] && inProgressRecipes[recipeType][recipeId];
    setIsRecipeInProgress(isRecipeInProgress);
  }, [recipeId, recipeType]);

  const handleStartRecipe = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const updatedInProgressRecipes = {
      ...inProgressRecipes,
      [recipeType]: {
        ...inProgressRecipes[recipeType],
        [recipeId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));

    history.push(`/${recipeType}/${recipeId}/in-progress`);
  };

  const handleContinueRecipe = () => {
    history.push(`/${recipeType}/${recipeId}/in-progress`);
  };

  const handleFinishRecipe = () => {
    const doneRecipe = {
      id: recipeId,
      nationality: recipe.strArea || '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      category: recipe.strCategory || '',
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: recipeType === 'meals' ? 'meal' : 'drink',
      doneDate: new Date(),
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const updatedDoneRecipes = [...doneRecipes, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));

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
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
      >
        {favorited ? (
          <img src={ blackHeartIcon } alt="Favorite" />
        ) : (
          <img src={ whiteHeartIcon } alt="Favorite" />
        )}
      </button>

      {location.pathname === `/${recipeType}/${recipeId}/in-progress` ? (
        isRecipeInProgress && !isRecipeDone ? (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !allIngredientsChecked }
            onClick={ handleFinishRecipe }
          >
            Finish Recipe
          </button>
        ) : (
          <button
            type="button"
            data-testid="continue-recipe-btn"
            onClick={ handleContinueRecipe }
          >
            Continue Recipe
          </button>
        )
      ) : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
        >
          Start Recipe
        </button>
      )}

      {copied && <p>Link copied!</p>}
    </>
  );
}

RecipeButtons.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
  recipeType: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default RecipeButtons;

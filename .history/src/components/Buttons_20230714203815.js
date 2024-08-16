import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeButtons({
  copied,
  favorited,
  allIngredientsChecked,
  handleShareClick,
  handleFavoriteClick,
  handleClick,
}) {
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

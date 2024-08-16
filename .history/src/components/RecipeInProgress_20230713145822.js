import React from 'react';
import Header from './Header';

function RecipeInProgress() {
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  console.log(recipeId);
  console.log(recipeType);
  return (
    <Header />
  );
}

export default RecipeInProgress;

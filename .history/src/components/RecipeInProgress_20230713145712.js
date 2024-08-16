import React from 'react';
import Header from './Header';

function RecipeInProgress() {
  const recipeId = window.location.pathname.split('/')[2];
  console.log(recipeId);
  return (
    <Header />
  );
}

export default RecipeInProgress;

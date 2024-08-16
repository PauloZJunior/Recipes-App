import React from 'react';
import Header from './Header';

function RecipeInProgress() {
  const URLId = window.location.pathname.split('/')[2];
  console.log(URLId);
  return (
    <Header />
  );
}

export default RecipeInProgress;

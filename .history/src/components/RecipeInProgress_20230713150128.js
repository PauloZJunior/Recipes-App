import React, { useEffect, useState } from 'react';
import Header from './Header';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';

function RecipeInProgress() {
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  console.log(recipeId);
  console.log(recipeType);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi(fetchRecipeDetails, URLType, URLId);
      setRecipe(URLType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Header />
  );
}

export default RecipeInProgress;

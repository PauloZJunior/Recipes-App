import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Header from './Header';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  console.log(recipeId);
  console.log(recipeType);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
      setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetch();
  }, [recipeId, recipeType]);

  if (loading) return <div>Loading...</div>;

  return (
    <Header />
  );
}

export default RecipeInProgress;

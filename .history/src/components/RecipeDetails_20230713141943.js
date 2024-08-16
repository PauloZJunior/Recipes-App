import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';

export default function RecipeDetails() {
  const URLId = window.location.pathname.split('/')[2];
  const URLType = window.location.pathname.split('/')[1];
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi(fetchRecipeDetails, URLType, URLId);
      setRecipe(URLType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;

  const ingredientsValues = Object.entries(recipe).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);
  const meansureValues = Object.entries(recipe).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value !== ' ') {
      return [...acc, value];
    }
    return acc;
  }, []);
  if (URLType === 'meals') {
    const { strMealThumb, strMeal, strYoutube, strCategory, strInstructions } = recipe;
    return (
      <div>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img
          src={ `${strMealThumb}/preview` }
          alt=""
          data-testid="recipe-photo"
        />
        {ingredientsValues.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${meansureValues[index]}`}
          </li>
        )) }
        <div data-testid="recipe-category">{strCategory}</div>
        <div data-testid="instructions">{strInstructions}</div>
        <iframe
          src={ strYoutube }
          title="youtube"
          data-testid="video"
        />
      </div>
    );
  }
  if (URLType === 'drinks') {
    const { strDrinkThumb, strDrink, strCategory,
      strInstructions, strAlcoholic } = recipe;
    return (
      <div>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img
          src={ `${strDrinkThumb}/preview` }
          alt=""
          data-testid="recipe-photo"
        />
        { ingredientsValues.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${meansureValues[index] || ''}`}
          </li>
        ))}
        <div data-testid="recipe-category">{`${strCategory} - ${strAlcoholic}`}</div>
        <div data-testid="instructions">{strInstructions}</div>
        {console.log(recipe)}
      </div>
    );
  }
}

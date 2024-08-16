import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false); // New state

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
      setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetchRecipe();
  }, [recipeId, recipeType]);
  console.log(recipe);
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const recipeProgress = inProgressRecipes[recipeType] || {};
    const checked = recipeProgress[recipeId] || [];
    setCheckedIngredients(checked);

    // Check if all ingredients are checked
    const ingredientCount = Object.keys(recipe).reduce((count, key) => {
      if (key.includes('Ingredient') && recipe[key]) {
        return count + 1;
      }
      return count;
    }, 0);
    setAllIngredientsChecked(checked.length === ingredientCount);
  }, [recipeId, recipeType, recipe]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const updatedRecipes = {
      ...inProgressRecipes,
      [recipeType]: {
        ...inProgressRecipes[recipeType],
        [recipeId]: checkedIngredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedRecipes));

    // Check if all ingredients are checked
    const ingredientCount = Object.keys(recipe).reduce((count, key) => {
      if (key.includes('Ingredient') && recipe[key]) {
        return count + 1;
      }
      return count;
    }, 0);
    setAllIngredientsChecked(checkedIngredients.length === ingredientCount);
  }, [recipeId, recipeType, checkedIngredients]);

  const handleIngredientCheck = (ingredientIndex) => {
    const isChecked = checkedIngredients.includes(ingredientIndex);
    if (isChecked) {
      setCheckedIngredients(checkedIngredients.filter((index) => index
      !== ingredientIndex));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredientIndex]);
    }
  };

  const handleClick = () => {
    const doneRecipe = [{
      id: recipeId,
      type: recipeType,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: { recipeType === 'meal' ? recipe.strMeal : recipe.strDrink },
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    }]
    localStorage.setItem('doneRecipes');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      {recipeType === 'meals' ? (
        <p data-testid="recipe-category">{recipe.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
      )}

      <h3>Ingredientes</h3>
      <ul>
        {Object.keys(recipe).map((key) => {
          if (key.includes('Ingredient') && recipe[key]) {
            const ingredientIndex = key.split('Ingredient')[1] - 1;
            const measureKey = `strMeasure${ingredientIndex}`;
            const ingredient = recipe[key];
            const measure = recipe[measureKey];
            const isChecked = checkedIngredients.includes(ingredientIndex);
            const ingredientStyle = isChecked
              ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
              : {};

            return (
              <li key={ ingredientIndex }>
                <label
                  data-testid={ `${ingredientIndex}-ingredient-step` }
                  style={ ingredientStyle }
                >
                  <input
                    type="checkbox"
                    checked={ isChecked }
                    onChange={ () => handleIngredientCheck(ingredientIndex) }
                  />
                  {`${ingredient} - ${measure}`}
                </label>
              </li>
            );
          }
          return null;
        })}
      </ul>

      {recipe.strInstructions && (
        <div data-testid="instructions">
          <h3>Instruções</h3>
          {recipe.strInstructions.split('\r\n').map((step, index) => (
            <p key={ index }>{step}</p>
          ))}
        </div>
      )}

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;

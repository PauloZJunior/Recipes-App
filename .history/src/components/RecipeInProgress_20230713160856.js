import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Header from './Header';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
      setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetchRecipe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />

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
            const ingredientIndex = key.split('Ingredient')[1];
            const measureKey = `strMeasure${ingredientIndex}`;
            const ingredient = recipe[key];
            const measure = recipe[measureKey];
            // const isChecked = checkedIngredients.includes(ingredient);
            return (
              <li key={ ingredientIndex }>
                <label data-testid={ `${ingredientIndex}-ingredient-step` }>
                  <input
                    type="checkbox"
                    // checked={ isChecked }
                    // onChange={ () => handleIngredientCheck(ingredient) }
                  />
                  {`${ingredient} - ${measure}`}
                </label>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <div data-testid="instructions">
      <h3>Instruções</h3>
      {recipe.strInstructions && (
          {recipe.strInstructions.split('\r\n').map((step, index) => (
            <p key={ index }>{step}</p>
          ))}
          )
        }
      </div>

      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;

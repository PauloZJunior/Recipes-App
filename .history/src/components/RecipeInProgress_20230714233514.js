import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';
import RecipeButtons from './RecipeButtons';
import Context from '../context/context';

function RecipeInProgress() {
  const { recipes } = useContext(Context);
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  console.log(recipes);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
      setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetchRecipe();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const recipeIndex = favoriteRecipes.findIndex((index) => index.id === recipeId);
    if (recipeIndex !== -1) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [recipeId, recipeType]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const recipeProgress = inProgressRecipes[recipeType] || {};
    const checked = recipeProgress[recipeId] || [];
    setCheckedIngredients(checked);

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
            const ingredientStyle = isChecked ? { textDecoration: 'line-through' } : {};

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

      <RecipeButtons
        recipe={ recipe }
        recipeId={ recipeId }
        recipeType={ recipeType }

        copied={ copied }
        favorited={ favorited }
        allIngredientsChecked={ allIngredientsChecked }
      />
    </div>
  );
}

export default RecipeInProgress;

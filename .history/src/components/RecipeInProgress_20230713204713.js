import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

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

  const handleFinishClick = () => {
    const doneRecipe = [{
      id: recipeId,
      type: recipeType,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    history.push('/done-recipes');
  };

  const handleShareClick = () => {
    const link = window.location.href;
    copy(link);
    setCopied(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      {recipeType === 'meals' ? (
        <p data-testid="recipe-category">{recipe.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
      )}

      <h2>Ingredientes</h2>
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
          <h2>Instruções</h2>
          {recipe.strInstructions.split('\r\n').map((step, index) => (
            <p key={ index }>{step}</p>
          ))}
        </div>
      )}

      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="Favorite" />
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleFinishClick }
      >
        Finalizar Receita
        {copied && <p>Link copied!</p>}
      </button>
    </div>
  );
}

export default RecipeInProgress;
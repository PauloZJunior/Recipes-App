import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import Context from '../context/context';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';
import RecipeButtons from './RecipeButtons';
import checkboxChecked from '../images/CheckboxChecked.svg';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { setAllIngredientsChecked } = useContext(Context);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
      setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [recipeId, recipeType, recipe, setAllIngredientsChecked]);

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
  }, [recipeId, recipeType, checkedIngredients, recipe, setAllIngredientsChecked]);

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
    <div className="InProgressMainContainer">
      <div className="divBanner">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="recipe"
          data-testid="recipe-photo"
          className="recipeImage"
        />
        <h2
          data-testid="recipe-title"
          className="recipeTitle"
        >
          {recipe.strMeal || recipe.strDrink}

        </h2>
      </div>
      {recipeType === 'meals' ? (
        <p data-testid="recipe-category">{recipe.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
      )}

      <h3 className="ingredientsTile">Ingredients</h3>
      <div className="ingredientsListContainer">
        <ul className="ingredientsList">
          {Object.keys(recipe).map((key) => {
            if (key.includes('Ingredient') && recipe[key]) {
              const ingredientIndex = key.split('Ingredient')[1] - 1;
              const measureKey = `strMeasure${ingredientIndex}`;
              const ingredient = recipe[key];
              const measure = recipe[measureKey];
              const isChecked = checkedIngredients.includes(ingredientIndex);
              const ingredientStyle = isChecked ? { textDecoration:
              'line-through solid rgb(0, 0, 0)' } : {};

              return (
                <li key={ ingredientIndex } className="ingredientListItem">
                  <label
                    data-testid={ `${ingredientIndex}-ingredient-step` }
                    style={ ingredientStyle }
                    className="ingredientCheckbox"
                  >
                    <input
                      type="checkbox"
                      checked={ isChecked }
                      onChange={ () => handleIngredientCheck(ingredientIndex) }
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M10.0541 2.4866L10.0542 2.4865C10.3799 2.16081 10.3799 1.63937 10.0542 1.31368C9.72855 0.987991 9.20711 0.987991 8.88142 1.31368L3.78418 6.41091L2.11858 4.74531C1.79289 4.41963 1.27145 4.41963 0.94576 4.74531C0.620071 5.071 0.620071 5.59245 0.94576 5.91814L3.19241 8.16479C3.51807 8.49044 4.0448 8.49048 4.37049 8.16489C4.37053 8.16485 4.37056 8.16482 4.37059 8.16479L10.0541 2.4866Z" fill="#FCC436" stroke="#FCC436" strokeWidth="0.597014" />
                    </svg>
                    <span className="checkmark">
                      {/* <img src={ checkboxChecked } alt="checkbox" /> */}
                    </span>
                    {`${ingredient} - ${measure}`}
                  </label>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      {recipe.strInstructions && (
        <div data-testid="instructions">
          <h3>Instructions</h3>
          {recipe.strInstructions.split('\r\n').map((step, index) => (
            <p key={ index }>{step}</p>
          ))}
        </div>
      )}

      <RecipeButtons
        recipe={ recipe }
        recipeId={ recipeId }
        recipeType={ recipeType }
      />
    </div>
  );
}

export default RecipeInProgress;

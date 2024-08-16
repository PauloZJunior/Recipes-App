import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState([]);
  const recipeId = window.location.pathname.split('/')[2];
  const recipeType = window.location.pathname.split('/')[1];
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const magicNumber = -1;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetchApi(fetchRecipeDetails, recipeType, recipeId);
        setRecipe(recipeType === 'meals' ? response.meals[0] : response.drinks[0]);
      } catch (error) {
        // Tratar erro ao recuperar os dados da receita
        console.log(error);
      }
    };

    const checkIfFavorited = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const recipeIndex = favoriteRecipes.findIndex((index) => index.id === recipeId);
      setFavorited(recipeIndex !== magicNumber);
    };

    fetchRecipe();
    checkIfFavorited();
  }, [recipeId, recipeType, fetchApi, magicNumber]);

  useEffect(() => {
    const updateCheckedIngredients = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
       || {};
      const recipeProgress = inProgressRecipes[recipeType] || {};
      const checked = recipeProgress[recipeId] || [];
      setCheckedIngredients(checked);

      const ingredientCount = countIngredients();
      setAllIngredientsChecked(checked.length === ingredientCount);
    };

    updateCheckedIngredients();
  }, [recipeId, recipeType]);

  useEffect(() => {
    const updateInProgressRecipes = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
       || {};
      const updatedRecipes = {
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [recipeId]: checkedIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedRecipes));

      const ingredientCount = countIngredients();
      setAllIngredientsChecked(checkedIngredients.length === ingredientCount);
    };

    updateInProgressRecipes();
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
    const doneRecipe = {
      id: recipeId,
      nationality: recipe.strArea || '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      category: recipe.strCategory || '',
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: recipeType === 'meals' ? 'meal' : 'drink',
      doneDate: new Date(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    history.push('/done-recipes');
  };

  const handleShareClick = () => {
    const recipeUrl = window.location.href.split('/in-progress')[0];
    copy(recipeUrl);
    setCopied(true);
  };

  const handleFavoriteClick = () => {
    setFavorited(!favorited);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const recipeIndex = favoriteRecipes.findIndex((index) => index.id === recipeId);

    if (recipeIndex !== magicNumber) {
      favoriteRecipes.splice(recipeIndex, 1);
    } else {
      favoriteRecipes.push({
        id: recipeId,
        type: recipeType === 'meals' ? 'meal' : 'drink',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
        image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      });
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const countIngredients = () => Object.keys(recipe).reduce((count, key) => {
    if (key.includes('Ingredient') && recipe[key]) {
      return count + 1;
    }
    return count;
  }, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

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

      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
      >
        {favorited ? (
          <img src={ blackHeartIcon } alt="Favorite" />
        ) : (
          <img src={ whiteHeartIcon } alt="Favorite" />
        )}
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>

      {copied && <p>Link copied!</p>}
    </div>
  );
}

export default RecipeInProgress;

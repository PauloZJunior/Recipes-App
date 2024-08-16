import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchRecipeDetails } from '../services/recipeDetailsFetch';
import { fetchMeal, fetchDrink } from '../services/recipeFetch';
import './RecipeDetails.css';
import RecipeButtons from './RecipeButtons';

export default function RecipeDetails() {
  const location = useLocation();
  const URLId = location.pathname.split('/')[2];
  const URLType = location.pathname.split('/')[1];
  const { loading, fetchApi } = useFetch();
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const six = 6;

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchApi(fetchRecipeDetails, URLType, URLId);
      setRecipe(URLType === 'meals' ? response.meals[0] : response.drinks[0]);
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URLId, URLType]);

  useEffect(() => {
    const fetch = async () => {
      if (URLType === 'meals') {
        const response = await fetchApi(fetchDrink, '', 'name');
        setRecomendations(response.drinks);
      }
      if (URLType === 'drinks') {
        const response = await fetchApi(fetchMeal, '', 'name');
        setRecomendations(response.meals);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe, URLType]);

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
          src={ strYoutube.replace('watch?v=', 'embed/') }
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          title="youtube"
          data-testid="video"
        />
        <div className="recommendedContainer">
          {recomendations.slice(0, six).map((recomendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recommendedCard"
            >

              <div>
                <div
                  data-testid={ `${index}-recommendation-title` }
                  className="titleRecommended"
                >
                  {recomendation.strDrink}
                </div>
                <img
                  src={ `${recomendation.strDrinkThumb}` }
                  alt=""
                  className="imgRecommended"
                />
              </div>
            </div>
          ))}
        </div>

        <RecipeButtons
          recipe={ recipe }
          recipeId={ URLId }
          recipeType={ URLType }
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
        <div className="recommendedContainer">
          {recomendations.slice(0, six).map((recomendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recommendedCard"
            >
              <div data-testid={ `${index}-recommendation-title` }>
                {recomendation.strMeal}
              </div>
              <img
                src={ `${recomendation.strMealThumb}/preview` }
                alt=""
              />
            </div>
          ))}
        </div>
        <RecipeButtons
          recipe={ recipe }
          recipeId={ URLId }
          recipeType={ URLType }
        />
      </div>
    );
  }
}

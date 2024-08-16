/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Context from '../context/context';
import RecipeCard from './RecipeCard';
import Filters from './Filters';
import { fetchDrinkCategories, fetchMealCategories } from '../services/categoriesFetch';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const { recipes, setDrinksCategories, setMealsCategories } = useContext(Context);
  const { pathname } = useLocation();
  const [limitedRecipes, setLimitedRecipes] = useState([]);
  const limit = 12;
  const { fetchApi } = useFetch();

  useEffect(() => {
    const newRecipes = recipes?.slice(0, limit);
    setLimitedRecipes(newRecipes);
  }, [recipes]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchApi(fetchDrinkCategories);
      setDrinksCategories(response.drinks);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchApi(fetchMealCategories);
      setMealsCategories(response.meals);
    };
    fetchCategories();
  }, []);

  if (pathname === '/meals') {
    return (
      <div>
        <Filters />
        <div className="container mt-4 mb-5">
          <div
            className="row justify-content-around align-items-center"
          >
            {
              limitedRecipes && limitedRecipes.map((recipe, index) => (
                <RecipeCard
                  key={ index }
                  name={ recipe.strMeal }
                  src={ recipe.strMealThumb }
                  index={ index }
                  id={ recipe.idMeal }
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Filters />
      <div className="container mt-4 mb-5">
        <div
          className="row justify-content-around align-items-center"
        >
          {
            limitedRecipes && limitedRecipes.map((recipe, index) => (
              <RecipeCard
                key={ index }
                name={ recipe.strDrink }
                src={ recipe.strDrinkThumb }
                index={ index }
                id={ recipe.idDrink }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Recipes;

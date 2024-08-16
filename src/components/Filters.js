/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Context from '../context/context';
import useFetch from '../hooks/useFetch';
import { fetchRecipesByCategory } from '../services/categoriesFetch';
import { fetchAllDrinks, fetchAllMeals } from '../services/recipeFetch';
import allMealsIcon from '../images/allMealsIcon.svg';
import allDrinksIcon from '../images/allDrinksIcon.svg';
import { drinksIcons, mealsIcons } from '../helpers/iconsArray';

function Filters() {
  const { mealsCategories, drinksCategories,
    setRecipes } = useContext(Context);
  const { pathname } = useLocation();
  const [limitedCategories, setLimitedCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState({
    bool: false,
    category: '',
  });
  const { fetchApi } = useFetch();
  const limit = 5;

  useEffect(() => {
    if (pathname === '/meals') {
      setLimitedCategories(mealsCategories?.slice(0, limit));
    }
    if (pathname === '/drinks') {
      setLimitedCategories(drinksCategories?.slice(0, limit));
    }
  }, [pathname, mealsCategories, drinksCategories]);

  const handleClick = async (category, type) => {
    if (category === 'All' && type === 'meals') {
      const response = await fetchApi(fetchAllMeals);
      setRecipes(response.meals);
    } else if (category === 'All' && type === 'drinks') {
      const response = await fetchApi(fetchAllDrinks);
      setRecipes(response.drinks);
    } else if (category === isFiltered.category) {
      setIsFiltered({
        bool: !isFiltered.bool,
        category: '',
      });
      if (type === 'meals') {
        const response = await fetchApi(fetchAllMeals);
        setRecipes(response.meals);
      }
      if (type === 'drinks') {
        const response = await fetchApi(fetchAllDrinks);
        setRecipes(response.drinks);
      }
    } else {
      setIsFiltered({
        bool: true,
        category,
      });
      const response = await fetchApi(fetchRecipesByCategory, category, type);
      setRecipes(response[type]);
    }
  };

  if (pathname === '/meals') {
    return (
      <div className="container bg-light py-1">
        <div className="d-flex justify-content-between align-items-start">
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => handleClick('All', 'meals') }
            style={ { backgroundColor: 'transparent', border: 'none' } }
          >
            <img src={ allMealsIcon } alt="all-meals-icon" />
          </button>
          {
            limitedCategories.map((category, index) => (
              <button
                key={ index }
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                onClick={ () => handleClick(category.strCategory, 'meals') }
                style={ { backgroundColor: 'transparent', border: 'none' } }
              >
                <img src={ mealsIcons[index] } alt={ category.strCategory } />
              </button>
            ))
          }
        </div>
      </div>
    );
  }
  return (
    <div className="container bg-light py-1">
      <div className="d-flex justify-content-between align-items-start">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleClick('All', 'drinks') }
          style={ { backgroundColor: 'transparent', border: 'none' } }
        >
          <img src={ allDrinksIcon } alt="" />
        </button>
        {
          limitedCategories.map((category, index) => (
            <button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              onClick={ () => handleClick(category.strCategory, 'drinks') }
              style={ { backgroundColor: 'transparent', border: 'none' } }
            >
              <img src={ drinksIcons[index] } alt={ category.strCategory } />
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Filters;

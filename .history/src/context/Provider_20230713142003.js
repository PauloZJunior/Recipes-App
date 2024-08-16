import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
  }), [recipes, mealsCategories, drinksCategories]);

  return (
    <Context.Provider value={ store }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

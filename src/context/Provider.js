import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  const store = useMemo(() => ({
    recipes,
    setRecipes,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    allIngredientsChecked,
    setAllIngredientsChecked,
    copied,
    setCopied,
    favorited,
    setFavorited,
    isRecipeDone,
    setIsRecipeDone,
    isRecipeInProgress,
    setIsRecipeInProgress,
  }), [recipes, mealsCategories, drinksCategories,
    allIngredientsChecked, copied, favorited, isRecipeDone, isRecipeInProgress]);

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

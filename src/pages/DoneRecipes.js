import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { pathname } = useLocation();
  console.log(pathname);

  const [allRecipes, setAllRecipes] = useState([]);
  const [doneRecipes, setDoneRecipe] = useState([]);

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipe(parsed);
    setAllRecipes(parsed);
  }, []);

  const handleShareClick = (index, recipeData) => {
    const recipeUrl = window.location.href.split('/done-recipes')[0];
    const fullUrl = `${recipeUrl}/meals/${recipeData.id}`;
    try {
      navigator.clipboard.writeText(fullUrl);
    } catch (error) {
      console.log('Nao copiou');
    }

    const recipe = doneRecipes[index];
    recipe.shareButtonCopy = true;

    setDoneRecipe(doneRecipes);
    document.getElementById(`shareButton-${recipe.id}`).hidden = false;
  };

  const handleClick = (type) => {
    if (type === 'meals') {
      const filteredRecipes = allRecipes.filter(
        (mealItem) => mealItem.type === 'meal',
      );

      setDoneRecipe(filteredRecipes);
    } else if (type === 'drinks') {
      const filteredRecipes = allRecipes.filter(
        (drinkItem) => drinkItem.type === 'drink',
      );

      setDoneRecipe(filteredRecipes);
    } else {
      setDoneRecipe(allRecipes);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="filters">
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ () => handleClick('meals') }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => handleClick('drinks') }
          >
            Drinks
          </button>

          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => handleClick('All') }
          >
            All
          </button>
        </div>

        <div key="items" style={ { display: 'inline-grid', width: '100%' } }>
          {
            doneRecipes && doneRecipes.map((recipe, index) => (
              <div
                key={ index }
                style={ {
                  display: 'inline-flex',
                  maxHeight: '200px',
                  marginBottom: '16px',
                  width: '100%',
                } }
              >
                <Link
                  to={
                    recipe.type === 'meal'
                      ? `/meals/${recipe.id}`
                      : `/drinks/${recipe.id}`
                  }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    alt="20"
                    src={ recipe.image }
                    height="200px"
                  />
                </Link>
                <div
                  style={ {
                    display: 'inline-grid',
                    height: 'fit-content',
                    width: '100%',
                  } }
                >
                  <div>
                    {recipe.type === 'meal' ? (
                      <label
                        style={ { marginRight: '8px' } }
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${recipe.nationality} - ${recipe.category}`}
                      </label>
                    ) : (
                      <label data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.alcoholicOrNot}
                      </label>
                    )}
                  </div>

                  <Link
                    to={
                      recipe.type === 'meal'
                        ? `/meals/${recipe.id}`
                        : `/drinks/${recipe.id}`
                    }
                  >
                    <label data-testid={ `${index}-horizontal-name` }>
                      {recipe.name}
                    </label>
                  </Link>

                  <label data-testid={ `${index}-horizontal-done-date` }>
                    {recipe.doneDate}
                  </label>
                  <button
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                    onClick={ () => handleShareClick(index, recipe) }
                  >
                    <img src={ shareIcon } alt="Share" />
                  </button>

                  <div id={ `shareButton-${recipe.id}` } hidden>
                    Link copied!
                  </div>

                  {recipe.tags?.slice(0, 2).map((tag, tagIndex) => (
                    <ul
                      key={ tagIndex }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      style={ { display: 'flex' } }
                    >
                      {tag}
                    </ul>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default DoneRecipes;

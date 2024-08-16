/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/';
import useFetch from '../hooks/useFetch';
import { fetchMeal, fetchDrink } from '../services/recipeFetch';
import Context from '../context/context';
import '../styles/SearchBar.css';

function SearchBar() {
  const { recipes, setRecipes } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState({
    value: '',
    type: 'ingredient',
  });
  const { loading, fetchApi } = useFetch();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setSearchTerm({ value: '', type: 'ingredient' });
  }, []);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idMeal, idDrink } = recipes[0];
      if (pathname === '/meals') {
        history.push(`/meals/${idMeal}`);
      }
      if (pathname === '/drinks') {
        history.push(`/drinks/${idDrink}`);
      }
    }
    if (recipes.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  const handleSearch = async () => {
    try {
      const { value, type } = searchTerm;
      if (type === 'first-letter' && value.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (pathname === '/meals') {
        const response = await fetchApi(fetchMeal, value, type);
        setRecipes(response.meals === null ? [] : response.meals);
      } else if (pathname === '/drinks') {
        const response = await fetchApi(fetchDrink, value, type);
        setRecipes(response.drinks === null ? [] : response.drinks);
      }
    } finally {
      setSearchTerm({ value: '', type: 'ingredient' });
    }
  };

  return (
    <div
      className="container mt-4 custom-searchbar"
    >
      <div className="row">
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          value={ loading ? 'Loading' : searchTerm.value }
          onChange={ ({ target }) => {
            setSearchTerm({ ...searchTerm, value: target.value });
          } }
          className="form-control mb-2"
        />
        <div
          className="col-md-6 offset-md-3 d-flex flex-row justify-content-between"
        >
          <div className="form-check form-check-inline mb-2">
            <input
              type="radio"
              name="search-type"
              id="ingredient"
              data-testid="ingredient-search-radio"
              checked={ searchTerm.type === 'ingredient' }
              onChange={ ({ target }) => {
                setSearchTerm({ ...searchTerm, type: target.id });
              } }
              className="form-check-input"
            />
            <label
              htmlFor="ingredient"
              className="form-check-label custom-label"
            >
              Ingredient
            </label>
          </div>
          <div className="form-check form-check-inline mb-2">
            <input
              type="radio"
              name="search-type"
              id="name"
              data-testid="name-search-radio"
              checked={ searchTerm.type === 'name' }
              onChange={ ({ target }) => {
                setSearchTerm({ ...searchTerm, type: target.id });
              } }
              className="form-check-input"
            />
            <label
              htmlFor="name"
              className="form-check-label custom-label"
            >
              Name
            </label>
          </div>
          <div className="form-check form-check-inline mb-2">
            <input
              type="radio"
              name="search-type"
              id="first-letter"
              data-testid="first-letter-search-radio"
              checked={ searchTerm.type === 'first-letter' }
              onChange={ ({ target }) => {
                setSearchTerm({ ...searchTerm, type: target.id });
              } }
              className="form-check-input"
            />
            <label
              htmlFor="first-letter"
              className="form-check-label  custom-label"
            >
              First Letter
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
          className="btn custom-button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

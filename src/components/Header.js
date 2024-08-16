import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import mealTitle from '../images/mealLogo.svg';
import drinkTitle from '../images/drinkLogo.svg';
import recipesApp from '../images/recipesLogo.svg';
import recipeIcon from '../images/recipeIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const color = 'rgba(252, 220, 54, 1)';
  const location = useLocation();
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const renderHeader = () => {
    const { pathname } = location;
    switch (pathname) {
    case '/meals':
      return (
        <>
          <div className="row">
            <div
              className="col d-flex justify-content-between align-items-center p-2"
              style={ { backgroundColor: color } }
            >
              <img src={ recipeIcon } alt="" />
              <img src={ recipesApp } alt="" />
              <button
                type="button"
                className="header-button btn mx-2"
                onClick={ handleSearchClick }
              >
                <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
              </button>
              <button
                type="button"
                className="btn mx-2"
                onClick={ () => history.push('/profile') }
              >
                <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center p-2">
              <h2
                data-testid="page-title"
              >
                <img src={ mealTitle } alt="meal icon" />
                <br />
                Meals
              </h2>
            </div>
          </div>
        </>
      );
    case '/drinks':
      return (
        <>
          <div className="row">
            <div
              className="col d-flex justify-content-between align-items-center p-2"
              style={ { backgroundColor: color } }
            >
              <img src={ recipeIcon } alt="" />
              <img src={ recipesApp } alt="" />
              <button
                type="button"
                className="header-button btn mx-2"
                onClick={ handleSearchClick }
              >
                <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
              </button>
              <button
                type="button"
                className="btn mx-2"
                onClick={ () => history.push('/profile') }
              >
                <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center p-2">
              <h2
                data-testid="page-title"
              >
                <img src={ drinkTitle } alt="drink icon" />
                <br />
                Drinks
              </h2>
            </div>
          </div>
        </>
      );
    case '/profile':
      return (
        <>
          <div className="row">
            <div
              className="col d-flex justify-content-between align-items-center p-2"
              style={ { backgroundColor: color } }
            >
              <img src={ recipeIcon } alt="" />
              <img src={ recipesApp } alt="" />
              <button
                type="button"
                className="btn mx-2"
                onClick={ () => history.push('/profile') }
              >
                <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center p-2">
              <h2
                data-testid="page-title"
              >
                Profile
              </h2>
            </div>
          </div>
        </>
      );
    case '/done-recipes':
      return (
        <>
          <div className="row">
            <div
              className="col d-flex justify-content-between align-items-center p-2"
              style={ { backgroundColor: color } }
            >
              <img src={ recipeIcon } alt="" />
              <img src={ recipesApp } alt="" />
              <button
                type="button"
                className="btn mx-2"
                onClick={ () => history.push('/profile') }
              >
                <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center p-2">
              <h2
                data-testid="page-title"
              >
                Done Recipes
              </h2>
            </div>
          </div>
        </>
      );
    case '/favorite-recipes':
      return (
        <>
          <div className="row">
            <div
              className="col d-flex justify-content-between align-items-center p-2"
              style={ { backgroundColor: color } }
            >
              <img src={ recipeIcon } alt="" />
              <img src={ recipesApp } alt="" />
              <button
                type="button"
                className="btn mx-2"
                onClick={ () => history.push('/profile') }
              >
                <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center p-2">
              <h2
                data-testid="page-title"
              >
                Favorite Recipes
              </h2>
            </div>
          </div>
        </>
      );
    default:
      return null;
    }
  };

  return (
    <div className=" header container-fluid bg-light">
      {renderHeader()}
      {showSearchBar && <SearchBar />}
    </div>
  );
}

export default Header;

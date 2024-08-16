import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const renderHeader = () => {
    const { pathname } = location;
    switch (pathname) {
    case '/':
      return null;
    case '/meals':
      return (
        <div>
          <h2 data-testid="page-title">Meals</h2>
          <Link to="/profile">
            <button
              type="button"
              className="header-button"
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
          <button
            type="button"
            className="header-button"
            onClick={ handleSearchClick }
          >
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </button>
        </div>
      );
    case '/drinks':
      return (
        <div>
          <h2 data-testid="page-title">Drinks</h2>
          <Link to="/profile">
            <button
              type="button"
              className="header-button"
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
          <button
            type="button"
            className="header-button"
            onClick={ handleSearchClick }
          >
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </button>
        </div>
      );
    case '/profile':
      return (
        <div>
          <h2 data-testid="page-title">Profile</h2>
          <button
            type="button"
            className="header-button"
          >
            <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
          </button>
        </div>
      );
    case '/done-recipes':
      return (
        <div>
          <h2 data-testid="page-title">Done Recipes</h2>
          <Link to="/profile">
            <button
              type="button"
              className="header-button"
              onClick={ handleSearchClick }
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
        </div>
      );
    case '/favorite-recipes':
      return (
        <div>
          <h2 data-testid="page-title">Favorite Recipes</h2>
          <Link to="/profile">
            <button
              type="button"
              className="header-button"
              onClick={ handleSearchClick }
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div className="header">
      <div>
        <h1>RECIPES app</h1>
        {renderHeader()}
        {showSearchBar && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;

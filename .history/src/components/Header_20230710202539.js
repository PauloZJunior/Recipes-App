import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowSearchBar(!showSearchBar);
    }
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
              onClick={ handleSearchClick }
              onKeyDown={ handleSearchKeyDown }
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
          <button
            type="button"
            className="header-button"
            onClick={ handleSearchClick }
            onKeyDown={ handleSearchKeyDown }
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
              onClick={ handleSearchClick }
              onKeyDown={ handleSearchKeyDown }
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
          <button
            type="button"
            className="header-button"
            onClick={ handleSearchClick }
            onKeyDown={ handleSearchKeyDown }
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
            onClick={ handleSearchClick }
            onKeyDown={ handleSearchKeyDown }
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
              onKeyDown={ handleSearchKeyDown }
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
              onKeyDown={ handleSearchKeyDown }
            >
              <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
            </button>
          </Link>
        </div>
      );
    default:
      return (
        <div>
          <h1>Page Not Found</h1>
          <Link to="/">
            <button type="button">Voltar</button>
          </Link>

        </div>
      );
    }
  };

  return (
    <div className="header">
      <div>
        <h1>RECIPES app</h1>
        {renderHeader()}
        {showSearchBar && (
          <input type="text" placeholder="Search" data-testid="search-input" />
        )}
      </div>
    </div>
  );
}

export default Header;
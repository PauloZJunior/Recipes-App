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
    case '/meals':
      return (
        <>
          <h2 data-testid="page-title">Meals</h2>
          <Link to="/profile">
            <button
              type="button"
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
        </>
      );
    case '/drinks':
      return (
        <>
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
        </>
      );
    case '/profile':
      return (
        <>
          <h2 data-testid="page-title">Profile</h2>
          <button
            type="button"
            className="header-button"
          >
            <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
          </button>
        </>
      );
    case '/done-recipes':
      return (
        <>
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
        </>
      );
    case '/favorite-recipes':
      return (
        <>
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
        </>
      );
    default:
      return null;
    }
  };

  return (
    <div className="header">
      <h1>RECIPES app</h1>
      {renderHeader()}
      {showSearchBar && <SearchBar />}
    </div>
  );
}

export default Header;

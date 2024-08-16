import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileIcon } from 'src/images/profileicon.svg';
import { SearchIcon } from 'src/images/searchicon.svg';

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const renderProfileIcon = () => (
    <Link to="/profile" data-testid="profile-top-btn">
      <ProfileIcon />
    </Link>
  );

  const renderSearchIcon = () => (
    <Link to="/search" data-testid="search-top-btn">
      <SearchIcon />
    </Link>
  );

  const renderHeader = () => {
    const pageTitle = getPageTitle();

    if (pageTitle) {
      return (
        <header>
          <h1 data-testid="page-title">{pageTitle}</h1>
          {renderProfileIcon()}
          {location.pathname === '/meals' || location.pathname === '/drinks'
            ? renderSearchIcon() : null}
        </header>
      );
    }

    return null;
  };

  return renderHeader();
}

export default Header;

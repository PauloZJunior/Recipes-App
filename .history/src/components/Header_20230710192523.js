import React from 'react';
import PropTypes from 'prop-types';
import profileicon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <div className="header">
      <div>
        <h1>RECIPES app</h1>
        <link src={ profileicons } data-testid="profile-top-btn">perfil</link>
        <button data-testid="search-top-btn">buscar</button>
      </div>
      <div>
        <h2 data-testid="page-title">{`${title}`}</h2>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

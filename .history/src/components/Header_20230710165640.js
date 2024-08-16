import React from 'react';

function Header() {
  return (
    <div className="header">
      <h1 data-testid="page-title">RECIPES app</h1>
      <button data-testid="profile-top-btn">perfil</button>
      <button data-testid="search-top-btn">buscar</button>
    </div>
  );
}

export default Header;

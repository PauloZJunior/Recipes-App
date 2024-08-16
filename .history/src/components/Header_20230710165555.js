import React from 'react';

function Header() {
  return (
    <div className="header">
      <button data-testid="profile-top-btn">perfil</button>
      <button data-testid="search-top-btn">buscar</button>
      <h1 data-testid="page-title">Comidas</h1>
    </div>
  );
}

export default Header;

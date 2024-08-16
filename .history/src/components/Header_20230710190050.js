import React from 'react';

function Header(title) {
  const { titlepage } = title;
  return (
    <div className="header">
      <div>
        <h1>RECIPES app</h1>
        <button data-testid="profile-top-btn">perfil</button>
        <button data-testid="search-top-btn">buscar</button>
      </div>
      <div>
        <h2 data-testid="page-title">{`${titlepage}`}</h2>
      </div>
    </div>
  );
}

export default Header;

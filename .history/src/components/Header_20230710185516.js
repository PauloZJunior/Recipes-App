import React from 'react';

function Header(title) {
  console.log(title);
  return (
    <div className="header">
      <div>
        <h1>RECIPES app</h1>
        <button data-testid="profile-top-btn">perfil</button>
        <button data-testid="search-top-btn">buscar</button>
      </div>
      <div>
        <h2 data-testid="page-title">{`${title}`}</h2>
      </div>
    </div>
  );
}

export default Header;

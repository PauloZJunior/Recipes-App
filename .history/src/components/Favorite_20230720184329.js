import React, { useEffect } from 'react';

function Favorite() {
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favoriteRecipes);
  });
  return (
    <div>
      FavoriteRecipes
    </div>
  );
}

export default Favorite;

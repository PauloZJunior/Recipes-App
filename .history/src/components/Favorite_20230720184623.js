import React, { useEffect } from 'react';

function Favorite() {
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favoriteRecipes);
  });
  return (
    <div>
      {favoriteRecipes.map((recipe) => (
        <div key={ recipe.id }>
          <img src={ recipe.image } alt={recipe.name} />
          <p>{recipe.name}</p>
      ))}
    </div>
  );
}

export default Favorite;

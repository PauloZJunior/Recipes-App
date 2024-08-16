import React, { useEffect, useState } from 'react';

function Favorite() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favorites);
  });
  return (
    <div>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <img src={ recipe.image } alt={ recipe.name } />
          <p>{recipe.name}</p>
          <p>{recipe.category}</p>
          <p>{recipe.area}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorite;

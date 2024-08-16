export const fetchRecipeDetails = async (URLType, URLId) => {
  if (URLType === 'meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${URLId}`);
    const data = await response.json();
    return data;
  }
  if (URLType === 'drinks') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${URLId}`);
    const data = await response.json();
    return data;
  }
};

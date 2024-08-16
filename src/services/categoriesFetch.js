const MEAL_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MEAL_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINK_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const fetchMealCategories = async () => {
  const response = await fetch(MEAL_CATEGORIES_URL);
  const data = await response.json();
  return data;
};

export const fetchDrinkCategories = async () => {
  const response = await fetch(DRINK_CATEGORIES_URL);
  const data = await response.json();
  return data;
};

export const fetchRecipesByCategory = async (category, type) => {
  if (type === 'meals') {
    const response = await fetch(`${MEAL_CATEGORY_URL}${category}`);
    const data = await response.json();
    return data;
  }
  if (type === 'drinks') {
    const response = await fetch(`${DRINK_CATEGORY_URL}${category}`);
    const data = await response.json();
    return data;
  }
};

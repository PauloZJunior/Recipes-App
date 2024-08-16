const MEAL_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const DRINK_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const fetchMeal = async (searchTerm, type) => {
  if (type === 'ingredient') {
    const response = await fetch(`${MEAL_INGREDIENT_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
  if (type === 'name') {
    const response = await fetch(`${MEAL_NAME_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
  if (type === 'first-letter') {
    const response = await fetch(`${MEAL_FIRST_LETTER_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
};

export const fetchDrink = async (searchTerm, type) => {
  if (type === 'ingredient') {
    const response = await fetch(`${DRINK_INGREDIENT_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
  if (type === 'name') {
    const response = await fetch(`${DRINK_NAME_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
  if (type === 'first-letter') {
    const response = await fetch(`${DRINK_FIRST_LETTER_URL}${searchTerm}`);
    const data = await response.json();
    return data;
  }
};

export const fetchAllMeals = async () => {
  const response = await fetch(MEAL_NAME_URL);
  const data = await response.json();
  return data;
};

export const fetchAllDrinks = async () => {
  const response = await fetch(DRINK_NAME_URL);
  const data = await response.json();
  return data;
};

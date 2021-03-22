const FOOD_API = 'https://www.themealdb.com/api.php';
const DRINK_API = 'https://www.thecocktaildb.com/api.php';
const FOOD_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const filterIngredient = async (query, currentPage) => {
  const INGREDIENT_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  const api = await fetch(`${INGREDIENT_API}?i=${query}`);
  const result = await api.json();
  return result;
};

export const filterName = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?s=${query}`);
  const result = await api.json();
  return result;
};

export const filterFirstLetter = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?f=${query}`);
  const result = await api.json();
  return result;
};

export const apiFood = async () => {
  const api = await fetch(FOOD_API);
  const result = await api.json();
  return result;
};

export const apiFoodId = async (id) => {
  const api = await fetch(FOOD_DETAILS + id);
  const result = await api.json();
  return result;
};

export const apiDrink = async () => {
  const api = await fetch(DRINK_API);
  const result = await api.json();
  return result;
};

export const apiDrinkId = async (id) => {
  const api = await fetch(DRINK_DETAILS + id);
  const result = await api.json();
  return result;
};
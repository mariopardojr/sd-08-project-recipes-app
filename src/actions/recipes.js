import { ADD_CATEGORIES, ADD_FAVORITE, ADD_RECIPES,
  ADD_RECOMMENDATIONS, END_RECIPE, REQUEST_RECIPES, RM_FAVORITE,
  START_RECIPE, ADD_BYINGREDIENT } from './index';

const addRecipes = (payload) => ({
  type: ADD_RECIPES,
  payload,
});

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

export const fetchRecipes = (type = 'meals',
  { request = 'search', key = 's', parameter = '' } = {}) => (
  async (dispatch) => {
    const token = 1;
    dispatch(requestRecipes());
    const domains = { meals: 'themealdb', drinks: 'thecocktaildb' };
    let url = `https://www.${domains[type]}.com/api/json/v1/${token}/${request}.php?${key}=${parameter}`;
    if (!key) url = `https://www.${domains[type]}.com/api/json/v1/${token}/${request}.php`;
    const data = await fetch(url);
    const { [type]: recipes } = await data.json();
    dispatch(addRecipes(recipes));
  }
);

// if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list')
// return Promise.resolve(mealIngredients);

// if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')
// return Promise.resolve(mealsByIngredient);

// if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
// return Promise.resolve(drinkIngredients);

// if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum')
// return Promise.resolve(drinksByIngredient);

const addCategories = (payload) => ({
  type: ADD_CATEGORIES,
  payload,
});

export const fetchCategories = (token, type = 'meals') => (
  async (dispatch) => {
    const urlOpt = { meals: `https://www.themealdb.com/api/json/v1/${token}/list.php?c=list`,
      drinks: `https://www.thecocktaildb.com/api/json/v1/${token}/list.php?c=list` };
    const data = await fetch(urlOpt[type]);
    const { [type]: categories } = await data.json();
    const CATEGORIES_NUMBER = 5;
    const categoriesArray = categories.slice(0, CATEGORIES_NUMBER)
      .map(({ strCategory }) => strCategory);
    dispatch(addCategories(categoriesArray));
  }
);

const addRecommendations = (payload) => ({
  type: ADD_RECOMMENDATIONS,
  payload,
});

export const fetchRecommendations = (token, type = 'meals') => (
  async (dispatch) => {
    const domains = { meals: 'themealdb', drinks: 'thecocktaildb' };
    const url = `https://www.${domains[type]}.com/api/json/v1/${token}/search.php?s=`;
    const data = await fetch(url);
    const { [type]: recipes } = await data.json();
    dispatch(addRecommendations(recipes));
  }
);

export const startRecipe = (selectedType, payload) => ({
  selectedType,
  type: START_RECIPE,
  payload,
});

export const endRecipe = (payload) => ({
  type: END_RECIPE,
  payload,
});

export const addFavorite = (payload) => ({
  type: ADD_FAVORITE,
  payload,
});

export const removeFavorite = (payload) => ({
  type: RM_FAVORITE,
  payload,
});

export const byAddIngredient = (payload) => ({
  type: ADD_BYINGREDIENT,
  payload,
});

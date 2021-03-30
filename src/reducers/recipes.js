import { ADD_CATEGORIES, ADD_FAVORITE, ADD_RECIPES,
  ADD_RECOMMENDATIONS, END_RECIPE, REQUEST_RECIPES, RM_FAVORITE,
  START_RECIPE, ADD_BYINGREDIENT } from '../actions';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

const INITIAL_STATE = {
  list: [],
  isFetching: true,
  categories: [],
  filter: '',
  recommendations: [],
  start: { Meal: inProgressRecipes.meals || {},
    Drink: inProgressRecipes.cocktails || {} },
  done: doneRecipes,
  favorite: favoriteRecipes,
  byIngredient: '',
};

const MAX_RECIPES = 12;
const MAX_RECOMMENDATIONS = 6;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case ADD_RECIPES: {
    let list;
    if (action.payload === null) list = [];
    if (action.payload !== null) list = action.payload.slice(0, MAX_RECIPES);
    return { ...state, isFetching: false, list };
  }
  case ADD_CATEGORIES:
    return { ...state, categories: action.payload };
  case ADD_RECOMMENDATIONS:
    return { ...state, recommendations: action.payload.slice(0, MAX_RECOMMENDATIONS) };
  case START_RECIPE:
    return { ...state,
      start: { ...state.start,
        [action.selectedType]:
          { ...state.start[action.selectedType], ...action.payload } } };
  case END_RECIPE:
    return { ...state, done: [...state.done, action.payload] };
  case ADD_FAVORITE:
    return { ...state, favorite: [...state.favorite, action.payload] };
  case RM_FAVORITE:
    return { ...state,
      favorite: [...state.favorite
        .filter(({ id, type }) => id !== action.payload.id
          || type !== action.payload.type)] };
  case ADD_BYINGREDIENT:
    return { ...state, byIngredient: action.payload };
  default:
    return state;
  }
};

export default recipes;

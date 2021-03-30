import { ADD_CATEGORIES, ADD_RECIPES, REQUEST_RECIPES } from '../actions';

const INITIAL_STATE = {
  list: [],
  isFetching: true,
  categories: [],
  filter: '',
};

const MAX_RECIPES = 12;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case ADD_RECIPES:
    return { ...state, isFetching: false, list: action.payload.slice(0, MAX_RECIPES) };
  case ADD_CATEGORIES:
    return { ...state, categories: action.payload };
  default:
    return state;
  }
};

export default recipes;

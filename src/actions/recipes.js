import { ADD_CATEGORIES, ADD_RECIPES, REQUEST_RECIPES } from './index';

const addRecipes = (payload) => ({
  type: ADD_RECIPES,
  payload,
});

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

export const fetchRecipes = (type = 'meals', { key = 's', parameter = '' } = {}) => (
  async (dispatch) => {
    let request = 'search';
    const token = 1;
    if (key === 'i') request = 'filter';
    // const filter = request === 'filter' ? parameter : '';
    // dispatch(addFilter(filter));
    dispatch(requestRecipes());
    const domains = { meals: 'themealdb', drinks: 'thecocktaildb' };
    const url = `https://www.${domains[type]}.com/api/json/v1/${token}/${request}.php?${key}=${parameter}`;
    console.log(type);
    console.log(url);
    const data = await fetch(url);
    const { [type]: recipes } = await data.json();
    dispatch(addRecipes(recipes));
  }
);

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

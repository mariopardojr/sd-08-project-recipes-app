import { fetchCocktailByFirstLetter,
  fetchCocktailByIngredients, fetchCocktailByName } from '../../services/CocktailAPI';
import { FETCH_API } from './index';

export const fetchDrinkAction = (recipes) => ({
  type: FETCH_API,
  payload: {
    recipes,
  },
});

const filterToTwelve = (list) => {
  const MAX_LENGTH_RECIPES = 12;

  const filteredList = (list.length <= MAX_LENGTH_RECIPES)
    ? list : list.filter((elem, i) => i < MAX_LENGTH_RECIPES && elem);

  return filteredList;
};

const alertIfNull = (list) => {
  let verify;
  if (!list) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    verify = [];
  } else { verify = list; }
  return verify;
};

const fetchDrinkThunk = (input, type) => async (dispatch) => {
  if (!type && !input) {
    const { drinks } = await fetchCocktailByName(input);
    const result = filterToTwelve(drinks);
    dispatch(fetchDrinkAction(result));
  }
  if (type === 'name') {
    const { drinks } = await fetchCocktailByName(input);
    const verifiedDrink = alertIfNull(drinks);
    const result = filterToTwelve(verifiedDrink);
    dispatch(fetchDrinkAction(result));
  }
  if (type === 'ingredient') {
    const { drinks } = await fetchCocktailByIngredients(input);
    const verifiedDrink = alertIfNull(drinks);
    const result = filterToTwelve(verifiedDrink);
    dispatch(fetchDrinkAction(result));
  }
  if (type === 'first-letter') {
    const { drinks } = await fetchCocktailByFirstLetter(input);
    const verifiedDrink = alertIfNull(drinks);
    const result = filterToTwelve(verifiedDrink);
    dispatch(fetchDrinkAction(result));
  }
};

export default fetchDrinkThunk;

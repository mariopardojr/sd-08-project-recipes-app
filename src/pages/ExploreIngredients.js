import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { byAddIngredient, fetchRecipes } from '../actions/recipes';

function ExploreIngredients({ location: { pathname } }) {
  const select = pathname.split('/')[2];
  const selectType = { comidas: 'meals', bebidas: 'drinks' };
  const type = selectType[select];
  const token = 1;

  const { list, isFetching } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes(token, type, { request: 'list', key: 'i', parameter: 'list' }));
  }, []);

  const handleClick = (ingredient) => {
    setShouldRedirect(true);
    dispatch(byAddIngredient(ingredient));
  };

  if (isFetching) return (<Loading />);
  return (
    <>
      <h1>Explorar</h1>
      { type === 'meals'
        ? list.map(({ idIngredient, strIngredient }, index) => {
          const url = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
          return (
            <button
              data-testid={ `${index}-ingredient-card` }
              key={ idIngredient }
              onClick={ () => handleClick(strIngredient) }
              type="button"
            >
              <img
                alt={ `ingredient ${idIngredient}` }
                data-testid={ `${index}-card-img` }
                src={ url }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
            </button>
          );
        })
        : list.map(({ strIngredient1 }, index) => {
          const url = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
          return (
            <button
              data-testid={ `${index}-ingredient-card` }
              key={ strIngredient1 }
              onClick={ () => handleClick(strIngredient1) }
              type="button"
            >
              <img
                alt={ `ingredient ${strIngredient1}` }
                data-testid={ `${index}-card-img` }
                src={ url }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
            </button>
          );
        }) }
      { shouldRedirect && <Redirect to={ `../../${select}` } /> }
    </>
  );
}

ExploreIngredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreIngredients;

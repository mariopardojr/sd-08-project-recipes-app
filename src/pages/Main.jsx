import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { byAddIngredient, fetchCategories, fetchRecipes } from '../actions/recipes';

function Main({ location: { pathname } }) {
  const history = useHistory();

  const {
    list, isFetching, categories, byIngredient,
  } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const selectType = { '/comidas': 'meals', '/bebidas': 'drinks' };
  const idType = { '/comidas': 'idMeal', '/bebidas': 'idDrink' };
  const type = selectType[pathname];
  const token = 1;

  const renderRecipes = () => {
    if (list.length === 0) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (list.length === 1) {
      const id = idType[pathname];
      history.push(`${pathname}/${list[0][id]}`);
      return;
    }
    return list.map((recipe, index) => (
      <RecipeCard
        type={ type === 'meals' ? 'Meal' : 'Drink' }
        index={ index }
        recipe={ recipe }
        key={ `recipe-${index}` }
      />));
  };

  useEffect(() => {
    dispatch(fetchCategories(token, type));

    if (byIngredient) {
      dispatch(fetchRecipes(type,
        { key: 'i', parameter: byIngredient }));
      dispatch(byAddIngredient(''));
    } else {
      dispatch(fetchRecipes(type));
    }
  }, [pathname]);

  return (
    <>
      <Header />
      { categories
        .map((category) => (
          <CategoryButton name={ category } key={ `btn-${category}` } type={ type } />))}
      <CategoryButton name="All" type={ type } />
      { isFetching ? <Loading /> : renderRecipes() }
      <Footer />
    </>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Main;

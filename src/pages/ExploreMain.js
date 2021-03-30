import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { fetchRecipes } from '../actions/recipes';

function ExploreMain({ location: { pathname } }) {
  const prevPath = pathname.split('/')[2]; console.log(prevPath);
  const selectType = {
    comidas: { 0: 'meals', 1: 'idMeal' },
    bebidas: { 0: 'drinks', 1: 'idDrink' },
  };
  const type = selectType[prevPath][0];
  const idType = selectType[prevPath][1];
  const token = 1;

  const { list } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  // const A = [1];
  // const B = [...A];

  // A.push(2);
  // console.log(A);
  // console.log(B);

  const [id, setId] = useState('');
  const prevList = useRef(list);

  const handleClick = () => {
    dispatch(fetchRecipes(token, type, { request: 'random', key: '' }));
  };

  useEffect(() => {
    if (list !== prevList.current) {
      console.log(list, prevList);
      setId(list[0][idType]);
    }
    return () => setId('');
  }, [list]);

  return (
    <>
      <h1>{ `Explorar ${prevPath}` }</h1>
      <Link data-testid="explore-by-ingredient" to={ `${pathname}/ingredientes` }>
        Por Ingredientes
      </Link>
      <br />
      { (prevPath === 'comidas') && (
        <Link data-testid="explore-by-area" to={ `${pathname}/area` }>
          Por Local de Origem
        </Link>) }
      <br />
      <button data-testid="explore-surprise" onClick={ handleClick } type="button">
        Me Surpreenda!
      </button>
      { id && <Redirect to={ `../${prevPath}/${id}` } /> }
      <Footer />
    </>
  );
}
ExploreMain.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreMain;

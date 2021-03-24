import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIsMeal } from '../../services/customHooks';
import { fetchDetails, fetchDrinks, fetchMeal } from '../../services/API';
import { saveActualRecipe, saveRecommendations } from '../../redux/actions/details';
import Loading from '../../components/Details/Loading';
import CoverImg from '../../components/Details/CoverImg';

import './details.css';
import Title from '../../components/Details/Title';

async function getRecipe(dispatch, id, isMeal) {
  let api = '';
  let recommendations = '';
  if (isMeal) {
    api = 'meal';
    recommendations = await fetchDrinks(null, 'firstFetch');
  } else {
    api = 'beverage';
    recommendations = await fetchMeal(null, 'firstFetch');
  }
  dispatch(saveRecommendations(recommendations));
  const actualRecipe = await fetchDetails(id, api);
  dispatch(saveActualRecipe(actualRecipe));
}

function Details() {
  const { actualRecipe } = useSelector((state) => state.detailsReducer);
  const isMeal = useIsMeal();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getRecipe(dispatch, id, isMeal);
  }, []);
  if (Object.keys(actualRecipe).length < 1) {
    return <Loading />;
  }
  return (
    <main className="recipe-details">
      <CoverImg />
      <Title />
    </main>
  );
}

export default Details;

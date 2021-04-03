import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { foodsOnMount } from '../../redux/actions';
import CardsArea from '../../components/CardsArea';
import ContainerDefault from '../../components/ContainerDefault';
import Loading from '../../components/Loading';
import FilterButtonsSection from '../../components/FilterButtonsSection';

function Foods() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodsOnMount());
  }, [dispatch]);

  const { isFetching, onClickFilter, meals } = useSelector((state) => state.foods);
  const oneMeal = meals ? meals.length : false;
  return (
    <ContainerDefault title="Comidas">
      {
        isFetching && meals.length === 0 ? <Loading />
          : (
            <>
              <FilterButtonsSection />
              <CardsArea type="foods" />
            </>
          )
      }
      { oneMeal === 1 && !onClickFilter
      && <Redirect to={ `/comidas/${meals[0].idMeal}` } /> }
    </ContainerDefault>
  );
}

export default Foods;

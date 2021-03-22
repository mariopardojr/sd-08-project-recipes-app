import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './Foods.css';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { FoodCtx } from '../../context/ContextFood';

function Foods() {
  const STOP_INDEX = 11;
  const { foodApi: { meals } } = useContext(FoodCtx);
  return (
    <div>
      <Header name="Comidas" icon="true" currentPage="Foods" />
      <div className="cards">
        {meals && meals
          .filter((meal, index) => index <= STOP_INDEX)
          .map((item, index) => (
            <Card
              key={ item.idMeal }
              id={ item.idMeal }
              name={ item.strMeal }
              img={ item.strMealThumb }
              index={ index }
            />
          ))}
        { meals && meals.length === 1
          ? <Redirect to={ `/comidas/${meals[0].idMeal}` } /> : '' }

        {/* {meals && meals.length === 0
          ? alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : '' } */}
      </div>
    </div>
  );
}

export default Foods;
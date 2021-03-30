import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { startRecipe } from '../actions/recipes';

function IngredientsList({ type, id, ingredients }) {
  const start = useSelector((state) => state.recipes.start);
  const { pathname } = useLocation();
  const inProgress = pathname.split('/')[3] === 'in-progress';
  const dispatch = useDispatch();
  const [usedIngredients, setUsedIngredients] = useState(start[type][id] || []);

  const handleChange = (index) => {
    if (usedIngredients.includes(index)) {
      setUsedIngredients([...usedIngredients].filter((ing) => ing !== index));
    } else {
      setUsedIngredients([...usedIngredients, index]);
    }
  };

  useEffect(() => {
    const { Drink: cocktails, Meal: meals } = start;
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
  }, [start]);

  useEffect(() => {
    if (inProgress) {
      dispatch(startRecipe(type, { [id]: usedIngredients }));
    }
  }, [usedIngredients]);

  if (inProgress) {
    return (
      <div>
        { ingredients
          .map((ingsAndMsr, index) => (
            <label
              htmlFor={ [ingsAndMsr[0]] }
              key={ `ing-${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ [ingsAndMsr[0]] }
                onClick={ () => handleChange(index) }
                checked={ usedIngredients.includes(index) }
                value={ [ingsAndMsr[0]] }
              />
              { `${[ingsAndMsr[0]]} - ${[ingsAndMsr[1]]}` }
            </label>))}
      </div>
    );
  }

  return (
    <ul>
      { ingredients
        .map((ingsAndMsr, index) => (
          <li
            key={ `ing-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${[ingsAndMsr[0]]} - ${[ingsAndMsr[1]]}` }
          </li>))}
    </ul>
  );
}

IngredientsList.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default IngredientsList;

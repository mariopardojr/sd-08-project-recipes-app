import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../../components/DrinkDetails';
import Recomendations from '../../components/Recomendations';

function CocktailRecipeDetails({ match }) {
  const [drink, setDrink] = useState({});
  const { id } = match.params;

  useEffect(() => {
    async function getDrinkById(value) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`);
      const response = await data.json();
      console.log(response.drinks[0]);
      setDrink(response.drinks[0]);
    }
    getDrinkById(id);
  }, [id]);

  return (
    <div>
      <DrinkDetails drink={ drink } />
      <Recomendations recipeType="drink" />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

CocktailRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default CocktailRecipeDetails;

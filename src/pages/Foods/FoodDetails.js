import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Recommendations from '../../component/Recommendations';

export default function FoodDetails({ match: { params: { id } } }) {
  const { recipeDetail,
    setSearchParams } = useContext(Context);
  const history = useHistory();
  const [recipe, setRecipe] = useState();

  const recipesInProgressLS = JSON.parse(localStorage.getItem('RecipesInProgress')) || [];

  const recipeInProgress = recipesInProgressLS
    .find((idRecipe) => idRecipe === id);

  useEffect(() => setSearchParams({
    searchInput: id,
    selectedParameter: 'recipe',
    location: history.location.pathname,
  }), [setSearchParams, history.location.pathname, id]);

  useEffect(() => setRecipe(...recipeDetail), [recipeDetail, setRecipe]);

  if (!recipe) return <div>Carregando...</div>;

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

  const ingredients = Object.keys(recipe)
    .filter((prop) => prop.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient])
    .filter((ingredient) => ingredient);

  const measures = Object.keys(recipe)
    .filter((prop) => prop.includes('strMeasure'))
    .map((measure) => recipe[measure])
    .filter((measure) => measure);

  return (
    <>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe Done" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorites</button>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      {ingredients.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`-${ingredient} - ${measures[index]}`}
        </p>
      ))}
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        title="Recipe"
        src={ strYoutube.replace('watch?v=', 'embed/') }
      />

      <Link
        to={ `/comidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => {
          if (!recipeInProgress) {
            localStorage.setItem('RecipesInProgress',
              JSON.stringify([...recipesInProgressLS, id]));
          }
        } }
      >
        {recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}

      </Link>
      <Recommendations />
    </>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
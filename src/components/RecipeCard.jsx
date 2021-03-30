import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ type, index, recipe, recommendation }) {
  const pathname = type === 'Meal' ? 'comidas' : 'bebidas';
  return (
    <Link
      to={ `/${pathname}/${recipe[`id${type}`]}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
      />
      { recommendation
          && <p>{ type === 'Meal' ? recipe.strCategory : recipe.strAlcoholic }</p> }
      <p
        data-testid={
          recommendation ? `${index}-recomendation-title` : `${index}-card-name`
        }
      >
        { recipe[`str${type}`] }
      </p>
    </Link>
  );
}

RecipeCard.defaultProps = {
  recommendation: false,
};

RecipeCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
  recommendation: PropTypes.bool,
};

export default RecipeCard;

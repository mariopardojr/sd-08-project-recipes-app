import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardCarousel extends Component {
  render() {
    const [idMeal, strMealThumb, strMeal] = this.props;
    return (
      <>
        <div className="carousel">
          <Link
            to={ `/comidas/${idMeal}` }
            className="carousel-content"
            data-testid={ `${0}-recomendation-card` }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              className="carousel-item-image"
            />
          </Link>
        </div>
        <div className="start-btn">
          <Link
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            exact
            to={ `/comidas/${idMeal}/in-progress` }

          >
            Iniciar receita
          </Link>
        </div>
      </>
    );
  }
}

CardCarousel.propTypes = {
  idMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardCarousel;

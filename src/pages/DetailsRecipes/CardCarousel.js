import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.css';

const TWO = 2;
class CardCarousel extends Component {
  render() {
    const { id, strThumb, str, index, origin } = this.props;
    return (
      <Link
        className={ index >= TWO ? 'hidden' : 'teste' }
        data-testid={ `${index}-recomendation-card` }
        to={ origin === 'drinks' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <img
          src={ strThumb }
          alt={ str }
          className="carousel-item-image"
          data-testid={ `${index}-recomendation-img` }
        />
        <h2 data-testid={ `${index}-recomendation-title` }>
          { str }
        </h2>
      </Link>
    );
  }
}

CardCarousel.propTypes = {
  id: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,

};

export default CardCarousel;

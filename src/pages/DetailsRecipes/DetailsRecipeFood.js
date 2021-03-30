import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import favIconEnabled from '../../images/blackHeartIcon.svg';
// import favIconDisabled from '../../images/whiteHeartIcon.svg';
import filterFood from '../../utils/filterDetailsRecipes';
import { fetchFoodDetails, fetchFoodsByRandom } from '../../services';

const INITIAL_STATE_RECIPE_FOOD = {
  idMeal: '',
  ingredients: [],
  measures: [],
  strArea: '',
  strCategory: '',
  strInstructions: '',
  strMeal: '',
  strMealThumb: '',
  strTags: '',
  strYoutube: '',
  recommendationMeal: [],
};

class RecipeFood extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE_RECIPE_FOOD;

    this.handleRequestFood = this.handleRequestFood.bind(this);
  }

  componentDidMount() {
    this.handleRequestFood();
  }

  handleRequestFood() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    fetchFoodDetails(id).then((response) => {
      const meal = filterFood(response, 'meals');
      this.setState((state) => ({
        ...state,
        ...meal,
      }));
    });
    fetchFoodsByRandom().then((response) => {
      const data = response.meals;
      const recommendationMeal = data;
      // .map((a) => ({ sort: Math.random(), value: a }))
      // .sort((a, b) => a.sort - b.sort)
      // .map((a) => a.value);
      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      this.setState((state) => ({
        ...state,
        recommendationMeal,
      }));
    });
  }

  render() {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
      ingredients,
      measures,
      recommendationMeal,
    } = this.state;
    console.log(recommendationMeal);

    if (recommendationMeal.length > 0) {
      return (
        <div className="recipe-details">
          <img
            style={ { width: '50%' } }
            src={ strMealThumb }
            alt="Meal Thumbnail"
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div className="recipe-header box-content">
            <h1 data-testid="recipe-title" className="recipe-title">
              {strMeal}
            </h1>
            <div className="actions">
              <button
                type="button"
                data-testid="share-btn"
                className="action-button"
              >
                <img src={ shareIcon } alt="share" />
              </button>
              <p id="link" style={ { display: 'none' } }>
                Link copiado!
              </p>
              <button type="button" className="action-button">
                <img
                  src={ favIconEnabled }
                  alt="favorite"
                  data-testid="favorite-btn"
                  className="favorite-icon"
                />
              </button>
            </div>
          </div>
          <span data-testid="recipe-category" className="recipe-category">
            {strCategory}
          </span>
          <div className="box-content">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measures[index]}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="box-content">
            <h2>Instructions</h2>
            <p data-testid="instructions">{strInstructions}</p>
          </div>
          <div className="video-content">
            <h2 className="box-content">Video</h2>
            <iframe
              data-testid="video"
              title={ strMeal }
              width="360"
              height="202.5"
              src={ `https://www.youtube.com/embed/${strYoutube.split('/')[3]}` }
              frameBorder="0"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;
              gyroscope;picture-in-picture"
              allowFullScreen
            />
          </div>
          <h2 className="box-content">Recomendadas</h2>
          <div className="carousel">
            <Link
              to={ `/comidas/${recommendationMeal[0].idMeal}` }
              className="carousel-content"
              data-testid={ `${0}-recomendation-card` }
            >
              <img
                src={ recommendationMeal[0].strMealThumb }
                alt={ recommendationMeal[0].strMeal }
                className="carousel-item-image"
              />
            </Link>
          </div>
          <div className="start-btn">
            <Link
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              exact
              to={ `/comidas/${recommendationMeal[0].idMeal}/in-progress` }

            >
              Iniciar receita
            </Link>
          </div>
        </div>
      );
    }
    return false;
  }
}

RecipeFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeFood;

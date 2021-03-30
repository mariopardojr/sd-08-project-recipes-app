import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer, Cards } from '../components';
import { fetchFoodsRandom, fetchFoodCategory } from '../store/actions';
import '../styles/pages/Container.css';

const MAX_NUMBER_CARDS = 11;

class Foods extends Component {
  componentDidMount() {
    const { getFood, getFoodCategory } = this.props;
    getFood();
    getFoodCategory();
  }

  render() {
    const { meals, renderOnlyCardByFilter } = this.props;
    console.log(meals);
    if (meals && meals.length === 1 && renderOnlyCardByFilter) {
      return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
    }
    return (
      <div>
        <Header title="Comidas" />
        <div className="container">

          { meals && meals.reduce((acc, cur, index) => {
            if (index <= MAX_NUMBER_CARDS) {
              acc = [...acc, cur];
            }
            return acc;
          }, [])
            .map((food, index) => (
              <Cards
                route={ `/comidas/${food.idMeal}` }
                key={ index }
                strThumb={ food.strMealThumb }
                str={ food.strMeal }
                index={ index }
                id={ food.idMeal }
                title="Comidas"
              />
            ))}
        </div>
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.objectOf),
  getFood: PropTypes.func.isRequired,
  getFoodCategory: PropTypes.func.isRequired,
  renderOnlyCardByFilter: PropTypes.bool.isRequired,
};

Foods.defaultProps = {
  meals: [],
};

const mapStateToProps = (state) => ({
  meals: state.foodsReducer.data.meals,
  renderOnlyCardByFilter: state.headerReducer.showButtonSearch,
});

const mapDispatchToProps = (dispatch) => ({
  getFood: (value) => dispatch(fetchFoodsRandom(value)),
  getFoodCategory: () => dispatch(fetchFoodCategory()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
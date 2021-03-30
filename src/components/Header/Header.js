import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import { toggleButtonSearch, fetchFood, fetchDrink } from '../../store/actions';
import SearchBar from './SearchBar';
import CardsButtonsCategories from './CardsButtonsCategories';

import '../../styles/components/Header/index.css';

const MAX_LENGTH_NAMES_CATEGORIES = 5;
const ARGUMENT_REQUEST_ALL = { search: '', searchRadio: 'name' };
class Header extends Component {
  renderButtons(buttons, getRecipes) {
    const { title, getFood, getDrink } = this.props;
    return (
      <>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => (title === 'Comidas'
            ? getFood(ARGUMENT_REQUEST_ALL)
            : getDrink(ARGUMENT_REQUEST_ALL)
          ) }
        >
          All
        </button>
        {buttons.map((button, index) => {
          if (index < MAX_LENGTH_NAMES_CATEGORIES) {
            return (
              <CardsButtonsCategories
                key={ index }
                strCategory={ button.strCategory }
                title={ title }
                getRecipes={ getRecipes }
                buttons={ buttons }
              />
            );
          }
          return false;
        })}
      </>
    );
  }

  render() {
    const {
      title,
      showButtonSearch,
      setToggle,
      foodButtons,
      drinkButtons,
      getDrink,
      getFood,
    } = this.props;
    let buttons = [];
    let getRecipes = () => {};
    if (title === 'Comidas') {
      buttons = [...foodButtons];
      getRecipes = getFood;
    } else {
      buttons = [...drinkButtons];
      getRecipes = getDrink;
    }
    return (
      <header className="headerContainer">
        <div>
          <div>
            <Link to="/perfil">
              <img
                className="headerButton"
                data-testid="profile-top-btn"
                src={ ProfileIcon }
                alt="perfil"
              />
            </Link>
          </div>
          <div>
            <h1 data-testid="page-title">
              { title }
            </h1>
          </div>
          {(
            title === 'Comidas'
            || title === 'Bebidas'
            || title.includes('Origem')
          ) && (
            <div>
              <button
                className="headerButton"
                type="button"
                onClick={ () => setToggle() }
              >
                <img
                  data-testid="search-top-btn"
                  src={ SearchIcon }
                  alt="search"
                />
              </button>
            </div>
          )}
        </div>
        {showButtonSearch && (title === 'Comidas' || title === 'Bebidas')
         && <SearchBar title={ title } />}
        {!showButtonSearch && (title === 'Comidas' || title === 'Bebidas')
         && this.renderButtons(buttons, getRecipes)}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  setToggle: PropTypes.func.isRequired,
  showButtonSearch: PropTypes.bool.isRequired,
  foodButtons: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  drinkButtons: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getFood: PropTypes.func.isRequired,
  getDrink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showButtonSearch: state.headerReducer.showButtonSearch,
  foodButtons: state.headerReducer.foodsButtonsFilter,
  drinkButtons: state.headerReducer.drinksButtonsFilter,

});

const mapDispatchToProps = (dispatch) => ({
  setToggle: () => dispatch(toggleButtonSearch()),
  getFood: (value) => dispatch(fetchFood(value)),
  getDrink: (value) => dispatch(fetchDrink(value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

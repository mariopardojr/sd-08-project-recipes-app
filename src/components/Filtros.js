import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchIngredient as fetchIngredientAction } from '../action';

class Filtro extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };

    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  async fetchList() {
    const { pathname } = this.props;
    if (pathname === '/comidas') {
      const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const results = await req.json();
      this.setState({ results });
    }
    if (pathname === '/bebidas') {
      const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results = await req.json();
      this.setState({ results });
    }
  }

  filterAll(pathname, searchIngredient) {
    const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (pathname === '/comidas') {
      return searchIngredient(mealUrl);
    }
    if (pathname === '/bebidas') {
      return searchIngredient(drinkUrl);
    }
  }

  submitSearch(category) {
    const { pathname, searchIngredient } = this.props;
    const mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (pathname === '/comidas') {
      return searchIngredient(mealUrl);
    }
    if (pathname === '/bebidas') {
      return searchIngredient(drinkUrl);
    }
  }

  render() {
    const { results } = this.state;
    const { pathname, searchIngredient } = this.props;
    const result = results.meals || results.drinks;
    const TOTAL_ITEMS = 4;
    return (
      <nav>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => this.filterAll(pathname, searchIngredient) }
        >
          All
        </button>
        {results.length !== 0 && result.map((category, index) => {
          if (index > TOTAL_ITEMS) {
            return;
          }
          return (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              type="button"
              onClick={ () => this.submitSearch(category.strCategory) }
            >
              {category.strCategory}
            </button>
          );
        })}
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchIngredient: (url) => dispatch(fetchIngredientAction(url)),
});

export default connect(null, mapDispatchToProps)(Filtro);
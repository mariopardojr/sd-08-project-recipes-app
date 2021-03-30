import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipes } from '../actions/recipes';

const SearchBar = () => {
  const [filter, setFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const selectType = { '/comidas': 'meals', '/bebidas': 'drinks' };
  const type = selectType[pathname];

  const filterRecipes = (e) => {
    e.preventDefault();
    if (filter === 'f' && searchText.length > 1 && searchText !== '') {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    if (filter === 'i') {
      dispatch(fetchRecipes(type,
        { request: 'filter', key: filter, parameter: searchText }));
      return;
    }
    dispatch(fetchRecipes(type, { key: filter, parameter: searchText }));
    setSearchText('');
  };

  return (
    <div className="search-bar">
      <form>
        <div className="search-bar-input">
          <input
            type="text"
            data-testid="search-input"
            value={ searchText }
            onChange={ (e) => setSearchText(e.target.value) }
          />
        </div>
        <div>
          <label htmlFor="ingredient">
            <input
              type="radio"
              value="i"
              data-testid="ingredient-search-radio"
              name="filter"
              id="ingredient"
              onClick={ (e) => setFilter(e.target.value) }
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              value="s"
              data-testid="name-search-radio"
              name="filter"
              id="name"
              onClick={ (e) => setFilter(e.target.value) }
            />
            Nome
          </label>
          <label htmlFor="first-l">
            <input
              type="radio"
              value="f"
              data-testid="first-letter-search-radio"
              name="filter"
              id="first-l"
              onClick={ (e) => setFilter(e.target.value) }
            />
            Primeira letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ (e) => { filterRecipes(e); } }
        >
          buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

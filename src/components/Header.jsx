import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import ProfileIcon from '../common/ProfileIcon';
import SearchBar from './SearchBar';
import searchSvg from '../images/searchIcon.svg';

const Header = () => {
  const { pathname } = useLocation();

  const renderHeader = useRef(() => {});

  const [headerTitle, setHeaderTitle] = useState('Explorar');
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  renderHeader.current = () => {
    switch (pathname) {
    case '/bebidas':
      setHeaderTitle('Bebidas');
      setSearchIcon(true);
      return;
    case '/comidas':
      setHeaderTitle('Comidas');
      setSearchIcon(true);
      return;
    case '/explorar':
      setHeaderTitle('Explorar');
      return;
    case '/explorar/comidas':
      setHeaderTitle('Explorar Comidas');
      return;
    case '/explorar/bebidas':
      setHeaderTitle('Explorar Bebidas');
      return;
    case '/explorar/comidas/ingredientes':
      setHeaderTitle('Explorar Ingredientes');
      return;
    case '/explorar/bebidas/ingredientes':
      setHeaderTitle('Explorar Ingredientes');
      setSearchIcon(false);
      return;
    case '/perfil':
      setHeaderTitle('Perfil');
      return;
    case '/receitas-feitas':
      setHeaderTitle('Receitas Feitas');
      return;
    case '/receitas-favoritas':
      setHeaderTitle('Receitas Favoritas');
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    renderHeader.current();
  }, []);

  return (
    <div className="header-container">
      <div className="header">
        <ProfileIcon />
        <h1 data-testid="page-title">
          { headerTitle }
        </h1>
        { searchIcon
          && <img
            role="presentation"
            data-testid="search-top-btn"
            src={ searchSvg }
            alt="search-btn"
            onClick={ () => setSearchBar(!searchBar) }
          /> }
      </div>
      { searchBar && <SearchBar /> }
    </div>
  );
};

export default Header;

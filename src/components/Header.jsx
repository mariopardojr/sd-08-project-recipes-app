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

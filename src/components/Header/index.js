import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Header.css';
import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import explorar from '../../images/exploreIcon.svg';
import Search from '../Search';
import { FoodCtx } from '../../context/ContextFood';

function Header(props) {
  const [isSearch, setIsSearch] = useState(false);
  const { name, icon, currentPage } = props;
  const { setCurrentPage } = useContext(FoodCtx);

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  useEffect(() => {
    setCurrentPage(currentPage);
  });

  return (
    <>
      <header className="header-container">
        <Link to="/perfil">
          <img src={ profile } alt="Profile" data-testid="profile-top-btn" />
        </Link>

        <h2 data-testid="page-title">
          {name}
        </h2>
        {
          (icon === 'false') ? explorar : (
            <button type="button" onClick={ handleSearch }>
              <img
                src={ search }
                alt="Profile"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </header>
      {isSearch && <Search />}
    </>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Header;
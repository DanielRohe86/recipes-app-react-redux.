import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchIcon = true, hasProfileIcon = true }) {
  const [searchInput, setSearchInput] = useState(false);
  return (
    <header>
      {((hasProfileIcon) && (
        <Link to="/profile">
          <img src={ profileIcon } alt="Icone de perfil" data-testid="profile-top-btn" />
        </Link>
      ))}
      {((hasSearchIcon) && (
        <button
          type="button"
          onClick={ () => setSearchInput((prevState) => !prevState) }
        >
          <img src={ searchIcon } alt="Icone de pesquisa" data-testid="search-top-btn" />
        </button>
      ))}
      {
        (searchInput)
        && (<input type="text" placeholder="Search" data-testid="search-input" />)
      }
      {((title) && (
        <h1 data-testid="page-title">{title}</h1>
      ))}
    </header>
  );
}

Header.propTypes = {
  hasProfileIcon: PropTypes.bool,
  hasSearchIcon: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;

export default Header;

import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext';

export default function SearchBar() {
  const { fetchSearchAPI } = useContext(MyContext);
  const [nameFilter, setNameFilter] = useState('');
  const [radioFilter, setRadioFilter] = useState('name');

  const handleRadioChange = ({ target: { value } }) => {
    setRadioFilter(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        value={ nameFilter }
        onChange={ (event) => setNameFilter(event.target.value) }
      />

      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="radioFilter"
          id="ingredient"
          value="ingredient"
          onClick={ (event) => handleRadioChange(event) }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="radioFilter"
          id="name"
          value="name"
          onClick={ (event) => handleRadioChange(event) }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          type="radio"
          name="radioFilter"
          value="firstLetter"
          id="firstLetter"
          onClick={ (event) => handleRadioChange(event) }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchSearchAPI(nameFilter, radioFilter) }
      >
        Search
      </button>
    </div>
  );
}

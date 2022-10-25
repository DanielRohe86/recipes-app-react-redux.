import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search" data-testid="search-input" />
      <label htmlFor="ingredient">
        ingredient
        <input
          type="radio"
          name="ingredient"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        name
        <input
          type="radio"
          name="name"
          id="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        firstLetter
        <input
          type="radio"
          name="firstLetter"
          id="firstLetter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const fetchSearchAPI = async (nameFilter, radioFilter, apiType = 'meal') => {
    let URL = '';
    if (radioFilter === 'ingredient') {
      URL = `https://www.the${apiType}db.com/api/json/v1/1/filter.php?i=${nameFilter}`;
    }
    if (radioFilter === 'name') {
      URL = `https://www.the${apiType}db.com/api/json/v1/1/search.php?s=${nameFilter}`;
    }
    if (radioFilter === 'firstLetter') {
      if (nameFilter.length > 1 || nameFilter === 0) {
        global.alert('Your search must have only 1 (one) character');
      }
      URL = `https://www.the${apiType}db.com/api/json/v1/1/search.php?f=${nameFilter}`;
    }
    try {
      const response = await fetch(URL);
      const apiData = await response.json();
      if (apiType === 'meal') {
        if (apiData.meals === null) {
          throw new Error('Sorry, we haven\'t found any recipes for these filters.');
        }
        setData(apiData.meals);
      }
      if (apiType === 'cocktail') {
        if (apiData.drinks === null) {
          throw new Error('Sorry, we haven\'t found any recipes for these filters.');
        }
        setData(apiData.drinks);
      }
    } catch (error) {
      global.alert(error.message);
    }
  };

  const contextValue = useMemo(() => ({
    fetchSearchAPI,
    setData,
    data,
  }), [data]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;

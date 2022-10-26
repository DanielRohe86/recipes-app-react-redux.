import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apiType, setApiType] = useState('meal');

  const fetchSearchAPI = async (nameFilter = '', radioFilter = 'name') => {
    let URL = '';
    const apiName = (apiType === 'meal') ? 'meal' : 'cocktail';
    if (radioFilter === 'ingredient') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/filter.php?i=${nameFilter}`;
    }
    if (radioFilter === 'name') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=${nameFilter}`;
    }
    if (radioFilter === 'firstLetter') {
      if (nameFilter.length > 1 || nameFilter === 0) {
        global.alert('Your search must have only 1 (one) character');
      }
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?f=${nameFilter}`;
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
      if (apiType === 'drink') {
        if (apiData.drinks === null) {
          throw new Error('Sorry, we haven\'t found any recipes for these filters.');
        }
        setData(apiData.drinks);
      }
    } catch (error) {
      global.alert(error.message);
    }
  };

  const fetchCategories = async () => {
    const apiName = (apiType === 'meal') ? 'meal' : 'cocktail';
    const URL = `https://www.the${apiName}db.com/api/json/v1/1/list.php?c=list`;
    try {
      const response = await fetch(URL);
      const apiCategoriesData = await response.json();
      if (apiType === 'meal') {
        setCategories(apiCategoriesData.meals);
      }
      if (apiType === 'drink') {
        setCategories(apiCategoriesData.drinks);
      }
    } catch (error) {
      global.alert(error.message);
    }
  };

  useEffect(() => {
    fetchSearchAPI();
    fetchCategories();
  }, [apiType]);

  const contextValue = useMemo(() => ({
    fetchSearchAPI,
    fetchCategories,
    setData,
    data,
    categories,
    setApiType,
    apiType,
  }), [data, categories]);

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

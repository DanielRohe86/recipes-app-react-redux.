import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [apiType, setApiType] = useState('meal');
  const [nameFilter, setNameFilter] = useState('');
  const [filterType, setFilterType] = useState('name');

  const fetchSearchAPI = async () => {
    const internApiType = apiType;
    let URL = '';
    const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
    if (filterType === 'ingredient') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/filter.php?i=${nameFilter}`;
    }
    if (filterType === 'name') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=${nameFilter}`;
    }
    if (filterType === 'firstLetter') {
      if (nameFilter.length > 1 || nameFilter === 0) {
        global.alert('Your search must have only 1 (one) character');
      }
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?f=${nameFilter}`;
    }
    try {
      const response = await fetch(URL);
      const apiData = await response.json();
      if (internApiType === 'meal') {
        if (apiData.meals === null) {
          throw new Error();
        }
        setBackupData(apiData.meals);
        setData(apiData.meals);
      }
      if (internApiType === 'drink') {
        if (apiData.drinks === null) {
          throw new Error();
        }
        setBackupData(apiData.drinks);
        setData(apiData.drinks);
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const fetchCategories = async () => {
    const internApiType = apiType;
    const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
    const URL = `https://www.the${apiName}db.com/api/json/v1/1/list.php?c=list`;
    try {
      const response = await fetch(URL);
      const apiCategoriesData = await response.json();
      if (internApiType === 'meal') {
        setCategories(apiCategoriesData.meals);
      }
      if (internApiType === 'drink') {
        setCategories(apiCategoriesData.drinks);
      }
    } catch (error) {
      global.alert('Error to fetch categories');
    }
  };

  const searchByCategory = async (name) => {
    const internApiType = apiType;
    try {
      const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
      const URL = `https://www.the${apiName}db.com/api/json/v1/1/filter.php?c=${name}`;
      const response = await fetch(URL);
      const apiData = await response.json();
      if (internApiType === 'meal') {
        if (apiData.meals === null) {
          throw new Error();
        }
        setCategoriesData(apiData.meals);
      }
      if (internApiType === 'drink') {
        if (apiData.drinks === null) {
          throw new Error();
        }
        setCategoriesData(apiData.drinks);
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const fetchAPIByID = async (id, apiNewType) => {
    try {
      const apiName = (apiNewType === 'meal') ? 'meal' : 'cocktail';
      const URL = `https://www.the${apiName}db.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const apiData = await response.json();
      if (apiNewType === 'meal') {
        console.log(apiData.meals);
        setSingleData(apiData.meals);
      }
      if (apiNewType === 'drink') {
        console.log(apiData.drinks);
        setSingleData(apiData.drinks);
      }
    } catch (error) {
      global.alert('erro');
    }
  };

  const all = () => {
    setNameFilter('');
    setFilterType('name');
    fetchSearchAPI();
    setCategoriesData([]);
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
    setNameFilter,
    nameFilter,
    backupData,
    setFilterType,
    all,
    searchByCategory,
    fetchAPIByID,
    singleData,
    categoriesData,
  }), [data, categories,
    apiType, nameFilter, backupData, singleData, categoriesData]);

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

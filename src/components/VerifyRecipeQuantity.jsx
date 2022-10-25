import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function VerifyRecipeQuantity({ type }) {
  const { data } = useContext(MyContext);
  if (data?.length === 0) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  if (data?.length === 1) {
    if (type === 'meals') {
      return <Redirect to={ `${type}/${data[0].idMeal}` } />;
    }
    if (type === 'drinks') {
      return <Redirect to={ `${type}/${data[0].idDrink}` } />;
    }
  }
}

VerifyRecipeQuantity.propTypes = {
  type: PropTypes.string,
}.isRequired;

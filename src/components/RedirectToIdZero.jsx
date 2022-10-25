import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function useRedirect({ type }) {
  const { data } = useContext(MyContext);
  if (data?.length === 1) {
    if (type === 'meals') {
      return <Redirect to={ `${type}/${data[0].idMeal}` } />;
    }
    if (type === 'drinks') {
      return <Redirect to={ `${type}/${data[0].idDrink}` } />;
    }
  }
}

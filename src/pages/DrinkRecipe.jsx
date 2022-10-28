import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeDetails from '../components/RecipeDetails';

export default function DrinkRecipe() {
  const { fetchAPIByID, fetchRecomendation } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    fetchAPIByID(id, 'drink');
    fetchRecomendation(id, 'meal');
  }, []);

  return (
    <div>
      <RecipeDetails apiType="Drink" />
      <Footer />
    </div>
  );
}

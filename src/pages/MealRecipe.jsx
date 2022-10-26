import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

export default function MealRecipe() {
  const { fetchAPIByID, apiType, singleData } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    fetchAPIByID(id);
  }, []);
  const apiTypeUpper = apiType[0].toUpperCase() + apiType.substring(1);
  return (
    <div>
      {
        singleData?.map((recipe, index) => (
          <div
            data-testid={ `${index}-card-button` }
            key={ recipe[`id${apiTypeUpper}`] }
          >
            <h3 data-testid={ `${index}-card-name` }>{recipe[`str${apiTypeUpper}`]}</h3>
            <p data-testid={ `${index}-recipe-card` }>{ recipe.strInstructions }</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe[`str${apiTypeUpper}Thumb`] }
              alt={ recipe[`id${apiTypeUpper}`] }
            />
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

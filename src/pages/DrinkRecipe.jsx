import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

export default function DrinkRecipe() {
  const { fetchAPIByID, singleData } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    fetchAPIByID(id, 'drink');
  }, []);

  return (
    <div>
      {
        singleData[0] && (
          <div
            data-testid="0-card-button"
            key={ singleData[0].idDrink }
          >
            <h3 data-testid="0-card-name">{singleData[0].strDrink}</h3>
            <p data-testid="0-singleData[0]-card">{ singleData[0].strInstructions }</p>
            <img
              data-testid="0-card-img"
              src={ singleData[0].strDrinkThumb }
              alt={ singleData[0].idDrink }
            />
          </div>
        )
      }
      <Footer />
    </div>
  );
}

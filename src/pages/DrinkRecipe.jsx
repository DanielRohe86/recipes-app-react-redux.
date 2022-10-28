import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

export default function DrinkRecipe() {
  const { fetchAPIByID,
    singleData, fetchRecomendation, recomendation } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    console.log(history);
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    fetchAPIByID(id, 'drink');
    fetchRecomendation(id, 'meal');
  }, []);

  let arrMeasure = [];
  let arrIngredient = [];
  if (singleData?.[0]) {
    const singleDataKeys = Object.entries(singleData[0]);
    const entriesIngredient = singleDataKeys
      .filter((el) => el[0].includes('strIngredient') && el[1]);
    arrIngredient = entriesIngredient.map((el) => el[1]);
    const entriesMeasure = singleDataKeys
      .filter((el) => el?.[0].includes('strMeasure') && el[1]);
    arrMeasure = entriesMeasure.map((el) => el[1]);
  }
  return (
    <div>
      {singleData?.[0] && (
        <div>
          <h3 data-testid="recipe-title">{singleData?.[0].strDrink}</h3>
          <h3 data-testid="recipe-category">{singleData?.[0].strAlcoholic}</h3>
          <img
            data-testid="recipe-photo"
            src={ singleData?.[0].strDrinkThumb }
            alt={ singleData?.[0].idDrink }
          />
          { arrIngredient.map((el, index) => (
            <p key={ el } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${el} ${arrMeasure[index] ? arrMeasure[index] : ''}`}
            </p>
          ))}
          <p data-testid="instructions">{ singleData?.[0].strInstructions }</p>
        </div>
      )}
      <div className="carousel">
        {
          recomendation.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="item"
              key={ item.strMeal }
            >
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <h3 data-testid={ `${index}-recommendation-title` }>{ item.strMeal }</h3>
            </div>
          ))
        }
      </div>
      <button
        type="button"
        className="start-btn"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
      <Footer />
    </div>
  );
}

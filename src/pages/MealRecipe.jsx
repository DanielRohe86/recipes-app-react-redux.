import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

export default function MealRecipe() {
  const { fetchAPIByID, singleData,
    fetchRecomendation, recomendation } = useContext(MyContext);

  useEffect(() => {
    console.log('atualizou', singleData);
  }, [singleData]);

  const history = useHistory();

  useEffect(() => {
    console.log(history);
    const { location: { pathname } } = history;

    const id = pathname.split('/')[2];
    fetchAPIByID(id, 'meal');
    fetchRecomendation(id, 'drink');
  }, []);

  let arrMeasure = [];
  let arrIngredient = [];
  let ytLink = '';
  if (singleData?.[0]) {
    const singleDataKeys = Object.entries(singleData[0]);
    const entriesIngredient = singleDataKeys
      .filter((el) => el[0].includes('strIngredient') && el[1]);
    arrIngredient = entriesIngredient.map((el) => el[1]);
    const entriesMeasure = singleDataKeys
      .filter((el) => el?.[0].includes('strMeasure') && el[1]);
    arrMeasure = entriesMeasure.map((el) => el[1]);
    const arrYtLink = singleData[0]?.strYoutube.split('/');
    ytLink = `${arrYtLink[0] + arrYtLink[2]}/embed/${arrYtLink[3]}`;
  }
  return (
    <div>
      {singleData?.[0] && (
        <div>
          <h3 data-testid="recipe-title">{singleData?.[0].strMeal}</h3>
          <h3 data-testid="recipe-category">{singleData?.[0].strCategory}</h3>
          <img
            data-testid="recipe-photo"
            src={ singleData?.[0].strMealThumb }
            alt={ singleData?.[0].idMeal }
          />
          { arrIngredient.map((el, index) => (
            <p key={ el } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${el} ${arrMeasure[index] ? arrMeasure[index] : ''}`}
            </p>
          ))}
          <p data-testid="instructions">{ singleData?.[0].strInstructions }</p>
          <iframe
            data-testid="video"
            title="receita"
            width="420"
            height="315"
            src={ ytLink }
          />
        </div>
      )}
      <div className="carousel">
        {
          recomendation.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="item"
              key={ item.strDrink }
            >
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <h3 data-testid={ `${index}-recommendation-title` }>{ item.strDrink }</h3>
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

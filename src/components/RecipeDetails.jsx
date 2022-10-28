import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

export default function RecipeDetails({ apiType, id }) {
  const { singleData, recomendation } = useContext(MyContext);
  const [doneRe, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, []);

  const other = apiType === 'Meal' ? 'Drink' : 'Meal';
  const nameApiType = apiType === 'Meal' ? 'meals' : 'drinks';
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
  let ytLink = '';
  if (singleData?.[0]?.strYoutube) {
    const arrYtLink = singleData[0]?.strYoutube.split('/');
    ytLink = `${arrYtLink[0] + arrYtLink[2]}/embed/${arrYtLink[3]}`;
  }
  // console.log(inProgress?.meals?.comida01);
  console.log(inProgress?.[nameApiType]?.[id]);
  console.log(id);
  return (
    <div>
      {singleData?.[0] && (
        <div>
          <h3 data-testid="recipe-title">{singleData?.[0][`str${apiType}`]}</h3>
          <h3 data-testid="recipe-category">{singleData?.[0].strAlcoholic}</h3>
          <h3 data-testid="recipe-category">{singleData?.[0].strCategory}</h3>
          <img
            data-testid="recipe-photo"
            src={ singleData?.[0][`str${apiType}Thumb`] }
            alt={ singleData?.[0][`id${apiType}`] }
          />
          { arrIngredient.map((el, index) => (
            <p key={ el } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${el} ${arrMeasure[index] ? arrMeasure[index] : ''}`}
            </p>
          ))}
          <p data-testid="instructions">{ singleData?.[0].strInstructions }</p>
          {
            apiType === 'Meal' && (
              <iframe
                data-testid="video"
                title="receita"
                width="420"
                height="315"
                src={ ytLink }
              />
            )
          }
        </div>
      )}
      <div className="carousel">
        {
          recomendation?.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="item"
              key={ item[`str${other}`] }
            >
              <img
                src={ item[`str${other}Thumb`] }
                alt={ item[`str${other}`] }
              />
              <h3 data-testid={ `${index}-recommendation-title` }>
                { item[`str${other}`] }
              </h3>
            </div>
          ))
        }
      </div>
      {
        !doneRe?.some((el) => el?.id === singleData?.[0]?.[`id${apiType}`]) && (
          <button
            type="button"
            className="start-btn"
            data-testid="start-recipe-btn"
          >
            {
              inProgress?.[nameApiType]?.[id] ? (
                'Continue Recipe'
              ) : (
                'Start Recipe'
              )
            }
          </button>
        )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  apiType: PropTypes.string,
}.isRequired;

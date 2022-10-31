import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const time = 3000;
const menosUm = -1;
export default function RecipeDetails({ apiType, id }) {
  const history = useHistory();
  const { singleData, recomendation } = useContext(MyContext);
  const [doneRe, setDoneRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
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

  const handleShareButton = () => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setShowCopyMessage(false), time);
  };

  useEffect(() => {
    console.log(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteButton = () => {
    if ((favoriteRecipes.some((el) => el.id === id))) {
      const newFiltred = favoriteRecipes.filter((el) => el.id !== id);
      console.log('atual favRecipes', favoriteRecipes);
      setFavoriteRecipes(newFiltred);
    } else {
      const saveFavRecipe = [...favoriteRecipes, {
        id: singleData[0][`id${apiType}`],
        type: nameApiType.slice(0, menosUm),
        nationality: singleData[0].strArea ? singleData[0].strArea : '',
        category: singleData[0].strCategory,
        alcoholicOrNot: singleData[0].strAlcoholic ? singleData[0].strAlcoholic : '',
        name: singleData[0][`str${apiType}`],
        image: singleData[0][`str${apiType}Thumb`],
      }];
      setFavoriteRecipes(saveFavRecipe);
    }
  };

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
      { showCopyMessage && (
        <p>Link copied!</p>
      )}

      <button type="button" data-testid="share-btn" onClick={ handleShareButton }>
        <img src={ shareImg } alt="compartilhar" />
      </button>

      <button type="button" onClick={ handleFavoriteButton }>
        <img
          data-testid="favorite-btn"
          src={
            (favoriteRecipes
              .some((el) => el.id === id)) ? blackHeartIcon : whiteHeartIcon
          }
          alt="favoritar"
        />
      </button>

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
            onClick={ () => history.push(`/${nameApiType}/${id}/in-progress`) }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  id: PropTypes.string,
}.isRequires;

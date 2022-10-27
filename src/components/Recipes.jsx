import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Filter from './Filter';

const MAX_RECIPES = 11;
export default function Recipes() {
  const history = useHistory();
  const { data, apiType, categoriesData } = useContext(MyContext);
  const apiTypeUp = apiType[0].toUpperCase() + apiType.substring(1);
  const changeToDetail = (recipe) => {
    history.push(`/${apiType}s/${recipe[`id${apiTypeUp}`]}`);
  };
  return (
    <div>
      <Filter />
      {
        categoriesData[0] ? (
          categoriesData?.map((recipe, i) => {
            if (i > MAX_RECIPES) return;
            return (
              <button
                type="button"
                data-testid={ `${i}-card-button` }
                onClick={ () => changeToDetail(recipe) }
                key={ recipe[`id${apiTypeUp}`] }
              >
                <h3 data-testid={ `${i}-card-name` }>{recipe[`str${apiTypeUp}`]}</h3>
                <p data-testid={ `${i}-recipe-card` }>{ recipe.strInstructions }</p>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe[`str${apiTypeUp}Thumb`] }
                  alt={ recipe[`id${apiTypeUp}`] }
                />
              </button>
            );
          })
        ) : (
          data?.map((recipe, index) => {
            if (index > MAX_RECIPES) return;
            return (
              <button
                type="button"
                data-testid={ `${index}-card-button` }
                onClick={ () => changeToDetail(recipe) }
                key={ recipe[`id${apiTypeUp}`] }
              >
                <h3 data-testid={ `${index}-card-name` }>{recipe[`str${apiTypeUp}`]}</h3>
                <p data-testid={ `${index}-recipe-card` }>{ recipe.strInstructions }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe[`str${apiTypeUp}Thumb`] }
                  alt={ recipe[`id${apiTypeUp}`] }
                />
              </button>
            );
          })
        )
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

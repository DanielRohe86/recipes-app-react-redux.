import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Filter from './Filter';

const MAX_RECIPES = 11;
export default function Recipes() {
  const history = useHistory();
  const { data, apiType } = useContext(MyContext);
  const apiTypeUpper = apiType[0].toUpperCase() + apiType.substring(1);
  const changeToDetail = (recipe) => {
    history.push(`/${apiType}s/${recipe[`id${apiTypeUpper}`]}`);
  };
  return (
    <div>
      <Filter />
      {
        data?.map((recipe, index) => {
          if (index > MAX_RECIPES) return;
          return (
            <button
              type="button"
              data-testid={ `${index}-card-button` }
              onClick={ () => changeToDetail(recipe) }
              key={ recipe[`id${apiTypeUpper}`] }
            >
              <h3 data-testid={ `${index}-card-name` }>{recipe[`str${apiTypeUpper}`]}</h3>
              <p data-testid={ `${index}-recipe-card` }>{ recipe.strInstructions }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${apiTypeUpper}Thumb`] }
                alt={ recipe[`id${apiTypeUpper}`] }
              />
            </button>
          );
        })
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

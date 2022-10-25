import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Filter from './Filter';

const MAX_RECIPES = 11;
export default function Recipes({ type }) {
  const { data } = useContext(MyContext);
  return (
    <div>
      <Filter />
      {
        data?.map((recipe, index) => {
          if (index > MAX_RECIPES) return;
          return (
            <div key={ recipe[`id${type}`] }>
              <h3 data-testid={ `${index}-card-name` }>{ recipe[`str${type}`] }</h3>
              <p data-testid={ `${index}-recipe-card` }>{ recipe.strInstructions }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${type}Thumb`] }
                alt={ recipe[`id${type}`] }
              />
            </div>
          );
        })
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

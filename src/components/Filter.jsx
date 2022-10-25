import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const MAX_CATEGORY_SIZE = 5;

export default function Filter() {
  const { categories } = useContext(MyContext);
  return (
    <div>
      {
        categories?.map((category, index) => {
          if (index >= MAX_CATEGORY_SIZE) {
            return;
          }
          return (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        })
      }
    </div>
  );
}

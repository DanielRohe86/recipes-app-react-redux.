import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const MAX_CATEGORY_SIZE = 5;

export default function Filter() {
  const [showDefault, setShowDefault] = useState(false);
  const {
    categories,
    searchByCategory,
    all,
  } = useContext(MyContext);

  const handle = (category) => {
    if (showDefault) {
      all();
      setShowDefault(false);
    } else {
      searchByCategory(category.strCategory);
      setShowDefault(true);
    }
  };

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
              onClick={ () => handle(category) }
            >
              {category.strCategory}
            </button>
          );
        })
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => all() }
      >
        All
      </button>
    </div>
  );
}

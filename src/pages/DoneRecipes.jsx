import { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';

const time = 3000;
export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleShareButton = (el) => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000/${el.type}s/${el.id}`);
    setTimeout(() => setShowCopyMessage(false), time);
  };

  return (
    <div>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-meal-btn" type="button">Meals</button>
        <button data-testid="filter-by-drink-btn" type="button">Driks</button>
      </div>
      <div>
        { showCopyMessage && (
          <p>Link copied!</p>
        )}
        {doneRecipes.map((el, index) => (
          <div key={ el.name }>
            <img
              src={ el.image }
              data-testid={ `${index}-horizontal-image` }
              alt="imagem da receita"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{el.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
            <button
              type="button"
              onClick={ () => handleShareButton(el) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
            </button>
            {el.tags.map((tagName) => (
              <p
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {el.tags}
              </p>
            ))}
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${el.nationality} - ${el.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-top-text` }>{el.alcoholicOrNot}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

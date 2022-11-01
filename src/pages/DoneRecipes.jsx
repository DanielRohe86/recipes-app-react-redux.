import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';

const time = 3000;
export default function DoneRecipes() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [backupDoneRecipes, setBackupDoneRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  useEffect(() => {
    setBackupDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleShareButton = (el) => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000/${el.type}s/${el.id}`);
    setTimeout(() => setShowCopyMessage(false), time);
  };

  const handleFilterByAll = () => {
    setDoneRecipes(backupDoneRecipes);
  };

  const handleFilterByMeal = () => {
    setDoneRecipes(backupDoneRecipes.filter((el) => el.type === 'meal'));
  };

  const handleFilterByDrink = () => {
    setDoneRecipes(backupDoneRecipes.filter((el) => el.type === 'drink'));
  };

  const goToDetailPage = (el) => {
    history.push(`/${el.type}s/${el.id}`);
  };
  return (
    <div>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleFilterByAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterByMeal }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterByDrink }
        >
          Driks
        </button>
      </div>
      <div>
        { showCopyMessage && (
          <p>Link copied!</p>
        )}
        {doneRecipes?.map((el, index) => (
          <div key={ el.name }>
            <button type="button" onClick={ () => goToDetailPage(el) }>
              <img
                src={ el.image }
                data-testid={ `${index}-horizontal-image` }
                alt="imagem da receita"
              />
              <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>{el.category}</p>
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

import React from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
// import MyContext from '../context/MyContext';
import Recipes from '../components/Recipes';

export default function MealRecipe() {
  // const { apiType } = useContext(MyContext);

  // const history = useHistory();

  // useEffect(() => {
  //   const { location: { pathname } } = history;
  //   const id = pathname.split('/')[2];
  //   fetchAPIByID(id);
  // }, []);

  return (
    <div>
      MealRecipe
      <Recipes />
      <Footer />
    </div>
  );
}

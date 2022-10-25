import Header from '../components/Header';
import Recipes from '../components/Recipes';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <VerifyRecipeQuantity type="meals" />
      <Header title="Meals" apiType="meal" />
      <Recipes type="Meal" />
      <Footer />
    </div>
  );
}
export default Meals;

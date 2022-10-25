import Header from '../components/Header';
import Recipes from '../components/Recipes';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <VerifyRecipeQuantity type="drinks" />
      <Header title="Drinks" apiType="cocktail" />
      <Recipes type="Drink" />
      <Footer />
    </div>
  );
}
export default Drinks;

import Header from '../components/Header';
import RenderData from '../components/RenderData';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <VerifyRecipeQuantity type="drinks" />
      <Header title="Drinks" apiType="cocktail" />
      <RenderData type="Drink" />
      <Footer />
    </div>
  );
}
export default Drinks;

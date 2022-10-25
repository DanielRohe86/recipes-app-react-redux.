import Header from '../components/Header';
import RenderData from '../components/RenderData';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <VerifyRecipeQuantity type="meals" />
      <Header title="Meals" apiType="meal" />
      <RenderData type="Meal" />
      <Footer />
    </div>
  );
}
export default Meals;

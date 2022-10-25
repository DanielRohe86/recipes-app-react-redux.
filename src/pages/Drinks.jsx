import Header from '../components/Header';
import RenderData from '../components/RenderData';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';

function Drinks() {
  return (
    <div>
      <VerifyRecipeQuantity type="drinks" />
      <Header title="Drinks" apiType="cocktail" />
      <RenderData type="Drink" />
    </div>
  );
}
export default Drinks;

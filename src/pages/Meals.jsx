import Header from '../components/Header';
import RenderData from '../components/RenderData';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';

function Meals() {
  return (
    <div>
      <VerifyRecipeQuantity type="meals" />
      <Header title="Meals" apiType="meal" />
      <RenderData type="Meal" />
    </div>
  );
}
export default Meals;

import Header from '../components/Header';
import RedirectToIdZero from '../components/RedirectToIdZero';

function Drinks() {
  return (
    <div>
      <RedirectToIdZero type="drinks" />
      <Header title="Drinks" apiType="cocktail" />
    </div>
  );
}
export default Drinks;

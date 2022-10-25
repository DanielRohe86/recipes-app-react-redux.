import Header from '../components/Header';
import RedirectToIdZero from '../components/RedirectToIdZero';

function Meals() {
  return (
    <div>
      <RedirectToIdZero type="meals" />
      <Header title="Meals" apiType="meal" />
    </div>
  );
}
export default Meals;

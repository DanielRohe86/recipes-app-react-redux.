import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
// import Filter from '../components/Filter';
import Meal from '../pages/Meals';

describe('Testando Filter', () => {
  test('Testando botão de perfil', async () => {
    const { debug } = renderWithRouter(<Meal />);
    const filterOptionBeef = await screen.findByTestId('Beef-category-filter', {}, { timeout: 5000 });
    debug();
    expect(filterOptionBeef).toBeInTheDocument();
  });
});

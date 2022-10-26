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
    expect(await screen.findByTestId('0-card-name', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-card-img', {}, { timeout: 5000 })).toBeInTheDocument();
  });
});

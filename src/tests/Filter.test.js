import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Meal from '../pages/Meals';

describe('Testando Filter', () => {
  test('Testando botão de perfil', async () => {
    const { history } = renderWithRouter(<Meal />);
    const filterOptionBeef = await screen.findByTestId('Beef-category-filter', {}, { timeout: 5000 });
    expect(filterOptionBeef).toBeInTheDocument();
    expect(await screen.findByTestId('0-card-name', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-card-img')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-card-button'));
    expect(history.location.pathname).toBe('/meals/52977');
  });
});

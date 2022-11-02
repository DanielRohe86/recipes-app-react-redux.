import { screen /* waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Profile from '../components/Profile';
import { renderWithRouter } from './helpers/renderWith';

const dataTestEmail = 'profile-email';
const profileBtn = 'profile-done-btn';
const favoriteBtn = 'profile-favorite-btn';
const logoutProfile = 'profile-logout-btn';

const emailTest = 'daniel@gmail.com';
// const passwordTest = '123456';
// const dataTestPassword = 'password-input';

beforeEach(() => localStorage.setItem('user', JSON.stringify({ email: emailTest })));
afterEach(() => localStorage.clear());

describe('Teste o componente <Profile.js />', () => {
  it('tests buttons on the screen', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId(dataTestEmail);
    expect(email).toBeInTheDocument();

    const btnProfile = screen.getByTestId(profileBtn);
    expect(btnProfile).toBeInTheDocument();

    const btnProfileFavorite = screen.getByTestId(favoriteBtn);
    expect(btnProfileFavorite).toBeInTheDocument();

    const btnlogoutProfile = screen.getByTestId(logoutProfile);
    expect(btnlogoutProfile).toBeInTheDocument();
  });

  it('tests local storage-related functions part 1 - user', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const initialLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(initialLocalStorage.email).toBe(emailTest);

    const wrongInitialUser = 'notDaniel@gmail.com';
    expect(initialLocalStorage.email).not.toBe(wrongInitialUser);
  });

  // it('tests local storage-related functions part 2 - false user', async () => { NUNCA VAI PASSAR!
  //   renderWithRouter(<App />);
  //   const inputEmail = screen.getByPlaceholderText(/email/i);
  //   const inputSenha = screen.getByPlaceholderText(/password/i);
  //   // const btnEnter = screen.getByText(/enter/i);

  //   userEvent.type(inputEmail, 'invalido'); // não sobrescreve o beforeEach para testar o IF no setState com LocalStorage
  //   userEvent.type(inputSenha, '123456');
  //   const initialFalseLocalStorage = JSON.parse(localStorage.getItem('user'));
  //   expect(initialFalseLocalStorage).toBeFalsy();
  // });

  it('tests local storage-related functions part 3 - logout', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnlogoutProfile = screen.getByTestId(logoutProfile);
    act(() => {
      userEvent.click(btnlogoutProfile);
    });

    // console.log(history.location.pathname);
    // debug();
    const inputEmail = await screen.findByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    expect(localStorageUser).toBeNull();
  });
});

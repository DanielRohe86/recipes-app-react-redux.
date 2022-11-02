import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [email, setEmail] = useState([]);

useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user);
  }, []);

  const cleanLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <p data-testid="profile-email">{email.email}</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ cleanLocalStorage }
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

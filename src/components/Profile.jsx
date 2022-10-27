import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [email, setEmail] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmail(user);
    }
  }, []);
  return (
    <div>
      <p data-testid="profile-email">{email.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}

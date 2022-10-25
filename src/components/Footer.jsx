import React from 'react';
import { Link } from 'react-router-dom';
import drinkImg from '../images/drinkIcon.svg';
import mealImg from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkImg }
          alt="Icone de perfil"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealImg }
          alt="Icone de perfil"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkLogo from '../images/drinkLogo.svg';
import mealLogo from '../images/mealLogo.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      className="position-fixed fixed-bottom footer bg-light"
    >
      <div
        className="container d-flex justify-content-between"
        style={ { backgroundColor: 'rgba(65, 25, 127, 1)' } }
      >
        <button
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          onClick={ () => history.push('/drinks') }
          className="btn"
        >
          <img src={ drinkLogo } alt="drink icon" />
        </button>
        <button
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          onClick={ () => history.push('/meals') }
          className="btn"
        >
          <img src={ mealLogo } alt="meal icon" />
        </button>
      </div>
    </footer>
  );
}

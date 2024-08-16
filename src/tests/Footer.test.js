import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Context from '../context/context';
import Meals from '../pages/Meals';

test('Testa o componente Meals, testa botões de redirecionamento', () => {
  const history = createMemoryHistory();
  const recipes = [];

  render(
    <Context.Provider value={ { recipes } }>
      <Router history={ history }>
        <Meals />
      </Router>
    </Context.Provider>,
  );

  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(drinksButton);
  expect(history.location.pathname).toBe('/drinks');

  const mealsButton = screen.getByTestId('meals-bottom-btn');
  userEvent.click(mealsButton);
  expect(history.location.pathname).toBe('/meals');
});

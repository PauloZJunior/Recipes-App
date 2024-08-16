import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Context from '../context/context';
import Meals from '../pages/Meals';

test('Testa o componente Footer, testa botões de redirecionamento', () => {
  const history = createMemoryHistory();
  const recipes = [];

  render(
    <Context.Provider value={ { recipes, setRecipes } }>
      <Router history={ history }>
        <Meals />
      </Router>
    </Context.Provider>,
  );
  // render(
  //   <Router history={ history }>
  //     <Meals />
  //   </Router>,
  // );
  const linkElement = screen.getByText(/Meals/i);
  expect(linkElement).toBeInTheDocument();
  act(() => {
    const footerElement = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(footerElement);
  });
  expect(history.location.pathname).toBe('/drinks');

  act(() => {
    const footerElement = screen.getByTestId('meals-bottom-btn');
    userEvent.click(footerElement);
  });
  expect(history.location.pathname).toBe('/meals');
});

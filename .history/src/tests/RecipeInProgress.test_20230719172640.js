import React from 'react';
import { screen } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import Provider from '../context/Provider';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
// import oneDrink from '../../cypress/mocks/oneDrink';

describe('Render RecipeInProgress component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
  });

  afterEach(() => jest.clearAllMocks());

  it('Verify if the RecipeInProgress component render correctly', () => {
    const { history } = renderWithRouter(
      <Provider>
        <RecipeInProgress />
      </Provider>,
    );

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
});

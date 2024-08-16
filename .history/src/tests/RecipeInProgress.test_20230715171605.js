import React from 'react';
import { screen } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import Provider from '../context/Provider';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipeButtons from '../components/RecipeButtons';

describe('Render RecipeInProgress component', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Verify if the RecipeInProgress component render correctly', () => {
    const { history } = renderWithRouter(
      <Provider>
        <RecipeInProgress />
        <RecipeButtons
          recipe={ oneMeal.meals[0] }
          recipeId={ oneMeal.meals[0].idMeal }
          recipeType="meals"
        />
      </Provider>,
      { initialEntries: ['/meals/52771/in-progress'] },
    );

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
});

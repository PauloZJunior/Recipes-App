import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import Provider from '../context/Provider';
import { renderWithRouter } from '../helpers/RenderWithRouter';

describe('Render RecipeInProgress component', () => {
  it('Verify if the RecipeInProgress component render correctly', () => {
    const { history } = renderWithRouter(
      <Provider>
        <RecipeInProgress
          recipe={ recipe }
          recipeId={ recipeId }
          recipeType={ recipeType }
        />
      </Provider>,
      { initialEntries: ['/meals/52771/in-progress'] },
    );

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
});

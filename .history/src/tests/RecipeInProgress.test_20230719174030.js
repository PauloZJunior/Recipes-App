import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import Provider from '../context/Provider';
import App from '../App';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
// import oneDrink from '../../cypress/mocks/oneDrink';

describe('Render RecipeInProgress component', () => {
  beforeEach(async () => {
    renderWithRouter(<App />, { initialEntries: '/meals/52771/in-progress' });
    await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());
  });

  it('Verify if the RecipeInProgress component render correctly', () => {
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
});

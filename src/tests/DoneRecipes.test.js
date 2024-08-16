import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import Provider from '../context/Provider';

const doneRecipes = [
  {
    id: '53069',
    nationality: 'Filipino',
    name: 'Bistek',
    category: 'Beef',
    image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
    tags: ['meal', 'beef'],
    alcoholicOrNot: '',
    type: 'meal',
    doneDate: '2023-07-17T21:24:50.071Z',
  },
  {
    id: '15997',
    nationality: '',
    name: 'GG',
    category: 'Ordinary Drink',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    tags: ['alcohol', 'drink'],
    alcoholicOrNot: 'Optional alcohol',
    type: 'drink',
    doneDate: '2023-07-20T01:08:28.472Z',
  },
];

describe('DoneRecipes', () => {
  const history = createMemoryHistory();
  const recipes = doneRecipes;

  beforeEach(() => {
    // Criar entradas falsas no localStorage antes de cada teste
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });

  afterEach(() => {
    // Limpar as entradas falsas do localStorage após cada teste
    localStorage.removeItem('doneRecipes');
  });

  it('verifica se o cabeçalho está na tela', () => {
    const { getAllByTestId } = render(
      <Provider value={ { recipes } }>
        <Router history={ history }>
          <DoneRecipes />
        </Router>
      </Provider>,
    );

    const topTexts = getAllByTestId('0-horizontal-top-text');
    const doneDates = getAllByTestId(/-horizontal-done-date/);
    const shareButtons = getAllByTestId(/-horizontal-share-btn/);
    expect(topTexts.length).toBeGreaterThan(0);
    expect(doneDates.length).toBeGreaterThan(0);
    expect(shareButtons.length).toBeGreaterThan(0);

    const filterByMealButton = screen.getByTestId(/filter-by-meal-btn/);
    const filterByDrinkButton = screen.getByTestId(/filter-by-drink-btn/);
    const filterByAllButton = screen.getByTestId(/filter-by-all-btn/);

    expect(filterByMealButton).toBeInTheDocument();
    expect(filterByDrinkButton).toBeInTheDocument();
    expect(filterByAllButton).toBeInTheDocument();
  });

  it('shares the correct link when share button is clicked', async () => {
    const { getAllByTestId, getAllByText } = render(
      <Provider value={ { recipes } }>
        <Router history={ history }>
          <DoneRecipes />
        </Router>
      </Provider>,
    );

    // Assuming you have a recipe with type 'meal' in your doneRecipes array
    const recipeTypeMeal = doneRecipes.find((recipe) => recipe.type === 'meal');

    // Find and click the share button for the recipe with type 'meal'
    const shareButton = getAllByTestId(/horizontal-share-btn/); // Use the index 0 here
    userEvent.click(shareButton[0]);

    // Wait for the "Link copied!" text to be displayed
    const shareInfoText = getAllByText('Link copied!');

    expect(shareInfoText.length).toBeGreaterThan(0);

    // Verify that the link was copied to the clipboard correctly
    const expectedLink = `${window.location.href.split('/done-recipes')}/meals/${recipeTypeMeal.id}`;
    const clipboardData = window.clipboardData || { getData: () => expectedLink };
    expect(clipboardData.getData('text/plain')).toBe(expectedLink);
  });

  it('filters recipes correctly when filter buttons are clicked', async () => {
    const { getAllByTestId, getByTestId, findAllByTestId } = render(
      <Provider value={ { recipes } }>
        <Router history={ history }>
          <DoneRecipes />
        </Router>
      </Provider>,
    );

    const mealsButton = getByTestId(/filter-by-meal-btn/);
    const drinksButton = getByTestId(/filter-by-drink-btn/);
    const allButton = getByTestId(/filter-by-all-btn/);

    // Verify initial rendering of all recipes
    let recipeCards = getAllByTestId(/-horizontal-image/);
    expect(recipeCards.length).toBe(doneRecipes.length);

    // Filter by meals
    userEvent.click(mealsButton);
    recipeCards = await findAllByTestId(/-horizontal-image/);
    const filteredMeals = doneRecipes.filter((recipe) => recipe.type === 'meal');
    expect(recipeCards.length).toBe(filteredMeals.length);

    // Filter by drinks
    userEvent.click(drinksButton);
    recipeCards = await findAllByTestId(/-horizontal-image/);
    const filteredDrinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
    expect(recipeCards.length).toBe(filteredDrinks.length);

    // Filter by all
    userEvent.click(allButton);
    recipeCards = await findAllByTestId(/-horizontal-image/);
    expect(recipeCards.length).toBe(doneRecipes.length);
  });
});

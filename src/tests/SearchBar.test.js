import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import Provider from '../context/Provider';

const searchTopBtn = 'search-top-btn';
const searchCamp = 'search-input';
const searchIngredient = 'ingredient-search-radio';
const searchName = 'name-search-radio';
const searchFirstLetter = 'first-letter-search-radio';
const execSearchBtn = 'exec-search-btn';

describe('SearchBar in Meals page tests', () => {
  it('Verify if the search for recipes returns the corresponding recipes', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    const searchType = screen.getByTestId(searchIngredient);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => {
      const recipe = screen.queryAllByTestId(/-recipe-card/);
      expect(recipe).toHaveLength(12);
    });
  });
  it('Verify if the search results return only one recipe and redirect to recipe details automatically', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'Arrabiata' } });
    const searchType = screen.getByTestId(searchName);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => expect(history.location.pathname).toEqual('/meals/52771'));
  });
  it('Verify if when searching for recipes with a non-existent ingredient, it does not return recipes', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'fish' } });
    const searchType = screen.getByTestId(searchIngredient);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => {
      const recipe = screen.queryAllByTestId(/-recipe-card/);
      expect(recipe).toHaveLength(0);
    });
  });
  it('Verify if when searching for recipes with first-letter, and typing more than one letter, an alert is shown', () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
      { initialEntries: ['/meals'] },
    );
    global.alert = jest.fn();

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'ad' } });
    const searchType = screen.getByTestId(searchFirstLetter);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

describe('SearchBar in Drinks page tests', () => {
  it('Verify if the search for recipes returns the corresponding recipes', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'gin' } });
    const searchType = screen.getByTestId(searchIngredient);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    const recipe = await screen.findAllByTestId(/-recipe-card/);
    expect(recipe).toHaveLength(12);
  });
  it('Verify if the search results return only one recipe and redirect to recipe details automatically', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'Aquamarine' } });
    const searchType = screen.getByTestId(searchName);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => expect(history.location.pathname).toEqual('/drinks/178319'));
  });
  it('Verify if when searching for recipes with a non-existent ingredient, it does not return recipes', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'soda' } });
    const searchType = screen.getByTestId(searchName);
    fireEvent.click(searchType);
    const searchType2 = screen.getByTestId(searchIngredient);
    fireEvent.click(searchType2);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => {
      const recipe = screen.queryAllByTestId(/-recipe-card/);
      expect(recipe).toHaveLength(0);
    });
  });
  it('Verify if when searching for recipes with licor in the name, it does not return recipes', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchCamp);
    fireEvent.change(searchInput, { target: { value: 'licor' } });
    const searchType = screen.getByTestId(searchName);
    fireEvent.click(searchType);
    const searchButton = screen.getByTestId(execSearchBtn);
    fireEvent.click(searchButton);
    await waitFor(() => {
      const recipe = screen.queryAllByTestId(/-recipe-card/);
      expect(recipe).toHaveLength(0);
    });
  });
});

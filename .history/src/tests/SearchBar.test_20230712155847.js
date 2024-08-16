import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Context from '../context/context';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';

jest.mock('../hooks/useFetch');

describe('SearchBar component', () => {
  const mockRecipes = [
    { idMeal: '1', strMeal: 'Meal 1' },
    { idMeal: '2', strMeal: 'Meal 2' },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders search bar with input and search button', () => {
    render(<SearchBar />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  test('updates search term value on input change', () => {
    render(<SearchBar />);

    const inputElement = screen.getByTestId('search-input');
    fireEvent.change(inputElement, { target: { value: 'chicken' } });

    expect(inputElement.value).toBe('chicken');
  });

  test('updates search term type on radio button change', () => {
    render(<SearchBar />);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);
    expect(nameRadio.checked).toBe(false);

    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    expect(ingredientRadio.checked).toBe(false);
  });

  test('performs search on button click', async () => {
    const mockFetchApi = jest.fn().mockResolvedValue({ meals: mockRecipes });
    useFetch.mockReturnValue({ loading: false, fetchApi: mockFetchApi });
    const setRecipes = jest.fn();

    render(
      <MemoryRouter>
        <Context.Provider value={ { recipes: [], setRecipes } }>
          <SearchBar />
        </Context.Provider>
      </MemoryRouter>,
    );

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(inputElement, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);

    expect(mockFetchApi).toHaveBeenCalledWith(expect.any(Function), 'chicken', 'ingredient');
    await waitFor(() => expect(setRecipes).toHaveBeenCalledWith(mockRecipes));
  });

  test('displays loading text while performing search', async () => {
    useFetch.mockReturnValue({ loading: true, fetchApi: jest.fn() });

    render(
      <MemoryRouter>
        <Context.Provider value={ { recipes: [], setRecipes: jest.fn() } }>
          <SearchBar />
        </Context.Provider>
      </MemoryRouter>,
    );

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(inputElement, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);

    expect(inputElement.value).toBe('Loading');
  });

  test('resets search term on mount', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );

    const inputElement = screen.getByTestId('search-input');

    expect(inputElement.value).toBe('');
  });

  test('navigates to recipe page on search result', async () => {
    const history = createMemoryHistory();
    const mockFetchApi = jest.fn().mockResolvedValue({ meals: mockRecipes });
    useFetch.mockReturnValue({ loading: false, fetchApi: mockFetchApi });
    const setRecipes = jest.fn();

    render(
      <Router history={ history }>
        <Context.Provider value={ { recipes: [], setRecipes } }>
          <SearchBar />
        </Context.Provider>
      </Router>,
    );

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(inputElement, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);

    await waitFor(() => expect(setRecipes).toHaveBeenCalledWith(mockRecipes));
    expect(history.location.pathname).toBe('/meals/1');
  });

  // ... other test cases
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';

describe('RecipeInProgress', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders loading text while fetching data', () => {
    // Mock the useFetch hook to simulate loading state
    jest.mock('../hooks/useFetch', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        loading: true,
        fetchApi: jest.fn(),
      })),
    }));

    render(<RecipeInProgress />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders recipe details correctly', () => {
    // Mock the response for fetchApi
    const mockFetchApi = jest.fn(async () => ({
      meals: [
        {
          idMeal: '123',
          strMeal: 'Test Meal',
          strMealThumb: 'test-thumb.jpg',
          strCategory: 'Test Category',
          strInstructions: 'Test Instructions',
          strIngredient1: 'Ingredient 1',
          strMeasure1: '1 cup',
          // Add more mock data as needed
        },
      ],
    }));

    // Mock the useFetch hook with the mock function
    jest.mock('../hooks/useFetch', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        loading: false,
        fetchApi: mockFetchApi,
      })),
    }));

    // Render the component
    render(<RecipeInProgress />);

    // Check if the recipe details are rendered correctly
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute(
      'src',
      'test-thumb.jpg',
    );
    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Test Meal');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(
      'Test Category',
    );

    // Check ingredient list
    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 1 - 1 cup')).toBeInTheDocument();

    // Check instructions
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByText('Test Instructions')).toBeInTheDocument();
  });

  test('toggles ingredient checkbox on click', () => {
    render(<RecipeInProgress />);

    // Mock the initial recipe data
    const recipeData = {
      strIngredient1: 'Ingredient 1',
      strMeasure1: '1 cup',
      // Add more mock data as needed
    };

    // Mock the response for fetchApi
    const mockFetchApi = jest.fn(async () => ({
      meals: [{ ...recipeData }],
    }));

    // Mock the useFetch hook with the mock function
    jest.mock('../hooks/useFetch', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        loading: false,
        fetchApi: mockFetchApi,
      })),
    }));

    // Render the component
    render(<RecipeInProgress />);

    // Get the checkbox and label elements
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByLabelText('Ingredient 1 - 1 cup');

    // Check if the checkbox is initially unchecked
    expect(checkbox).not.toBeChecked();
    expect(label).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

    // Click the checkbox to toggle it
    fireEvent.click(checkbox);

    // Check if the checkbox is now checked and the ingredient text is crossed out
    expect(checkbox).toBeChecked();
    expect(label).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

    // Click the checkbox again to toggle it back
    fireEvent.click(checkbox);

    // Check if the checkbox is unchecked again and the ingredient text is not crossed out
    expect(checkbox).not.toBeChecked();
    expect(label).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
  });
});

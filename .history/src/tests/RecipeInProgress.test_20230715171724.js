import React from 'react';
import { screen } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import Provider from '../context/Provider';
import { renderWithRouter } from '../helpers/RenderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipeButtons from '../components/RecipeButtons';

describe('Render RecipeInProgress component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders loading text while fetching data', () => {
    jest.mock('../hooks/useFetch', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        loading: true,
        fetchApi: jest.fn(),
      })),
    }));
  });
});

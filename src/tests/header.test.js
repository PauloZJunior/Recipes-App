import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/context';

const pageTitle = 'page-title';
const profileTopBtn = 'profile-top-btn';
const searchTopBtn = 'search-top-btn';

describe('Header tests', () => {
  it('renders correct title and buttons for /meals route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Meals');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(profileTopBtn));
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders correct title and buttons for /drinks route', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Drinks');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(profileTopBtn));
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders correct title and buttons for /profile route', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Profile');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(profileTopBtn));
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders correct title and buttons for /done-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Done Recipes');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(profileTopBtn));
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders correct title and buttons for /favorite-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Favorite Recipes');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(profileTopBtn));
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('does not render header for unknown route', () => {
    render(
      <MemoryRouter initialEntries={ ['/unknown'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(screen.queryByTestId(profileTopBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });
});

describe('search bar tests', () => {
  it('renders search bar when search button is clicked', () => {
    const recipes = [];
    const setRecipes = jest.fn();
    render(
      <Context.Provider value={ { recipes, setRecipes } }>
        <MemoryRouter initialEntries={ ['/meals'] }>
          <Header />
        </MemoryRouter>
        ,
      </Context.Provider>,
    );

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId(searchTopBtn));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});

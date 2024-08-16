import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';

describe('Header', () => {
  const pageTitle = 'page-title';
  const profileTopBtn = 'profile-top-btn';
  const searchTopBtn = 'search-top-btn';

  test('renders correct title and buttons for /meals route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('renders correct title and buttons for /drinks route', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Drinks');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('renders correct title and buttons for /profile route', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Profile');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('renders correct title and buttons for /done-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('renders correct title and buttons for /favorite-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Favorite Recipes');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('does not render title or buttons for / route', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('toggles search bar on search button click', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId('search-top-btn');
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  test('toggles search bar on search button keyboard Enter press', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId('search-top-btn');
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    fireEvent.keyDown(searchButton, { key: 'Enter' });
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    fireEvent.keyDown(searchButton, { key: 'Enter' });
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  test('navigates to /profile on profile button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
});

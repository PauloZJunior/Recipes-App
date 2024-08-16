import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';

const pageTitle = 'pageTitle';
const profileTopBtn = 'profile-top-btn';
const searchTopBtn = 'search-top-btn';

describe('Header', () => {
  test('renders correct title and buttons for /meals route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Meals');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
  });

  test('renders correct title and buttons for /drinks route', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Drinks');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
  });

  test('renders correct title and buttons for /profile route', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Profile');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });

  test('renders correct title and buttons for /done-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Done Recipes');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });

  test('renders correct title and buttons for /favorite-recipes route', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Favorite Recipes');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });

  test('does not render title or buttons for / route', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(screen.queryByTestId(profileTopBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });

  test('toggles search bar on search button click', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(searchTopBtn);
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

    const searchButton = screen.getByTestId(searchTopBtn);
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

    const profileButton = screen.getByTestId(profileTopBtn);
    fireEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';

const pageTitle = 'page-title';
const profileTopBtn = 'profile-top-btn';
const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';

describe('Header', () => {
  it('renders correct title and buttons for /meals route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Meals');
    expect(screen.getByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
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
  });

  it('does render title or buttons for / route', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(pageTitle)).toBeInTheDocument();
    expect(screen.queryByTestId(profileTopBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchTopBtn)).toBeInTheDocument();
  });

  it('toggles search bar on search button click', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(searchTopBtn);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });

  it('toggles search bar on search button keyboard Enter press', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(searchTopBtn);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();

    fireEvent.keyDown(searchButton, { key: 'Enter' });
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();

    fireEvent.keyDown(searchButton, { key: 'Enter' });
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });

  it('navigates to /profile on profile button click', () => {
    const initialEntries = ['/profile'];
    const history = createMemoryHistory({ initialEntries });
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const profileButton = screen.getByTestId(profileTopBtn);
    fireEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });

  test('does not render title or buttons for unknown route', () => {
    render(
      <MemoryRouter initialEntries={ ['/unknown'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });
});

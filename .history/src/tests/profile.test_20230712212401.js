import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders user email', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toHaveTextContent('test@example.com');
  });

  it('dont render user email if not given', () => {
    localStorage.clear();
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const emailElement = screen.queryByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
  });

  it('redirects to done recipes page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('redirects to favorite recipes page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('clears local storage and redirects to home page on logout', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});

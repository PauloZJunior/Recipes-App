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

  test('renders user email', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toHaveTextContent('test@example.com');
  });

  test('redirects to done recipes page', () => {
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

  test('redirects to favorite recipes page', () => {
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

  test('clears local storage and redirects to home page on logout', () => {
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

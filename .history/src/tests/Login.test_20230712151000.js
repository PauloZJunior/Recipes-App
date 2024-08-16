import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login component', () => {
  test('renders login form', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('enters valid email and password and submits form', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Add assertions for the expected behavior after submitting the form
    // For example, you can check if the user is redirected to the expected page
  });

  test('disables submit button when email or password is invalid', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(submitButton).toBeDisabled();
  });
});

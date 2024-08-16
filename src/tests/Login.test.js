import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

const email = 'email-input';
const password = 'password-input';
const submit = 'login-submit-btn';

describe('Login component', () => {
  test('renders login form', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(submit);

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

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(submit);

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });

  test('disables submit button when email or password is invalid', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(submit);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(submitButton).toBeDisabled();
  });
});

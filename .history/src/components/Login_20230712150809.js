import React, { useState } from 'react';

export default function Login() {
  const [mailInput, setMailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const minLength = 6;

  const handleClick = () => {
    const email = {
      email: mailInput,
    };
    localStorage.setItem('user', JSON.stringify(email));
  };

  return (
    <form>
      <fieldset>
        <legend>
          Login
        </legend>
        <label
          htmlFor="e-mail"
        >
          Email:
          <input
            id="e-mail"
            data-testid="email-input"
            type="email"
            value={ mailInput }
            onChange={ (event) => setMailInput(event.target.value) }
          />
        </label>
        <label
          htmlFor="password"
        >
          Password:
          <input
            id="password"
            data-testid="password-input"
            type="password"
            value={ passInput }
            onChange={ (event) => setPassInput(event.target.value) }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !(passInput.length > minLength && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailInput)) }
          onClick={ handleClick }
        >
          Enter
        </button>
      </fieldset>
    </form>
  );
}

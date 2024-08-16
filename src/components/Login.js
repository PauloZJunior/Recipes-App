import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginTomato from '../images/loginTomato.svg';
import loginRecipeLogo from '../images/loginRecipeLogo.svg';

export default function Login() {
  const purpleColor = 'rgba(65, 25, 127, 1)';
  const [mailInput, setMailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const minLength = 6;
  const history = useHistory();

  const handleClick = () => {
    const email = {
      email: mailInput,
    };
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/meals');
  };

  return (
    <div
      className="container h-100 d-flex justify-content-center align-items-center"
    >
      <div
        className="col-md-6"
      >
        <div
          className="container-fluid h-100 d-flex flex-column align-items-center"
          style={ { backgroundColor: purpleColor } }
        >
          <img
            src={ loginRecipeLogo }
            alt="app-logo"
            className="mb-3"
          />
          <img src={ loginTomato } alt="login-tomato" className="mb-3" />
        </div>
        <form>
          <div className="form-group">
            <input
              id="e-mail"
              data-testid="email-input"
              type="email"
              value={ mailInput }
              onChange={ (event) => setMailInput(event.target.value) }
              className="form-control"
              placeholder="E-mail"
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              data-testid="password-input"
              type="password"
              value={ passInput }
              onChange={ (event) => setPassInput(event.target.value) }
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              data-testid="login-submit-btn"
              type="button"
              disabled={ !(passInput.length > minLength && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailInput)) }
              onClick={ handleClick }
              className="btn btn-block"
              style={ { backgroundColor: 'rgba(252, 196, 54, 1)' } }
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

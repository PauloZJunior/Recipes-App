import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/">
        <button type="button">Voltar</button>
      </Link>
    </div>
  );
}

export default NotFound;

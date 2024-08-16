import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';

function App() {
  return (

    <BrowserRouter>
      <Routes />
    </BrowserRouter>

  );
}

export default App;

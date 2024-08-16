import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Profile from '../pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Login from '../pages/Login';
import Meals from '../components/Meals';

function Routes() {
  return (
    <Switch>
      {/* <Route exact path="/" component={ Login } /> */}
      <Route exact path="/meals" component={ Meals } />
    </Switch>
  );
}

export default Routes;

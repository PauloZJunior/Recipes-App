import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      </Route>
    </Switch>
  );
}

export default Routes;

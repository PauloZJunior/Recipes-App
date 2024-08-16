import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={ Login }>
        <Header />
      </Route>
    </Switch>
  );
}

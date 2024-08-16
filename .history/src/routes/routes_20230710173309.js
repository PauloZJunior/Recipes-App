import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meal } />
      <Route exact path="/meals/:id" component={ MealDetails } />
      <Route exact path="/drinks" component={ Drink } />
      <Route exact path="/drinks/:id" component={ DrinkDetails } />
      <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/meals/:id/finished" component={ MealFinished } />
      <Route exact path="/drinks/:id/finished" component={ DrinkFinished } />
    </Switch>
  );
}

export default Routes;

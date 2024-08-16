import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../components/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/meals" component={ Meal } />
      <Route exact path="/meals/:id" component={ MealDetails } />
      <Route exact path="/drinks" component={ Drink } />
      <Route exact path="/drinks/:id" component={ DrinkDetails } />
      <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;

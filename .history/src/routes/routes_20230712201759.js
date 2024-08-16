import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../components/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;

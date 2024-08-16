import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import NotFound from '../pages/NotFound';
import Details from '../pages/Details';
import RecipeInProgress from '../pages/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ Details } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ Details } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;

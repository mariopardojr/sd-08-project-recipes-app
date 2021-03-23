import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Drinks,
  DrinksDetails,
  DrinksProcess,
  ExploreDrinks,
  ExploreDrinksByIngredient,
  ExploreFoodByIngredient,
  ExploreFoods,
  Explorer,
  FavoritesRecipes,
  FoodDetails,
  FoodProcess,
  Foods,
  FoodsByOrigin,
  Login,
  Profile,
  RecipesMade,
} from './pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/comidas/:receitaID" component={ FoodDetails } />
      <Route exact path="/comidas/:receitaID/in-progress" component={ FoodProcess } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/bebidas/:bebidaID" component={ DrinksDetails } />
      <Route exact path="/bebidas/:bebidaID/in-progress" component={ DrinksProcess } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodByIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ FoodsByOrigin } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

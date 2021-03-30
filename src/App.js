import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Main from './pages/Main';
import Explore from './pages/Explore';
import ExploreMain from './pages/ExploreMain';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreOrigin from './pages/ExploreOrigin';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesDoneAndFavorite from './pages/RecipesDoneAndFavorite';

function App() {
  return (
    <Switch>
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/bebidas/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/comidas/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route path="/explorar/comidas" component={ ExploreMain } />
      <Route path="/explorar/bebidas" component={ ExploreMain } />
      <Route path="/receitas-feitas" component={ RecipesDoneAndFavorite } />
      <Route path="/receitas-favoritas" component={ RecipesDoneAndFavorite } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/bebidas" component={ Main } />
      <Route path="/comidas" component={ Main } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

// AS ROTAS DEVEM SER PADRÃO - ESTÁ NO README
// **Tela de login: /;
// **Tela principal de receitas de comidas: /comidas;
// **Tela principal de receitas de bebidas: /bebidas;
// **Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
// **Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
// **Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
// **Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
// **Tela de explorar: /explorar;
// **Tela de explorar comidas: /explorar/comidas;
// **Tela de explorar bebidas: /explorar/bebidas;
// **Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
// **Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
// **Tela de explorar comidas por local de origem: /explorar/comidas/area;
// **Tela de perfil: /perfil;
// Tela de receitas feitas: /receitas-feitas;
// Tela de receitas favoritas: /receitas-favoritas.

export default App;

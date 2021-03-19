import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/comidas/:id" component={ DetalheComida } />
      <Route path="/bebidas/:id" component={ DetalheBebidas } />
      <Route path="/comidas/:id/in-progress" component={ InProgressComida } />
      <Route path="/bebidas/:id/in-progress" component={ InProgressBebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ Explorar } />
      <Route path="/explorar/bebidas" component={ Explorar } />
      <Route path="/explorar/comidas/ingredientes" component={ Explorar } />
      <Route path="/explorar/bebidas/ingredientes" component={ Explorar } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas;" component={ Receitas } />
      <Route path="/receitas-favoritas" component={ Receitas } />
      <Route path="/" component={ Login } />
      <div className="meals" />
    </BrowserRouter>
  );
}

export default App;

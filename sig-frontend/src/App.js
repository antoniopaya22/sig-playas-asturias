import React from 'react';
import './App.css';
import Header from './components/common/Header';
import { Route, Switch } from 'react-router-dom';
import Inicio from './components/pages/inicio/Inicio';
import Historial from './components/pages/historial/Historial';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Switch>
          <Route path="/" component={Inicio} exact={true}/>
          <Route path="/historial" component={Historial} exact={true}/>
        </Switch>
      </main>
    </>
  );
}

export default App;

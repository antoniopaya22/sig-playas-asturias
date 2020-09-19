import React from 'react';
import './App.css';
import Header from './components/common/Header';
import { Route, Switch } from 'react-router-dom';
import Inicio from './components/pages/Inicio';
import Ocupacion from './components/pages/Ocupacion';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Switch>
          <Route path="/" component={Inicio} exact={true}/>
          <Route path="/ocupacion" component={Ocupacion} exact={true}/>
        </Switch>
      </main>
      <Footer/>
    </>
  );
}

export default App;

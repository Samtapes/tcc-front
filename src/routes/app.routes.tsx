import React from 'react';

import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';

import Home from '../pages/home'
import Navbar from '../pages/navbar'
import ErrorPage from '../pages/error';
import AgendarConfirmar from '../pages/agendar_confirmar';
import Agendar from '../pages/agendar';
import Consultas from '../pages/consultas';


export default function AppRoutes() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/confirmar-agendamento">
          <AgendarConfirmar/>
        </Route>
        <Route path="/agendar">
          <Agendar/>
        </Route>
        <Route path="/consultas">
          <Consultas/>
        </Route>
        <Route path="/">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  )
}
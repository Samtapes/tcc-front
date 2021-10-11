import React, {useEffect} from 'react';

import {
  BrowserRouter as Router,
  Route, 
  Switch,
  useLocation
} from 'react-router-dom';

import Home from '../pages/home'
import ErrorPage from '../pages/error';
import AgendarConfirmar from '../pages/agendar_confirmar';
import Agendar from '../pages/agendar';
import Consultas from '../pages/consultas';
import NavbarLogado from '../pages/navbar_logado';
import Historico from '../pages/historico';
import Obrigado from '../pages/obrigado';
import Config from '../pages/config';


export default function AppRoutes() {

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <Router>
      <ScrollToTop/>
      <NavbarLogado/>
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
        <Route path="/historico">
          <Historico/>
        </Route>
        <Route path="/obrigado">
          <Obrigado/>
        </Route>
        <Route path="/configurações">
          <Config/>
        </Route>
        <Route path="/">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  )
}
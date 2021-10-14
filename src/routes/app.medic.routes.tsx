import React, {useContext, useEffect} from 'react';

import {
  BrowserRouter as Router,
  Route, 
  Switch,
  useLocation
} from 'react-router-dom';

import ErrorPage from '../pages/error';
import AgendarConfirmar from '../pages/agendar_confirmar';
import Agendar from '../pages/agendar';
import Consultas from '../pages/consultas';
import NavbarLogado from '../pages/navbar_logado';
import Historico from '../pages/historico';
import Obrigado from '../pages/obrigado';
import AuthContext from '../contexts/auth';
import Pendendetes from '../pages/home/medic';
import MedicConfig from '../pages/config/medic';
import Confirmadas from '../pages/consultas/medic';


export default function AppMedicRoutes() {

  const {consult} = useContext(AuthContext)

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
          <Pendendetes/>
        </Route>
        
        <Route path="/agendar">
          {consult === undefined || consult === null ?
            <ErrorPage/>
            :
            <Agendar/>
          }
        </Route>
        <Route path="/confirmar-agendamento">
          {consult === undefined || consult === null ?
            <ErrorPage/>
            :
            <AgendarConfirmar/>
          }
        </Route>

        <Route path="/consultas">
          <Confirmadas/>
        </Route>
        <Route path="/historico">
          <Historico/>
        </Route>
        <Route path="/obrigado">
          <Obrigado/>
        </Route>
        <Route path="/configurações">
          <MedicConfig/>
        </Route>
        <Route path="/">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  )
}
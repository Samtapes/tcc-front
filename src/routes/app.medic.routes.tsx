import React, {useContext, useEffect, useState} from 'react';

import {
  BrowserRouter as Router,
  Route, 
  Switch,
  useLocation
} from 'react-router-dom';

import ErrorPage from '../pages/error';
import AgendarConfirmar from '../pages/agendar_confirmar';
import Agendar from '../pages/agendar';
import NavbarLogado from '../pages/navbar_logado';
import Historico from '../pages/historico';
import Obrigado from '../pages/obrigado';
import AuthContext from '../contexts/auth';
import Pendendetes from '../pages/home/medic';
import MedicConfig from '../pages/config/medic';
import Confirmadas from '../pages/consultas/medic';
import PreChamada from '../pages/pre_chanada';
import Chamada from '../pages/chamada';
import Footer from '../pages/footer'


export default function AppMedicRoutes() {

  const {consult, consultMeet} = useContext(AuthContext)
  const [showNav, setShowNav] = useState(true)

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      if(pathname === '/consulta/' + consultMeet?.id){
        setShowNav(false)
      } else {
        setShowNav(true)
      }
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <Router>
      <ScrollToTop/>
      {showNav ?
        <NavbarLogado/>
        :
        <></>
      }
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
        <Route path="/prechamada">
          {consultMeet === undefined || consultMeet === null ?
            <ErrorPage/>
            :
            <PreChamada/>
          }
        </Route>
        <Route path="/consulta/:consult_id">
          {consultMeet === undefined || consultMeet === null ?
            <ErrorPage/>
            :
            <Chamada/>
          }
        </Route>
        <Route path="/">
          <ErrorPage/>
        </Route>
      </Switch>
      {showNav ?
        <Footer/>
        :
        <></>
      }
    </Router>
  )
}
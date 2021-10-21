import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import Login from '../pages/Login'
import Navbar from '../pages/navbar'
import Register from '../pages/Register_patient';
import RegisterMedic from '../pages/Register_medic';
import IndexAuth from '../pages/index_auth';
import ErrorPage from '../pages/error';
import Footer from '../pages/footer';

export default function AuthRoutes() {

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
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <IndexAuth/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/cadastro-paciente">
          <Register/>
        </Route>
        <Route path="/cadastro-medico">
          <RegisterMedic/>
        </Route>
        <Route path="/">
          <ErrorPage/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  )
}
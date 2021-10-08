import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Login from '../pages/Login'
import Navbar from '../pages/navbar'
import Register from '../pages/Register_patient';
import RegisterMedic from '../pages/Register_medic';
import IndexAuth from '../pages/index_auth';
import ErrorPage from '../pages/error';

export default function AuthRoutes() {
  return (
    <Router>
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
    </Router>
  )
}
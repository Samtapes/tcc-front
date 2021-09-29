import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Login from '../pages/Login'
import Navbar from '../pages/navbar'
import Register from '../pages/Register';

export default function AuthRoutes() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/cadastro-paciente">
          <Register/>
        </Route>
      </Switch>
    </Router>
  )
}
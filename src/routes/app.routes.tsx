import React from 'react';

import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';

import Home from '../pages/home'
import Navbar from '../pages/navbar'


export default function AppRoutes() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  )
}
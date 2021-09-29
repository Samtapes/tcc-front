import React from 'react';

import AuthRoutes from './auth.routes'
// import AppRoutes from './auth.routes'
import Footer from '../pages/footer'

export default function Routes(){
  return(
    <>
      <AuthRoutes/>
      <Footer/>
    </>
  )
}
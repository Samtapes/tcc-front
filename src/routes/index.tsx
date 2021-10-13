import React, { useContext } from 'react';


import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import Footer from '../pages/footer'
import AuthContext from '../contexts/auth'
import AppMedicRoutes from './app.medic.routes';


export default function Routes(){
  const {signed, user} = useContext(AuthContext);

  return(
    <>
      {signed ?
        user?.is_medic ?
            <AppMedicRoutes/>
          :
            <AppRoutes/>
        :
        <AuthRoutes/>
      }
      <Footer/>
    </>
  )
}
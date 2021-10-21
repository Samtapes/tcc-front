import React, { useContext, useEffect, useState } from 'react';


import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import AuthContext from '../contexts/auth'
import AppMedicRoutes from './app.medic.routes';

// import {connect} from 'socket.io-client'


export default function Routes(){
  const {signed, user} = useContext(AuthContext);
  // const [socket, setSocket] = useState({})

  // useEffect(() => {
    // setSocket(connect('http://localhost:3333', { transports : ['websocket'] }))
  // }, [socket]) 

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
    </>
  )
}
import React, { useContext } from 'react';

import Time from '../../static/images/time.svg'
import Calendar from '../../static/images/calendar.svg'

import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/auth';

export default function Obrigado() {

  const {consult, removeConsult} = useContext(AuthContext)

  const formatedDay = consult?.consult.date?.day !== undefined ? consult?.consult.date?.day < 10 ? '0' + String(consult?.consult.date?.day) : consult?.consult.date?.day : ''
  const formatedMonth = consult?.consult.date?.month !== undefined ? consult?.consult.date?.month+1 < 10 ? '0' + String(consult?.consult.date?.month + 1) : consult?.consult.date?.month + 1 : ''

  return (
    <div className="container-fluid  gradient-custom py-5 " style={{height: "100vh"}}>

      <div className="container text-center " style={{marginTop: "33vh"}}>
        <h1 className="text-center text-light">Obrigado por agendar sua consulta!</h1>

        <div className="row my-5 ">
          <div className=" col-6 text-end">
            <h2 className="text-light"><img className="m-auto"
              src={Calendar}
              height="75"
              alt=""
              loading="lazy"
              style={{marginTop: "-1px;"}}
            /> {formatedDay}/{formatedMonth}</h2>
          </div>

          <div className="col-6 text-start ">
            <h2 className="text-light">
            <img
              src={Time}
              height="75"
              alt=""
              loading="lazy"
              style={{marginTop: "-1px;"}}
            /> {consult?.consult.scheduled_time}
            </h2>
          </div>
        </div>

        <Link to='/consultas' onClick={removeConsult} className="text-center btn rounded btn-light mb-4 "><i className="fab fa-google mx-2"></i>Retornar à página principal</Link>
      </div>
    </div>
  )
}
import React from 'react';

import Time from '../../static/images/time.svg'
import Calendar from '../../static/images/calendar.svg'

import {Link} from 'react-router-dom'

export default function Obrigado() {
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
            /> 12/12</h2>
          </div>

          <div className="col-6 text-start ">
            <h2 className="text-light">
            <img
              src={Time}
              height="75"
              alt=""
              loading="lazy"
              style={{marginTop: "-1px;"}}
            /> 12:00
            </h2>
          </div>
        </div>

        <Link to='/consultas' className="text-center btn rounded btn-light mb-4 "><i className="fab fa-google mx-2"></i>Retornar à página principal</Link>
      </div>
    </div>
  )
}
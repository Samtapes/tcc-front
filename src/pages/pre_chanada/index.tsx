import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import './index.css'

export default function PreChamada() {
  const {consultMeet} = useContext(AuthContext)

  return(
    <div className="container-fluid gradient-custom p-5 mt-5" style={{height:"100vh"}}>

    <h1 className="text-center text-light  px-5 mt-5">Consulta com {consultMeet?.name}</h1>
    <div className="container-camera text-right p-5 bg-light rounded my-5" >
      <div style={{height: "300px"}}>
      </div>
    </div>
    <div className="container-camera text-right p-4 bg-light rounded my-5" >
      <div className="row">
        <div className="col-4 "><h5 className="">mutar</h5></div>
        <div className="col-4 "><h5 className="">ligar camera</h5></div>
        <div className="col-4 ">
          <div className="text-end my-auto">
            <button className=" m-0 btn btn-sm btn-rounded btn-blue">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
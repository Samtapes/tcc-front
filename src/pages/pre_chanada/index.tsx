import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import './index.css'

import { useHistory } from 'react-router-dom';

import {BiVideoOff} from 'react-icons/all'
import api from '../../services/api';

export default function PreChamada() {
  const {consultMeet, user, removeConsultMeet} = useContext(AuthContext)
  const history = useHistory()

  function handleCreateMeet() {

    console.log(consultMeet?.finished_at)

    if(consultMeet?.started_at !== null && (consultMeet?.finished_at === null || consultMeet?.finished_at === undefined) ){
      history.push('/consulta/' + consultMeet?.id)
    }

    else if(consultMeet?.started_at === null && consultMeet?.finished_at === null){
      api.put('/consult/' + consultMeet?.id + '/start', {}, {headers: {'Authorization': user?.id}}).then(response => {
        history.push('/consulta/' + consultMeet?.id)
      }).catch(err => {
        alert(err.response.data.message)
      })
    }

    else {
      alert('Não é possível entrar em uma consulta já finalizada')
    }

  }

  function handleGoBack() {
    removeConsultMeet()
    history.goBack()
  }

  return(
    <div className="container-fluid gradient-custom p-5 mt-5" style={{height:"100vh"}}>
    <button onClick={handleGoBack} className="m-0 btn text-light">{'< Voltar'}</button>
    <h1 className="text-center text-light  px-5 mt-5">Consulta com {consultMeet?.name}</h1>
    <div className="container-camera text-right p-5 rounded my-5" style={{backgroundColor: '#1B1464'}} >
      <div className="d-flex" style={{height: "300px", backgroundColor: '#1B1464', textAlign: 'center', justifyContent: 'center', alignContent: 'center'}}>
        <BiVideoOff size={150} color='white'/>
      </div>
    </div>
    <div className="container-camera text-right p-4 bg-light rounded my-5" >
      <div className="row">
        <div className="col-4 "><h5 className="">mutar</h5></div>
        <div className="col-4 "><h5 className="">ligar camera</h5></div>
        <div className="col-4 ">
          <div className="text-end my-auto">
            <button onClick={handleCreateMeet} className="m-0 btn btn-sm btn-rounded btn-blue button">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
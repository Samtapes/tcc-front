import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import './index.css'
import {FaVideo, FaMicrophone} from 'react-icons/fa'
import Switch from 'react-switch'



import { useHistory } from 'react-router-dom';

import {BiVideoOff} from 'react-icons/all'
import api from '../../services/api';

export default function PreChamada() {
  const {consultMeet, user, removeConsultMeet} = useContext(AuthContext)
  const history = useHistory()

  const [openCamera, setOpenCamera] = useState(false)
  const [openMic, setOpenMic] = useState(false)

  function handleCreateMeet() {
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
  <div className="container-fluid gradient-custom p-5" style={{height:"100vh"}}>
    <button onClick={handleGoBack} className="m-0 btn text-light">{'< Voltar'}</button>
    <h1 className="text-center text-light  px-5 mt-5">Consulta com {consultMeet?.name}</h1>
    <div className="container-camera text-right p-5 rounded my-5" style={{backgroundColor: '#1B1464'}} >
      <div className="container-camera-icon">
        <BiVideoOff size={150} color='white' style={{alignSelf: 'center'}}/>
      </div>
    </div>
    <div className="container-camera text-right p-4 bg-light rounded my-5" >

      <div className='d-flex'>
        <div className='d-flex'>
          <FaVideo className='mx-3' size={35} color={openCamera ? '#00EDBC' : '#EB4335'}/>
          <Switch onChange={event => setOpenCamera(event)} checked={openCamera} onColor='#00EDBC' offColor='#EB4335' uncheckedIcon={false} checkedIcon={false}/>
        </div>

        <div className='d-flex mx-3'>
          <FaMicrophone size={35} color={openMic ? '#00EDBC' : '#EB4335'}/>
          <Switch onChange={event => setOpenMic(event)} checked={openMic} onColor='#00EDBC' offColor='#EB4335' uncheckedIcon={false} checkedIcon={false}/>
        </div>
      </div>

      <button onClick={handleCreateMeet} className="m-0 btn btn-sm btn-rounded btn-blue button">Entrar</button>

    </div>
  </div>
  )
}
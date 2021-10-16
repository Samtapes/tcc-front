import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';

import Switch from 'react-switch'
import './index.css'

import {FaVideo, FaMicrophone, FaArrowRight} from 'react-icons/fa'

export default function Chamada() {
  const {consultMeet, user} = useContext(AuthContext)

  const [openCamera, setOpenCamera] = useState(false)
  const [openMic, setOpenMic] = useState(false)

  function handleFinishConsult(){

  }

  return (
    <div className="container-fluid gradient-custom p-0">
      <div className="consult-container">
        <div className="consult-cam-container">
          <div className='consult-othercam' style={{backgroundImage: 'url(' + consultMeet?.image_url + ')'}}></div>
          <div className='consult-yourcam' style={{backgroundImage: 'url(' + user?.image_url + ')'}}></div>
          <div className='consult-options'>

            <div className='d-flex'>
              <div className='d-flex'>
                <FaVideo className='mx-3' size={35} color={openCamera ? '#00EDBC' : '#EB4335'}/>
                <Switch onChange={event => setOpenCamera(event)} checked={openCamera} onColor='#00EDBC' offColor='#EB4335' uncheckedIcon={false} checkedIcon={false}/>
              </div>

              <div className='d-flex'>
                <FaMicrophone className='mx-3' size={35} color={openMic ? '#00EDBC' : '#EB4335'}/>
                <Switch onChange={event => setOpenMic(event)} checked={openMic} onColor='#00EDBC' offColor='#EB4335' uncheckedIcon={false} checkedIcon={false}/>
              </div>
            </div>

            <button onClick={handleFinishConsult} className="btn btn-finish-consult">Encerrar</button>
          </div>
        </div>

        <div className='messages-container'>
          <div className='chat-info-container'>
            <button className="btn py-0">
              <FaArrowRight color='#0166DA' size={28}/>
            </button>

            <p className='chat-info-text'>Conversa com o {consultMeet?.name}</p>
          </div>

          <div className='chat-messages-container'>
            <div className='your-message'>
              <p className='m-0'>Está me ouvindo?</p>
            </div>

            <div className='other-message'>
              <p>Sim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
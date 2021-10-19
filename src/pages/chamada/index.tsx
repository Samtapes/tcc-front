import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';

import Switch from 'react-switch'
import './index.css'

import {FaVideo, FaMicrophone, FaArrowRight} from 'react-icons/fa'
import {BiSend, BiPaperclip, BiChat} from 'react-icons/bi'
import api from '../../services/api';
import {useHistory} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'

export default function Chamada() {
  const {consultMeet, user, removeConsultMeet} = useContext(AuthContext)
  const history = useHistory()

  const [openCamera, setOpenCamera] = useState(false)
  const [openMic, setOpenMic] = useState(false)
  const [message, setMessage] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [openChat, setOpenChat] = useState(true)

  function handleFinishConsult(){
    if(user?.is_medic){
      api.put('/consult/' + consultMeet?.id + '/finish', {}, {headers: {'Authorization': user?.id}}).then((response) => {
        removeConsultMeet();
        history.push('/historico')
      }).catch((err) => {
        alert(err.response.data.message)
      })
    } else {
      removeConsultMeet();
      history.push('/historico')
    }
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

            <button onClick={() => setModalShow(true)} className="btn btn-finish-consult">{user?.is_medic ? 'Encerrar' : 'Sair'}</button>
          </div>
        </div>

        <button className='btn chat-btn' style={{display: !openChat ? 'flex' : 'none'}} onClick={() => setOpenChat(true)}>
          <BiChat color='#0166DA' size={50}/>
        </button>

        <div className='messages-container' style={{display: openChat ? 'flex' : 'none'}}>
          <div className='chat-info-container'>
            <button className="btn py-0" onClick={() => setOpenChat(false)}>
              <FaArrowRight color='#0166DA' size={28}/>
            </button>

            <p className='chat-info-text'>Conversa com o {consultMeet?.name}</p>
          </div>

          <div className='chat-messages-container'>

            <div className='your-message'>
              <div className='your-message-info'>
                <p className='your-message-name'>Você</p>
                <div className='your-message-image' style={{backgroundImage: 'url(' + user?.image_url + ')'}}/>
              </div>
              <p className='your-message-text'>Opa</p>
            </div>

            <div className='your-message'>
              {/* <div className='your-message-info'>
                <p className='your-message-name'>Você</p>
                <div className='your-message-image' style={{backgroundImage: 'url(' + user?.image_url + ')'}}/>
              </div> */}
              <p className='your-message-text'>Está me ouvindo?</p>
            </div>

            <div className='other-message'>
              <div className='other-message-info'>
                <div className='other-message-image' style={{backgroundImage: 'url(' + consultMeet?.image_url + ')'}}/>
                <p className='other-message-name'>{consultMeet?.name}</p>
              </div>
              <p className='other-message-text'>Sim</p>
            </div>

          </div>

          <div className='send-message-container'>
            <input className='send-message-input' placeholder='Digite aqui...' value={message} onChange={event => setMessage(event.target.value)}/>

            <button className="btn p-0">
              <BiPaperclip style={{transform: 'rotate(135deg)'}} color='#0166DA' size={28}/>
            </button>

            <button className="btn p-0">
              <BiSend color='#0166DA' size={28}/>
            </button>
          </div>
        </div>
      </div>

      <Modal size='sm' centered show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Body>
          {user?.is_medic ?
            <p className='text-center mt-3'>Deseja mesmo encerrar a consulta?</p>
            :
            <p className='text-center mt-3'>Deseja mesmo sair da consulta?</p>
          }
          
            
          <div className='modal-finish-consult-btns'>
            <button onClick={() => setModalShow(false)} className="btn modal-btn-cancel-finish-consult">Ficar</button>
            <button onClick={handleFinishConsult} className="btn btn-finish-consult">{user?.is_medic ? 'Encerrar' : 'Sair'}</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
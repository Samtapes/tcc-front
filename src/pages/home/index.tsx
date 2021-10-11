import React, { useContext, useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Star from '../../static/images/star.svg';
import Coracao from '../../static/images/coracao.svg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import api from '../../services/api';

import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../contexts/auth';

interface Medic {
  id: string,
  image_url: string,
  name: string,
  specialization: string,
  price: number,
  description: string,
  additional_info: string,
  start_of_work: string,
  end_of_work: string
}

interface IDate {
  day: number,
  month: number,
  year: number,
}

interface Consult {
  date: IDate,
  scheduled_time: string,
  additional_info: string | undefined
}

export default function Home() {

  const [medics, setMedics] = useState([]);
  const [page, setPage] = useState(0);
  const [specializations, setSpecializations] = useState([]);
  const [especializacao, setEspecializacao] = useState('');
  const [medicModal, setMedicModal] = useState(false);

  // Getting medics and specializations
  useEffect(() => {
    api.get('/medics/'+page+'?specialization_name='+especializacao).then((response) => {
      setMedics(() => response.data);
    }).catch((error) => {
      alert(error?.response.data.message);
    })

    api.get('/specializations').then((response) => {
      setSpecializations(() => response.data);
    }).catch((error) => {
      alert(error?.response.data.message);
    })
  }, [page, especializacao]);

  const [medic, setMedic] = useState<any>({})

  // Get medic consult info
  async function handleGetConsultInfo(medic_id: any) {
    
    try {
      const response = await api.get('/medic/consult_configuration', {headers: {Authorization: medic_id}})
      setTime(actualTime())
      setMedicModal(() => true)
      setMedic(response.data)

    } catch(error: any) {
      alert(error?.response.data.message)
    }
  }

  const d = new Date();

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const [consultDate, setConsultDate] = useState({day: d.getDate(), month: d.getMonth(), year: d.getFullYear()})

  // Change consult day
  function handleChangeConsultDay(method: any) {
    console.log(consultDate.month)

    if(consultDate.day < new Date(2021, consultDate.month+1, 0).getDate() && method === 'add') {
      setConsultDate(prevState => ({...prevState, day: prevState.day+1}))
    }

    else if(consultDate.day === new Date(2021, consultDate.month+1, 0).getDate() && method === 'add' && consultDate.month+1 !== 12) {
      setConsultDate(prevState => ({...prevState, day: 1, month: prevState.month+1}))
    }

    else if(consultDate.day === new Date(2021, consultDate.month+1, 0).getDate() && method === 'add' && consultDate.month+1 === 12) {
      setConsultDate(prevState => ({...prevState, day: 1, month: 0, year: prevState.year+1}))
    }

    else if(consultDate.day === 1 && method === 'decrease' && consultDate.month+1 !== 1) {
      setConsultDate(prevState => ({...prevState, day: new Date(2021, prevState.month, 0).getDate(), month: prevState.month-1}))
    }

    else if(consultDate.day === 1 && method === 'decrease' && consultDate.month+1 === 1) {
      setConsultDate(prevState => ({...prevState, day: new Date(2021, prevState.month, 0).getDate(), month: 11}))
    }

    else if(consultDate.day === new Date().getDate() && method === 'decrease' && consultDate.month === new Date().getMonth()){

    }

    else{
      setConsultDate(prevState => ({...prevState, day: prevState.day-1}))
    }
  }

  // Compare dates
  function compareDates(){
    if (consultDate.day === d.getDate() && consultDate.month === d.getMonth()) {
      return 'Hoje'
    } else if (consultDate.day - 1 === d.getDate() && consultDate.month === d.getMonth()) {
      return 'Amanhã'
    } else {
      return ''
    }
  }

  // Get actual time
  function actualTime(){
    let hours = String(d.getHours());
    let minutes = String(d.getMinutes())

    if (parseInt(hours) < 10) {
      hours = '0' + String(hours)
    }

    if (parseInt(minutes) < 10) {
      minutes = '0' + String(minutes)
    }

    return hours + ':' + minutes
  }

  const [time, setTime] = useState(actualTime())

  const {newConsult} = useContext(AuthContext)
  
  const history = useHistory()

  function handleNewConsult(medic: Medic, consult: Consult){
    newConsult(medic, consult)
    history.push('/agendar')
  }

  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 text-center">
          <h1>Bem vindo, User!</h1>
          <p>Pronto pra agendar sua consulta?</p>
        </div>
      </div>

      <div className="container meio-verde text-center shadow text-black-50 border mx-auto rounded bg-light my-5 py-5" >

        <div className="row">
          <div className="col-3 px-4 my-auto">
            <select value={especializacao} className="form-select text-black-50 bg-light " aria-label="Default select example" onChange={event => setEspecializacao(event.target.value)}>
              <option selected value="Especialização">Especialização</option>
              {specializations.map((specialization: any) => (
                <option key={specialization.id} value={specialization.name}>{specialization.name}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {medics.length >= 1 ? medics.map((medic: any) => (
        <div key={medic.id} className="container py-5 d-flex flex-row shadow bg-light p-4 container border my-5" style={{maxWidth: '600px', borderRadius: '15px'}}>

            <div className="">
              <img className="rounded " src={medic.image_url} alt="" height="130"/>
            </div>

            <div className="mx-4 w-100">
              <h5>{medic.name}</h5>
              <h6 className="text-black-50">{medic.specialization}</h6>
              <h6><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/></h6>

              <div className="d-flex flex-row last-row">

                <div className="me-auto">
                  <div className="text-end">
                    <button type="button" className="button" onClick={() => handleGetConsultInfo(medic.id)}>
                      <p className="my-auto text-center ">Ver mais</p>
                    </button>
                  </div>
                </div>

                <div className="my-auto">
                  <div className="text-end">
                    <Link to="/"> <img className="text-end" src={Coracao} alt=""/></Link>
                  </div>
                </div>
              </div>

            </div>
        </div>
      )) :
        <h5 className='text-center my-5'>Não há médicos dessa especialização cadastrados nesse serviço</h5>
      }

      <Modal size="lg" show={medicModal} onHide={() => {setMedicModal(() => false); setConsultDate({day: d.getDate(), month: d.getMonth(), year: d.getFullYear()})}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Médico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div key={medic.id} className="d-flex flex-row">
            <div className="d-flex flex-row p-4" style={{maxWidth: '600px'}}>

              <div style={{width: '200px'}}>
                <img className="rounded " src={medic.image_url} alt="" height="130"/>
                <h6 className="my-2"><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/></h6>
              </div>

              <div className="mx-2 w-100">
                <h5>{medic.name}</h5>
                <h6 className="text-black-50">{medic.specialization}</h6>
                <h6 className="text-black-50">{medic.description}</h6>
                <h6>{medic.additional_info}</h6>
                <Link to="/"> <img className="text-end" src={Coracao} alt=""/></Link>
              </div>
            </div>

            <div style={{height: '300px', width: '1px', backgroundColor: 'lightgray'}}></div>

            <div className="d-flex flex-column text-center mx-5">

              <div className='d-flex flex-row my-3'>
                <button className="modal-day-button" onClick={() => handleChangeConsultDay('decrease')}>
                  <FaArrowLeft color='#0166DA' size='20px'/>
                </button>

                <div>
                  <h6>{consultDate.day} de {months[consultDate.month]}</h6>
                  <p>{compareDates()}</p>
                </div>

                <button className="modal-day-button" onClick={() => handleChangeConsultDay('add')}>
                  <FaArrowRight color='#0166DA' size='20px'/>
                </button>
              </div>

              <input type="time" value={time} onChange={event => setTime(event.target.value)}/>

              <p className="my-3">R${medic.price}</p>

              <p>Transferência bancária</p>

              <div className="text-center">
                <button type="button" className="button" onClick={() => handleNewConsult(medic, {date: consultDate, scheduled_time: time, additional_info: undefined})}>
                  Agendar
                </button>
              </div>
            </div>

          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}
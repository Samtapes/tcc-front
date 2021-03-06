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

  const [openDays, setOpenDays] = useState([])
  const [openInThisDay, setOpenInThisDay] = useState(false)

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
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(consultDate.month+1) + '/' + consultDate.day)
      const response = await api.get('/medic/consult_configuration', {headers: {Authorization: medic_id}})
      setTime(getActualTime())
      setMedicModal(() => true)
      setMedic(response.data)

    } catch(error: any) {
      alert(error?.response.data.message)
    }
  }

  const d = new Date();

  const months = ['Janeiro', 'Fevereiro', 'Mar??o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const [consultDate, setConsultDate] = useState({day: d.getDate(), month: d.getMonth(), year: d.getFullYear()})

  // Change consult day
  async function handleChangeConsultDay(method: any, medic_id: any) {
    // Aumentar o dia da consulta se n for o ultimo dia do m??s
    if(consultDate.day < new Date(2021, consultDate.month+1, 0).getDate() && method === 'add') {
      setConsultDate(prevState => ({...prevState, day: prevState.day+1}))
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(consultDate.month+1) + '/' + Number(consultDate.day+1))
    }

    // Aumentar o m??s da consulta caso seja o ??ltimo dia do m??s
    else if(consultDate.day === new Date(2021, consultDate.month+1, 0).getDate() && method === 'add' && consultDate.month+1 !== 12) {
      setConsultDate(prevState => ({...prevState, day: 1, month: prevState.month+1}))
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(consultDate.month+2) + '/' + 1)
    }

    // Aumentar o m??s da consulta e retornar ao dia 1 caso seja o ??ltimo dia do ??ltimo m??s
    else if(consultDate.day === new Date(2021, consultDate.month+1, 0).getDate() && method === 'add' && consultDate.month+1 === 12) {
      setConsultDate(prevState => ({...prevState, day: 1, month: 0, year: prevState.year+1}))
      checkMedicOpenInThisDay(medic_id, Number(consultDate.year+1) + '/' + Number(1) + '/' + 1)
    }

    // Ir para o ??ltimo dia do m??s anterior caso subtraia no ??ltimo dia do m??s
    else if(consultDate.day === 1 && method === 'decrease' && consultDate.month+1 !== 1) {
      setConsultDate(prevState => ({...prevState, day: new Date(2021, prevState.month, 0).getDate(), month: prevState.month-1}))
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(consultDate.month) + '/' + new Date(2021, consultDate.month, 0).getDate())
    }

    // Ir para o ??ltimo dia do ??ltimo m??s caso subtraia de 1 de Janeiro
    else if(consultDate.day === 1 && method === 'decrease' && consultDate.month+1 === 1) {
      setConsultDate(prevState => ({...prevState, day: new Date(2021, prevState.month, 0).getDate(), month: 11}))
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(11) + '/' + new Date(2021, consultDate.month, 0))
    }

    // Fazer nada caso tente subtrair do dia atual
    else if(consultDate.day === new Date().getDate() && method === 'decrease' && consultDate.month === new Date().getMonth()){

    }

    // Caso contr??rio, subtrai?? 1 dia
    else{
      setConsultDate(prevState => ({...prevState, day: prevState.day-1}))
      checkMedicOpenInThisDay(medic_id, consultDate.year + '/' + Number(consultDate.month+1) + '/' + Number(consultDate.day-1))
    }

  }

  function compareDates(){
    if (consultDate.day === d.getDate() && consultDate.month === d.getMonth()) {
      return 'Hoje'
    } else if (consultDate.day - 1 === d.getDate() && consultDate.month === d.getMonth()) {
      return 'Amanh??'
    } else {
      return ''
    }
  }

  function getActualTime(){
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

  const [time, setTime] = useState(getActualTime())

  const {newConsult, user} = useContext(AuthContext)
  
  const history = useHistory()

  function handleNewConsult(medic: Medic, consult: Consult){
    newConsult(medic, consult)
    history.push('/agendar')
  }

  async function checkMedicOpenInThisDay(medic_id: any, consult_date: any) {
    try {
      const openDaysReponse = await api.get('/medic/open_days', {headers: {Authorization: medic_id}})
      setOpenDays(openDaysReponse.data)
  
      setOpenInThisDay(false)
      openDaysReponse.data.map((openDay: any) => {
        if(openDay.date === consult_date){
          setOpenInThisDay(true)
        }
      })
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 text-center">
          <h1>Bem vindo, {user?.name}!</h1>
          <p>Pronto pra agendar sua consulta?</p>
        </div>
      </div>

      <div className="container meio-verde text-center shadow text-black-50 border mx-auto rounded bg-light my-5 py-5" >

        <div className="row">
          <div className="col-3 px-4 my-auto">
            <select value={especializacao} className="form-select text-black-50 bg-light " aria-label="Default select example" onChange={event => setEspecializacao(event.target.value)}>
              <option selected value="Especializa????o">Especializa????o</option>
              {specializations.map((specialization: any) => (
                <option key={specialization.id} value={specialization.name}>{specialization.name}</option>
              ))}
            </select>
          </div>

          <div className="col-8 px-4 my-auto">
            <input className="search-bar text-black-50 bg-light " type="text"/>
          </div>

        </div>

      </div>

      

       

        <div className="container ">
          <div className="row container">
          {medics.length >= 1 ? medics.map((medic: any) => (
          <div key={medic.id} className=" col-6 mx-auto d-flex flex-row shadow bg-light border p-4  my-5" style={{ maxWidth: '600px', borderRadius: '15px'}}>

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
        <h5 className='text-center my-5'>N??o h?? m??dicos dessa especializa????o cadastrados nesse servi??o</h5>
      }
      </div>

</div>

      <Modal size="lg" show={medicModal} onHide={() => {setMedicModal(() => false); setConsultDate({day: d.getDate(), month: d.getMonth(), year: d.getFullYear()})}} centered>
        <Modal.Header closeButton>
          <Modal.Title>M??dico</Modal.Title>
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
                <button className="modal-day-button" onClick={() => handleChangeConsultDay('decrease', medic.id)}>
                  <FaArrowLeft color='#0166DA' size='20px'/>
                </button>

                <div>
                  <h6 style={{color: openInThisDay ? 'green' : 'red'}}>{consultDate.day} de {months[consultDate.month]}</h6>
                  <p>{compareDates()}</p>
                </div>

                <button className="modal-day-button" onClick={() => handleChangeConsultDay('add', medic.id)}>
                  <FaArrowRight color='#0166DA' size='20px'/>
                </button>
              </div>

              <input type="time" value={time} onChange={event => setTime(event.target.value)}/>

              <p className="my-3">R${medic.price}</p>

              <p>Transfer??ncia banc??ria</p>

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
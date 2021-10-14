import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

import Load from '../../static/images/load.svg'
import './index.css'

interface IConsult {
  id: string,
  confirmed: boolean,
  specialization: string, 
  image_url: string,
  name: string,
  additional_info: string,
  date: string,
  scheduled_time: string,
}

export default function Pendendetes() {

  const [consults, setConsults] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    api.get('/consult/pendentes', {headers:{'Authorization': user?.id}}).then((response) => {
      setConsults(response.data);
    }).catch((error: any) => {
      alert(error.response.data.message)
    })
  }, [user])

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const days = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo']


  function handleConfirmConsult(consult_id: string) {
    api.patch('/consult/' + consult_id, {confirmation: true}, {headers:{'Authorization': user?.id}}).then(response => {
      api.get('/consult/pendentes', {headers:{'Authorization': user?.id}}).then((response) => {
        setConsults(response.data);
      }).catch((error: any) => {
        alert(error.response.data.message)
      })
    }).catch(err => {
      alert(err.response.data.message)
    })
  }

  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 text-center">
          <h1>Bem vindo, User!</h1>
          <p>Pronto para realizar sua consulta?</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {consults.length >= 1 ? consults.map((consult: IConsult) => (
            <div key={consult.id} className="col-lg-5 col-sm-12 my-4 shadow bg-light p-4 container rounded border">
              <div className="row">
                <div className="col-8">
                  <div className="row">

                    <div className="col-4 ">
                      <img className="rounded " src={consult.image_url} alt="" height="100"/>
                    </div>
                                  
                    <div className="col-8 ">
                      <h5>{consult.name}</h5>
                    </div>
                  </div>
                  
                  <h6 className="mt-3">Informações Adicionais:</h6>
                  <p className="text-black-50">{consult.additional_info}</p>
                </div>

                <div className="col-4">
                  <div className="row">

                    <div className="col-1">
                      <div className="hr-vertical"></div>
                    </div>

                    <div className="col-10 text-center my-auto">
                      <h6>{consult.date[consult.date.length-2] + consult.date[consult.date.length-1]} de {months[parseInt(consult.date[consult.date.length-5] + consult.date[consult.date.length-4])-1]}</h6>
                      <h6 className="text-black-50">{days[ new Date(2021, parseInt(consult.date[consult.date.length-5] + consult.date[consult.date.length-4])-1, parseInt(consult.date[consult.date.length-2] + consult.date[consult.date.length-1])-1).getDay()]}</h6>
                      <p className="border rounded text-black-50">{consult.scheduled_time}</p>
                      <button className=" m-0 btn btn-sm btn-rounded btn-blue button" onClick={() => handleConfirmConsult(consult.id)}>Confirmar</button>
                      <button className=" m-0 btn btn-sm btn-rounded btn-blue button">Trocar Horário</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )) : 
            <div className="container text-center text-black-50 py-5">
              <img src={Load}  alt=""/>
              <h2 className="my-5">Parece que você não tem uma nova consulta no momento... <br/> Aguarde uma e retorne aqui para visualizá-la!</h2>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
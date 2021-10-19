import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth";

import {useHistory} from 'react-router-dom'
import api from "../../services/api";
import Load from '../../static/images/load.svg'


interface IConsult {
  id: string,
  confirmed: boolean,
  specialization: string, 
  image_url: string,
  name: string,
  additional_info: string,
  date: string,
  scheduled_time: string,
  started_at: string,
  finished_at: string,
}

export default function Historico(){

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const days = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo']

  const [consults, setConsults] = useState([])
  const {user, newConsultMeet} = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    api.get('/consult/finalizadas', {headers:{'Authorization': user?.id}}).then((response) => {
      setConsults(response.data);
    }).catch((error: any) => {
      alert(error.response.data.message)
    })
  }, [user])

  return(
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
            <div className="col-lg-5 col-sm-12 my-4 shadow bg-light p-4 container   rounded border">
              <div key={consult.id} className="row">
                <div className="col-8">
                  <div className="row">
                    <div className="col-4 ">
                      <img className="rounded " src={consult.image_url} alt="" height="100"/>
                    </div>

                    <div className="col-8 my-auto ">
                      <h5>{consult.name}</h5>
                      <h6 className="text-black-50">{consult.specialization}</h6>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="  btn btn-sm btn-rounded btn-blue">Chat</button>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row">

                    <div className="col-1">
                      <div className="hr-vertical-historico"></div>
                    </div>

                    <div className="col-10 text-center my-auto">
                      <h6>{consult.date[8] + consult.date[9]} de {months[parseInt(consult.date[5] + consult.date[6])-1]} às {consult.scheduled_time}</h6>
                      <h6 className="text-black-50">2 semanas atrás</h6>
                      <button className=" m-0 btn btn-sm btn-rounded btn-blue button">Avaliar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : 
          <div className="container text-center text-black-50 py-5">
            <img src={Load}  alt=""/>
            <h2 className="my-5">Parece que você não agendou uma consulta ainda... <br/> Agende uma e retorne aqui para visualizá-la!</h2>
          </div>
          }

        </div>
      </div>
    </div>
  )
}
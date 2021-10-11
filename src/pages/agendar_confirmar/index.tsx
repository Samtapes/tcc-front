import React, { useContext } from 'react';

import {Link, useHistory} from 'react-router-dom';

import Clock from '../../static/images/clock.svg'
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

export default function AgendarConfirmar() {

  const {consult, user} = useContext(AuthContext)

  const history = useHistory()

  function handleBack() {
    history.goBack()
  }

  async function handleSubmit() {
    try {
      const response = await api.post('/consult/' + consult?.medic.id, {date: consult?.consult.date, scheduled_time: consult?.consult.scheduled_time, additional_info: consult?.consult.additional_info}, {headers: {'Authorization': user?.id}})
      history.push('/obrigado')
    } catch(error: any) {
      alert(error.response.data.message)
    }
  }

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return (
    <div className="container-fluid  gradient-custom py-5 " style={{height: "100vh" }}>
      <div className="container  px-5 " style={{marginTop: "20vh"}}>
        <div className="row my-5 ">

          <div className=" col-9 ">
            <div className="container p-5  bg-light rounded">
              <h4 className="text-start ">Código de Confirmação:</h4>

              <div className=" text-black-50 form-outline mb-2">
                <input type="number" id="form3Example3" className="form-control p-2" placeholder="Insira o código enviado ao número de celular designado préviamente" />
              </div>

              <div className="text-end mb-4">
                <Link  to="/confirmar-agendar">Não recebi nenhum código</Link>
              </div>

              <div className="row text-center">
                <div className="col-6 my-auto">
                  <button className=" text-center btn px-5 rounded btn-red" onClick={handleBack}>Voltar</button>
                </div>

                <div className="col-6 my-auto">
                  <button type="submit" className=" text-center btn px-5 rounded btn-blue" onClick={handleSubmit}>Agendar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 bg-light rounded ">
            <div className="container bg-light rounded p-4">
              <div className="row ">

              <div className="col-4">
                  <img className="rounded " src={consult?.medic.image_url} alt="" height="70"/>
                </div>

                <div className="col-8">
                  <h6 className="m-0 p-0">{consult?.medic.name}</h6>
                  <p className="m-0 p-0 text-black-50">{consult?.medic.specialization}</p>
                </div>
              </div>

              <p className="m-0 p-0 my-4 text-black-50 mt-3"><img className="rounded " src={Clock} alt="" height="30"/> {consult?.consult.date?.day !== undefined ? consult?.consult.date?.day < 10 ? '0' + String(consult?.consult.date?.day) : consult?.consult.date?.day : 'ERRO'} de {months[consult?.consult.date?.month ? consult?.consult.date?.month : 0]}, {consult?.consult.scheduled_time}</p>
              <p className="m-0 p-0 my-4 text-black-50">Transfêrencia Bancária</p>
              <p className="m-0 p-0 text-black-50">R$ {consult?.medic.price}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
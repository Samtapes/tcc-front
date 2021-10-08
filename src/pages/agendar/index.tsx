import React from 'react';
import {useHistory} from 'react-router-dom'
import './index.css';

import MinhaFoto from '../../static/images/minha_foto.jpg'
import Clock from '../../static/images/clock.svg'

export default function Agendar(){

  const history = useHistory()

  function handleBack() {
    history.goBack()
  }

  function handleSubmit() {
    history.push('/confirmar-agendamento')
  }

  return (
    <div className="container-fluid  gradient-custom py-5 " style={{height: "100vh"}}>

      <div className="container px-5 " style={{marginTop: "20vh"}}>
        <div className="row my-5 ">
          <div className=" col-9 ">
            <div className="container p-5  bg-light rounded">
              <h4 className="text-start ">Contato:</h4>
              
              <div className=" text-black-50 form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control p-2" placeholder="Telefone (ex: +55 11 99999 9999)" />
              </div>

              <p className="text-start text-black-50">Ao agendar sua consulta, um código será enviado para este número, confirmando o agendamento</p>
              <h4 className="text-start mt-5 ">Informações Adicionais:</h4>

              <div className="form-outline mb-4">
                <textarea className="form-control" id="form4Example3" rows={4} placeholder="Utilize esse campo para indicar ao profissional qualquer informação adicional que você queria que ele saiba antes da consulta"></textarea>
              </div>

              <div className="row text-center">
                <div className="col-6 my-auto">
                  <button type="submit" className="px-5 text-center btn rounded btn-red" onClick={handleBack}>Cancelar</button>
                </div>

                <div className="col-6 my-auto">
                  <button type="submit" className="px-5 text-center btn rounded btn-blue" onClick={handleSubmit}>Continuar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3  ">
            <div className="container bg-light rounded p-4">
              <div className="row ">

                <div className="col-4">
                  <img className="rounded " src={MinhaFoto} alt="" height="70"/>
                </div>

                <div className="col-8">
                  <h6 className="m-0 p-0">Dra. Letícia Dupont</h6>
                  <p className="m-0 p-0 text-black-50">Especialização</p>
                </div>
              </div>

              <p className="m-0 p-0 my-4 text-black-50 mt-3"><img className="rounded " src={Clock} alt="" height="30"/> 07 de Maio, 14:00</p>
              <p className="m-0 p-0 my-4 text-black-50">Transfêrencia Bancária</p>
              <p className="m-0 p-0 text-black-50">R$ 250</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
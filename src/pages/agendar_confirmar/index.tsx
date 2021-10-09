import React from 'react';

import {Link, useHistory} from 'react-router-dom';

import MinhaFoto from '../../static/images/minha_foto.jpg'
import Clock from '../../static/images/clock.svg'

export default function AgendarConfirmar() {

  const history = useHistory()

  function handleBack() {
    history.goBack()
  }

  function handleSubmit() {
    history.push('/consultas')
  }

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
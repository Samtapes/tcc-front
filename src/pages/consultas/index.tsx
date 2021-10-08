import React from 'react';

import MinhaFoto from '../../static/images/minha_foto.jpg'

export default function Consultas() {
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
          <div className="col-lg-5 col-sm-12 my-4 shadow bg-light p-4 container   rounded border">
            <div className="row">
              <div className="col-8">
                <div className="row">

                  <div className="col-4 ">
                    <img className="rounded " src={MinhaFoto} alt="" height="100"/>
                  </div>
                                
                  <div className="col-8 ">
                    <h5>Nome e Sobrenome</h5>
                    <h6 className="text-black-50">Especialização</h6>
                  </div>
                </div>
                
                <h6 className="mt-3">Informações Adicionais:</h6>
                <p className="text-black-50"> Aqui será o que o paciente escrever durante o agendamento da consulta, para lembra-lo caso tenha esquecido...</p>
              </div>

              <div className="col-4">
                <div className="row">

                  <div className="col-1">
                    <div className="hr-vertical"></div>
                  </div>

                  <div className="col-10 text-center my-auto">
                    <h6>16 de Maio</h6>
                    <h6 className="text-black-50">Domingo</h6>
                    <p className="border rounded text-black-50">16:00</p>
                    <button className=" m-0 btn btn-sm btn-rounded btn-blue">Entrar</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
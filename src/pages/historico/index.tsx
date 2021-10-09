import React from "react";

import MinhaFoto from '../../static/images/minha_foto.jpg'

export default function Historico(){
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
          <div className="col-lg-5 col-sm-12 my-4 shadow bg-light p-4 container   rounded border">
            <div className="row">

              <div className="col-8">

                <div className="row">

                  <div className="col-4 ">
                    <img className="rounded " src={MinhaFoto} alt="" height="100"/>
                  </div>

                  <div className="col-8 my-auto ">
                    <h5>Nome e Sobrenome</h5>
                    <h6 className="text-black-50">Especialização</h6>
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
                    <h6>12 de Maio às 12:00</h6>
                    <h6 className="text-black-50">2 semanas atrás</h6>
                    <button className=" m-0 btn btn-sm btn-rounded btn-blue">Avaliar</button>
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
import React from 'react';
import './index.css'

import {FaCamera} from 'react-icons/fa'

import MinhaFoto from '../../static/images/minha_foto.jpg'

export default function Config(){
  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 py-4 text-center">
        </div>
      </div>

      <div className="container meio-verde text-center" >
        <img className="rounded-circle" src={MinhaFoto} height="200" alt=""/>
        <label htmlFor='selecao-arquivo' className="image-selector"><FaCamera/></label>
        <input id='selecao-arquivo' type='file'></input>
      </div>

      <div className="container py-5">
        <h1 className="text-center mb-5">Letícia Dupont Rodrigues Gonçalves</h1>

        <h2 className="mb-3">Dados da conta:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control p-2" />
              <label className="form-label">Email:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control p-2" />
              <label className="form-label">Senha:</label>
            </div>
          </div>
        </div>

        <h2 className="mb-3 mt-5">Dados da conta:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control p-2" />
              <label className="form-label">Idade:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control p-2" />
              <label className="form-label">Peso:</label>
            </div>
          </div>
        </div>

        
        <div className="col-12">
          <div className="form-outline mb-4">
            <input type="password" id="form3Example4" className="form-control p-2" />
            <label className="form-label">Doença(s) crônica(s):</label>
          </div>
        </div>
      </div>
    </div>
  )
}
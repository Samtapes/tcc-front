import React, {useContext, useState} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

import AuthContext from '../../contexts/auth'

export default function Register() {
  return (
    <div className="container-fluid gradient-custom p-5 mt-5" style={{height: ''}}>

      <h1 className="text-center text-light px-5 mt-5">Criar conta como Paciente</h1>

      <div className="container-signup  p-5 bg-light rounded my-5">
        <form className="justify-content-center text-center">

          {/* name and lastname inputs */}
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example1" className="form-control p-2" />
                <label className="form-label" >Nome</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example2" className="form-control p-2" />
                <label className="form-label">Sobrenome</label>
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input type="email" id="id_{{form.email.name}}" name="{{form.email.name}}" className="form-control p-2"/>
            <label className="form-label">Email</label>
            <p style={{color: 'red'}}></p>
    
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="id_{{form.password1.name}}" name="{{form.password1.name}}" className="form-control p-2"/>
            <label className="form-label">Senha</label>
            <p style={{color: "red"}}></p>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="id_{{form.password2.name}}" name="{{form.password2.name}}"  className="form-control p-2"/>
            <label className="form-label" >Confirmar Senha</label>
            <p style={{color: "red"}}></p>
          </div>


          <p className="text-center">Ou</p>
          <div className="form-outline mb-4">
            <p style={{color: "red"}}></p>
          </div>
          <button type="submit" className="btn btn-lg mb-4 "><i className="fab fa-google mx-2"></i>Continuar com o Google</button>

          <p className="text-center">Ao criar uma conta, você está aceitando os Termos de Condições de uso da Conncare e concordando com nossa políticas de privacidade</p>
          <hr/>

          <button type="submit" className="btn btn-primary btn-lg mb-4">Criar conta</button>

          <div className="text-center">
              <Link className="text-center" to="/"> Já possui uma conta?</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
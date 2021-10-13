
import React, { useContext, useEffect, useState } from 'react';
import './index.css'

import {FaCamera} from 'react-icons/fa'

import AuthContext from '../../contexts/auth';
import api from '../../services/api';

export default function Config(){

  const {user} = useContext(AuthContext)

  const [imageUrl, setImageUrl] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [especializacao, setEspecializacao] = useState('')
  const [preferencias, setPreferencias] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    setEmail(user?.email ? user?.email : '')
    setSenha(user?.password ? user?.password : '')
    setImageUrl(user?.image_url ? user?.image_url : '')

    api.get('/medic/account', {headers:{'Authorization': user?.id}}).then((response) => {
      setEspecializacao(response.data.specialization)
      setPreferencias(response.data.patient_preferences)
      setDescricao(response.data.description)
    })
  }, [])

  function handleSubmit() {
    // api.put('/users', {image_url: imageUrl, password: senha, age: idade, mass: peso, chronic_diseases: doencas}, {headers:{'Authorization': user?.id}}).then((response) => {
    //   setImageUrl(response.data.image_url)
    //   setSenha(response.data.password)
    // })
  }


  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 py-4 text-center">
        </div>
      </div>

      <div className="container meio-verde text-center" >
        <img className="rounded-circle" src={imageUrl} height="200" alt=""/>
        <label htmlFor='selecao-arquivo' className="image-selector"><FaCamera/></label>
        <input id='selecao-arquivo' type='file'></input>
      </div>

      <div className="container py-5">
        <h1 className="text-center mb-5">{user?.name}</h1>

        <h2 className="mb-3">Dados da conta:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input readOnly={true} type="email" id="form3Example3" className="form-control p-2" value={email} onChange={event => setEmail(event.target.value)}/>
              <label className="form-label">Email:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control p-2" value={senha} onChange={event => setSenha(event.target.value)}/>
              <label className="form-label">Senha:</label>
            </div>
          </div>
        </div>

        <h2 className="mb-3 mt-5">Dados Pessoais:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input readOnly={true} type="text" id="form3Example3" className="form-control p-2" value={especializacao} onChange={event => setEspecializacao(event.target.value)}/>
              <label className="form-label">Especialização:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" id="form3Example3" className="form-control p-2" value={preferencias} onChange={event => setPreferencias(event.target.value)}/>
              <label className="form-label">Preferências de Pacientes:</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-outline mb-4">
              <input type="text" id="form3Example3" className="form-control p-2" value={descricao} onChange={event => setDescricao(event.target.value)}/>
              <label className="form-label">Descrição:</label>
            </div>
          </div>
        </div>

        <div className="month">      
        <ul>
          <li className="prev">&#10094;</li>
          <li className="next">&#10095;</li>
          <li>
            August<br/>
            <span style={{fontSize:"18px"}}>2021</span>
          </li>
        </ul>
        </div>

        <ul className="weekdays">
        <li>SEG</li>
        <li>TER</li>
        <li>QUA</li>
        <li>QUI</li>
        <li>SEX</li>
        <li>SÁB</li>
        <li>DOM</li>
        </ul>

        <ul className="days">  
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li><span className="active">10</span></li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        </ul>

        <button onClick={handleSubmit}>Salvar</button>
      </div>
    </div>
  )
}
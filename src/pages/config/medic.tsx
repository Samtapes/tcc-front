
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
  const [telefone, setTelefone] = useState('')

  const [preco, setPreco] = useState('')
  const [comecoTrabalho, setComecoTrabalho] = useState('')
  const [fimTrabalho, setFimTrabalho] = useState('')
  const [informacaoAdicional, setInformacaoAdicional] = useState('')
  const [descricaoConsulta, setDescricaoConsulta] = useState('')


  useEffect(() => {
    setEmail(user?.email ? user?.email : '')
    setSenha(user?.password ? user?.password : '')
    setImageUrl(user?.image_url ? user?.image_url : '')

    api.get('/medic/account', {headers:{'Authorization': user?.id}}).then((response) => {
      setEspecializacao(response.data.specialization)
      setPreferencias(response.data.patient_preferences)
      setDescricao(response.data.description)
      setTelefone(response.data.phone_number)
    })

    api.get('/medic/consult_configuration', {headers:{'Authorization': user?.id}}).then(response => {
      setPreco(response.data.price)
      setComecoTrabalho(response.data.start_of_work)
      setFimTrabalho(response.data.end_of_work)
      setInformacaoAdicional(response.data.additional_info)
      setDescricaoConsulta(response.data.description)
    })
  }, [user])

  function handleSubmit() {
    api.put('/users', {image_url: imageUrl, password: senha, age: null, mass: null, chronic_diseases: null}, {headers:{'Authorization': user?.id}}).then((response) => {
      setImageUrl(response.data.image_url)
      setSenha(response.data.password)
    }).catch((error) => {
      alert(error.response.data.message)
    })

    api.put('/medics', {description: descricao, phone_number: telefone, patient_preferences: preferencias}, {headers:{'Authorization': user?.id}}).then((response) => {
      setImageUrl(response.data.image_url)
      setSenha(response.data.password)
      alert('Alteração realizada com sucesso')
    }).catch((error) => {
      alert(error.response.data.message)
    })
  }

  function handleCreateConsultConfiguration() {
    api.get('/medic/consult_configuration', {headers:{'Authorization': user?.id}}).then(response => {
      api.put('/medic/consult_configuration', {price: preco, start_of_work: comecoTrabalho, end_of_work: fimTrabalho, description: descricaoConsulta, additional_info: informacaoAdicional}, {headers:{'Authorization': user?.id}}).then((response) => {
        alert('Configurações da consulta atualizadas com sucesso!')
      }).catch((error) => {
        alert(error.response.data.message)
      })
    }).catch(error => {
      api.post('/medic/consult_configuration', {price: preco, start_of_work: comecoTrabalho, end_of_work: fimTrabalho, description: descricaoConsulta, additional_info: informacaoAdicional}, {headers:{'Authorization': user?.id}}).then((response) => {
        alert('Configurações da consulta criadas com sucesso!')
      }).catch((error) => {
        alert(error.response.data.message)
      })
    })
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
              <input readOnly={true} type="text" className="form-control p-2" value={especializacao} onChange={event => setEspecializacao(event.target.value)}/>
              <label className="form-label">Especialização:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={preferencias} onChange={event => setPreferencias(event.target.value)}/>
              <label className="form-label">Preferências de Pacientes:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={telefone} onChange={event => setTelefone(event.target.value)}/>
              <label className="form-label">Telefone:</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={descricao} onChange={event => setDescricao(event.target.value)}/>
              <label className="form-label">Descrição:</label>
            </div>
          </div>
        </div>

        <div className='d-flex mt-5' style={{alignContent: 'center', justifyContent: 'center'}}>
          <button className='button' onClick={handleSubmit}>Salvar</button>
        </div>


        <h2 className="mb-3 mt-5">Consultas:</h2>

        <h3 className="mb-3 mt-5">Dias livres:</h3>
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

        <h2 className="mb-3 mt-5">Configurações de Consulta:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={preco} onChange={event => setPreco(event.target.value)}/>
              <label className="form-label">Preço:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="time" className="form-control p-2" value={comecoTrabalho} onChange={event => setComecoTrabalho(event.target.value)}/>
              <label className="form-label">Começo do expediente:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="time" className="form-control p-2" value={fimTrabalho} onChange={event => setFimTrabalho(event.target.value)}/>
              <label className="form-label">Fim do expediente:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={informacaoAdicional} onChange={event => setInformacaoAdicional(event.target.value)}/>
              <label className="form-label">Informação Adicional:</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-outline mb-4">
              <input type="text" className="form-control p-2" value={descricaoConsulta} onChange={event => setDescricaoConsulta(event.target.value)}/>
              <label className="form-label">Descrição da consulta:</label>
            </div>
          </div>
        </div>

        <div className='d-flex mt-5' style={{alignContent: 'center', justifyContent: 'center'}}>
          <button className='button' onClick={handleCreateConsultConfiguration}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
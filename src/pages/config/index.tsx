
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
  const [idade, setIdade] = useState(0)
  const [peso, setPeso] = useState('')
  const [doencas, setDoencas] = useState('')

  useEffect(() => {

    setEmail(user?.email ? user?.email : '')
    setSenha(user?.password ? user?.password : '')
    setImageUrl(user?.image_url ? user?.image_url : '')

    api.get('/user/account', {headers:{'Authorization': user?.id}}).then((response) => {
      setIdade(response.data.age)

      let tempPeso = response.data.mass
      tempPeso = String(tempPeso).replace('.', ',')

      setPeso(tempPeso)
      setDoencas(response.data.chronic_diseases)
    })
  }, [])

  function handleSubmit() {
    api.put('/users', {image_url: imageUrl, password: senha, age: idade, mass: peso, chronic_diseases: doencas}, {headers:{'Authorization': user?.id}}).then((response) => {
      setImageUrl(response.data.image_url)
      setSenha(response.data.password)
      setIdade(response.data.age)
      setPeso(response.data.mass)
      setDoencas(response.data.chronic_diseases)
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

        <h2 className="mb-3 mt-5">Dados da conta:</h2>
        <div className="row">
          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="number" id="form3Example3" className="form-control p-2" value={idade} onChange={event => setIdade(parseInt(event.target.value))}/>
              <label className="form-label">Idade:</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-outline mb-4">
              <input type="text" id="form3Example4" className="form-control p-2" value={peso} onChange={event => setPeso(event.target.value)}/>
              <label className="form-label">Peso:</label>
            </div>
          </div>
        </div>

        
        <div className="col-12">
          <div className="form-outline mb-4">
            <input type="text" id="form3Example4" className="form-control p-2" value={doencas} onChange={event => setDoencas(event.target.value)}/>
            <label className="form-label">Doença(s) crônica(s):</label>
          </div>
        </div>

        <button onClick={handleSubmit}>Salvar</button>
      </div>
    </div>
  )
}
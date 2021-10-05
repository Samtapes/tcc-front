import React, {useContext, useState, useEffect} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

import AuthContext from '../../contexts/auth'
import api from '../../services/api';

export default function RegisterMedic() {

  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    api.get('/specializations').then(response => {
      setSpecializations(response.data)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }, [])

  const { signIn } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');


  function handleRegister(event: any) {
    event.preventDefault();

    const medic = {
      specialization_id: specialization,
      register_number: registerNumber,
      phone_number: phone_number
    }

    if (password === confirmPassword) {
      api.post('/register', {name: name + " " + lastName, email, password, medic: medic}).then((response) => {
        signIn({email, password})
      }).catch((error) => {
        alert(error.response.data.message)
      })
    } else {
      alert("As senhas não se coincidem")
    }
  }

  return (
    <div className="container-fluid gradient-custom p-5 mt-5">

      <h1 className="text-center text-light px-5 mt-5">Criar conta como Profissional da Saúde</h1>

      <div className="container-signup  p-5 bg-light rounded my-5" >
        <form className="justify-content-center text-center" onSubmit={event => handleRegister(event)}>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input required type="text" id="form3Example1" className="form-control p-2" value={name} onChange={event => setName(event.target.value)}/>
                <label className="form-label">Nome</label>
              </div>

            </div>
            <div className="col">
              <div className="form-outline">
                <input required type="text" id="form3Example2" className="form-control p-2" value={lastName} onChange={event => setLastName(event.target.value)}/>
                <label className="form-label">Sobrenome</label>
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input required type="email" id="form3Example3" className="form-control p-2" value={email} onChange={event => setEmail(event.target.value)}/>
            <label className="form-label" >Email</label>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input required type="password" id="senha" className="form-control p-2" value={password} onChange={event => setPassword(event.target.value)}/>
                <label className="form-label">Senha</label>
              </div>
            </div>

            <div className="col">
              <div className="form-outline">
                <input required type="password" id="senhaConfirmar" className="form-control p-2" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
                <label className="form-label">Confirmar senha</label>
              </div>
            </div>
          </div>

          <div className=" mb-4">
            <select className="form-select  bg-light " aria-label="Default select example" value={specialization} onChange={(event) => setSpecialization(event.target.value)}>
              <option>Especialização</option>

              {specializations.map((specialization: any) => (
                <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
              ))}

            </select>
          </div>


          <div className="form-outline mb-4">
            <input required type="text" id="telefone" className="form-control p-2" value={phone_number} onChange={event => setPhone_number(event.target.value)}/>
            <label className="form-label">Telefone</label>
          </div>

          <div className="form-outline mb-4">
            <input required type="text" id="registro" className="form-control p-2" value={registerNumber} onChange={event => setRegisterNumber(event.target.value)}/>
            <label className="form-label">Número de registro (ex: CRM, CRP, CRO)</label>
          </div>


          <p className="text-center">Ou</p>


          <button type="submit" className="btn btn-lg mb-4 "><i className="fab fa-google mx-2"></i>Continuar com o Google</button>

          <p className="text-center">Ao criar uma conta, você está aceitando os Termos de Condições de uso da Conncare e concordando com nossa políticas de privacidade</p>
          <hr/>

          <button type="submit" className="btn btn-primary btn-lg mb-4">Criar conta</button>

          <div className="text-center">
            <Link to='/' className="text-center"> Já possui uma conta?</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
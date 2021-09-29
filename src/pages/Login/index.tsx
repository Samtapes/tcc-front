import React, {useContext, useState} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

import AuthContext from '../../contexts/auth'

function App() {

  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event: any) {
    event.preventDefault()

    signIn({email, password})
  }

  return (
    <div className="container-fluid gradient-custom p-5 mt-5" style={{height: '100vh'}}>

    <h1 className="text-center text-light  px-5 mt-5">Entrar em sua conta</h1>

    <div className="container-sign text-right p-5 bg-light rounded my-5" >

      <form className="text-center" onSubmit={event => handleLogin(event)}>
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}


        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input type="email" className="form-control p-2" value={email} onChange={event => setEmail(event.target.value)}/>
          <label className="form-label">Email</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input type="password" className="form-control p-2" value={password} onChange={event => setPassword(event.target.value)}/>
          <label className="form-label" >Senha</label>

        </div>
          <div className="text-end pointer">
            <Link to="/"> Esqueceu a senha?</Link>
          </div>



          <p className="text-center">Ou</p>

          <div>
                  <a type="submit" className=" text-center btn btn-lg mb-4 " href="{% provider_login_url 'google' %}" ><i className="fab fa-google mx-2"></i>Continuar com o Google</a>
          </div>




        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-lg mb-4">Entrar</button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">

        </div>
        </form>

      </div>
    </div>
  );
}

export default App;

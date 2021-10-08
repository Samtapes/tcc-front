import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom' 
import logo from '../../static/images/logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import AuthContext from '../../contexts/auth';

export default function Navbar(){

  const {signed, signOut} = useContext(AuthContext);
  const history = useHistory();

  function handleSignOut(){
    signOut()
    history.push('/')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar gradient-custom fixed-top text-light" style={{boxShadow: "0px -10px 30px rgba(0,0,0,0.2)"}}>
      
      <div className="container">
        
        <Link to='/' className="navbar-brand me-2">
          <img
            src={logo}
            height="50px"
            alt="Conncare Logo"
            loading="lazy"
            style={{marginTop: '-1px'}}
          />
        </Link>

        
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>
          

          <div className="d-flex align-items-center">

            { !signed ? 
              <>
                {/* Register */}
                <Dropdown>
                  <Dropdown.Toggle 
                    className="mx-2 bg-transparent border-0"
                  >
                    Cadastrar
                  </Dropdown.Toggle >

                  <Dropdown.Menu>
                    <Dropdown.Item><Link className="dropdown-item" to='/cadastro-paciente'>Paciente </Link></Dropdown.Item>
                    <Dropdown.Item><Link className="dropdown-item" to='/cadastro-medico'>Profissional </Link></Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>

                {/* Enter Button */}
                <Link className="text-button m-0 p-0" style={{textDecoration: 'none', color:'#00EDBC'}} to='/login'>
                  <button type="button" className="btn rounded-pill btn-light me-3 p-1 px-4 shadow-sm">
                    Entrar
                  </button>
                </Link>
              </> 
            :
              <>
                {/* Register */}
                <Dropdown>
                  <Dropdown.Toggle 
                    className="mx-2 bg-transparent border-0"
                  >
                    Minha Conta
                  </Dropdown.Toggle >

                  <Dropdown.Menu>
                    <Dropdown.Item><Link className="dropdown-item" to='/consultas'>Minhas Consultas </Link></Dropdown.Item>
                    <Dropdown.Item><Link className="dropdown-item" to='/conguracoes'>Configurações </Link></Dropdown.Item>
                    <Dropdown.Item><p className="dropdown-item my-0" onClick={handleSignOut}>Encerrar Sessão </p></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            }

          </div>
        </div>
        
      </div>
      
    </nav>
  )
}
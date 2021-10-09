import React, { useContext } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

import Logo from '../../static/images/logo.svg'
import AuthContext from '../../contexts/auth';

export default function NavbarLogado() {
  const {pathname} = useLocation()
  const {signOut} = useContext(AuthContext)
  const history = useHistory()

  function handleSignOut(){
    signOut()
    history.push('/')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar gradient-custom fixed-top text-light">
      <div className="container">

        <Link to='/' className="navbar-brand me-2">
          <img
            src={Logo}
            height="50"
            alt=""
            loading="lazy"
            style={{marginTop: "-1px"}}
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
          <ul className="navbar-nav m-auto">
            <Link to='/' className="link-white m-auto mx-3 text-light" style={{textDecoration:  pathname === '/' ? 'underline' : 'none'}}> Agendar </Link>
            <Link to='/consultas' className="link-white m-auto mx-3 text-light" style={{textDecoration:  pathname === '/consultas' ? 'underline' : 'none'}}> Consultas </Link>
            <Link to='/historico' className="link-white m-auto mx-3 text-light" style={{textDecoration:  pathname === '/historico' ? 'underline' : 'none'}}> Histórico </Link>
          </ul>
  
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
        </div>

      </div>
    </nav>
  )
}
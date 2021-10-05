import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Star from '../../static/images/star.svg';
import Coracao from '../../static/images/coracao.svg';
import api from '../../services/api';

import Modal from 'react-bootstrap/Modal';

export default function Home() {

  const [medics, setMedics] = useState([]);
  const [page, setPage] = useState(0);
  const [specializations, setSpecializations] = useState([]);
  const [especializacao, setEspecializacao] = useState('');
  const [medicModal, setMedicModal] = useState(false);

  useEffect(() => {
    api.get('/medics/'+page+'?specialization_name='+especializacao).then((response) => {
      setMedics(() => response.data);
    }).catch((error) => {
      alert(error.response.data.message);
    })

    api.get('/specializations').then((response) => {
      setSpecializations(() => response.data);
    }).catch((error) => {
      alert(error.response.data.message);
    })
  }, [page, especializacao]);

  return (
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 text-center">
          <h1>Bem vindo, User!</h1>
          <p>Pronto pra agendar sua consulta?</p>
        </div>
      </div>

      <div className="container meio-verde text-center shadow text-black-50 border mx-auto rounded bg-light my-5 py-5" >

        <div className="row">
          <div className="col-3 px-4 text-end my-auto">
            <select value={especializacao} className="form-select text-black-50 bg-light " aria-label="Default select example" onChange={event => setEspecializacao(event.target.value)}>
              <option selected value="Especialização">Especialização</option>
              {specializations.map((specialization: any) => (
                <option key={specialization.id} value={specialization.name}>{specialization.name}</option>
              ))}
            </select>
          </div>

          <div className="col-3 px-4 my-auto" >
            <select value={1} className="form-select text-black-50 bg-light " aria-label="Default select example">
              <option selected value="1">Especialização</option>
            </select>
          </div>

          <div className="col-3  px-4 my-auto" >
            <select value={1} className="form-select text-black-50 bg-light " aria-label="Default select example">
              <option selected value="1">Especialização</option>
            </select>
          </div>

        </div>

      </div>

      {medics.length > 1 ? medics.map((medic: any) => (
        <div key={medic.id} className="container py-5 d-flex flex-row shadow bg-light p-4 container border my-5" style={{maxWidth: '600px', borderRadius: '15px'}}>

            <div className="">
              <img className="rounded " src={medic.image_url} alt="" height="130"/>
            </div>

            <div className="mx-4 w-100">
              <h5>{medic.name}</h5>
              <h6 className="text-black-50">{medic.specialization}</h6>
              <h6><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/><img className="rounded " src={Star} alt="" height="20"/></h6>

              <div className="d-flex flex-row last-row">

                <div className="me-auto">
                  <div className="text-end">
                    <button type="button" className="button" onClick={() => setMedicModal(() => true)}>
                      <p className="my-auto text-center ">Ver mais</p>
                    </button>
                  </div>
                </div>

                <div className="my-auto">
                  <div className="text-end">
                    <Link to="/"> <img className="text-end" src={Coracao} alt=""/></Link>
                  </div>
                </div>
              </div>

            </div>
        </div>
      )) :
        <h5 className='text-center my-5'>Não há médicos dessa especialização cadastrados nesse serviço</h5>
      }

      <Modal show={medicModal} onHide={() => setMedicModal(() => false)}>
        <Modal.Header closeButton>
          <Modal.Title>Médico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>

    </div>
  )
}
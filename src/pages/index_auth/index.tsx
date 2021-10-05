import React from 'react';
// import {Link} from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import banner from '../../static/images/banner.png'
import ondas_cima from '../../static/images/ondas-cima.svg'
import banner_video from '../../static/images/banner-video.svg'
import video_conference from '../../static/images/video-conference.svg'
import ondas_baixo from '../../static/images/ondas-baixo.svg'



export default function IndexAuth() {
  return (
    <div className="mt-5">
      <div className="container-fluid div-tamanho gradient-custom py-5">
        <div className="container mt-5" >
          <div className="row">
            <div className="col-sm-12 col-lg-6 my-auto">
              <h1 className="text-light">Cuidar da sua saúde nunca foi tão fácil</h1>
              <h3 className="text-light">Com a Conncare você faz suas consultas com diversos profissionais da saúde de forma rápida e segura no conforto de sua casa.</h3>
              <button type="button" className="btn btn-rounded btn-light me-3">
                <p className="m-0 p-0 btn-saibamais">Saiba mais</p>
              </button>
            </div>

            <div className=" col-sm-12 col-lg-6" >
              <img src={banner} height="550px  " alt="imagem"/>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid div-tamanho">
        <img src={ondas_cima} width="100%"  alt="imagem"/>
        <div className="container mt-5" >
          <div className="row">
            <div className="col-sm-12 col-lg-6" >
              <img src={banner_video} height="500px" alt="imagem"/>
            </div>

            <div className="col-sm-12 col-lg-6 my-auto">
              <h1 className="text-dark text-bold mb-5">Cuidados<br/>sem fronteiras</h1>
              <h3 className="text-dark">Não importa a plataforma que você está, pode ser computador, celular ou até mesmo tablet, a Conncare te permite fazer consultas onde quiser.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid m-0 p-0  div-tamanho ">
        <div className="container-fluid  bg-gray mt-5" >
          <img className="mb-5" src={ondas_cima} width="100%" alt="imagem"/>

          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-6 my-auto">
                <h1 className="text-dark">Escolhas e opções <br/>infinitas</h1>
                <h3 className="text-dark">A Conncare proporciona ferramentas suficientes para você poder escolher o profissional que melhor se encaixa com você.</h3>
              </div>

              <div className=" col-sm-12 col-lg-6" >
                <img src={video_conference} height="550  " alt="imagem"/>
              </div>
            </div>
          </div>


          <img src={ondas_baixo} width="100%" alt="imagem"/>
        </div>
      </div>
    </div>
  )
}
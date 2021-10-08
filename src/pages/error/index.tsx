import React from 'react';
import {BiError} from 'react-icons/all'

export default function ErrorPage(){
  return(
    <div className="mt-5">
      <div className="container-fluid tamanhoagendar gradient-custom py-5 my-5 m-0 ">
        <div className="text-light my-5 text-center">
          <h1>ERRO</h1>
          <p>Essa página não existe!</p>
        </div>
      </div>

      <div className="text-center my-5 py-5">
        <BiError className='mb-5' color='black' size='100px'/>
        <h4>Clique no ícone da Conncare para retornar à página inicial</h4>
      </div>

    </div>
  )
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './index.css'

export default function Footer(){
  return (
    <footer className="bg-dark text-center footer text-white">
    
      

      <div className="text-center p-3  " style={{backgroundColor: '#00D6D0'}}>
         Conncare © 2021 
       <div>
       <a className="btn btn-light btn-floating m-1" href="/" role="button">
            <FaTwitter/>
        </a>
        <a className="btn btn-light btn-floating m-1" href="/" role="button">
            <FaInstagram/>
        </a>
        <a className="btn btn-light btn-floating m-1" href="/" role="button">
            <FaFacebookF/>
          </a>
       </div>
        
      </div>
    </footer>
  )
}
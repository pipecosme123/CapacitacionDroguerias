import React from 'react';
import { Link } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Perfil from './Perfil';
import '../css/NavBar.css';
import { Imagenes } from '../Constantes/Imagenes';

const NavBar = () => {
   return (
      <div className='NavBar'>
         <div className="container">
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="nav-navegacion">
               <Link to={`${RoutersLinks.Home}`}>Inicio</Link>
               <Link to={`${RoutersLinks.Capacitacion}`}>Capacítate</Link>
               <Link to={`${RoutersLinks.Material}`}>Material de estudio</Link>
               <Link to={`${RoutersLinks.Descubre}`}>Descubre más</Link>
               <Perfil />
            </div>
         </div>
      </div>
   );
};

export default NavBar;
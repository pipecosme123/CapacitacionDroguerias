import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Perfil from './Perfil';
import '../css/NavBar.css';
import { Imagenes } from '../Constantes/Imagenes';
import Cookies from 'universal-cookie';

const NavBar = () => {

   let pathName = window.location.pathname;
   const cookies = new Cookies();

   useEffect(() => {
      if (!cookies.get('idUsuario')) {
         window.location.pathname = RoutersLinks.Login;
      }
   }, []);
   
   return (
      <nav className='NavBar'>
         <div className="container">
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="nav-navegacion">
               {pathName !== RoutersLinks.Login &&
                  pathName !== RoutersLinks.Registrarse &&
                  <>
                     <NavLink to={`${RoutersLinks.Home}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Inicio</NavLink>
                     <NavLink to={`${RoutersLinks.MenuCapacitacion}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Capacítate</NavLink>
                     <NavLink to={`${RoutersLinks.Material}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Material de estudio</NavLink>
                     <NavLink to={`${RoutersLinks.Descubre}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Descubre más</NavLink>
                     <Perfil />
                  </>
               }

            </div>
         </div>
      </nav>
   );
};

export default NavBar;
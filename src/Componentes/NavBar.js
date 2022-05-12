import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Perfil from './Perfil';
import '../css/NavBar.css';
import { Imagenes } from '../Constantes/Imagenes';

const NavBar = () => {
   return (
      <nav className='NavBar'>
         <div className="container">
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="nav-navegacion">
               <NavLink to={`${RoutersLinks.Home}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Inicio</NavLink>
               <NavLink to={`${RoutersLinks.Capacitacion}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Capacítate</NavLink>
               <NavLink to={`${RoutersLinks.Material}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Material de estudio</NavLink>
               <NavLink to={`${RoutersLinks.Descubre}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Descubre más</NavLink>
               <Perfil />
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
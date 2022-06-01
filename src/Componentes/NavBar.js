import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Perfil from './Perfil';
import '../css/NavBar.css';
import { Imagenes } from '../Constantes/Imagenes';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const NavBar = () => {

   let pathName = window.location.pathname;

   const salir = () => {
      Swal.fire({
         title: 'Redireccionando',
         icon: 'question',
         text: '¿Deseas salir de esta página?',
         showCloseButton: true,
         showCancelButton: true,
         focusConfirm: false,
         confirmButtonText:
            `<a href="http://colgate.com/es-co" className={"navLink"} >Si</a>`,
         confirmButtonAriaLabel: 'Thumbs up, great!',
         cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>Cancelar',
         cancelButtonAriaLabel: 'Cancelar'
      })
   }


   useEffect(() => {
      const cookies = new Cookies();
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
                     <button onClick={()=> salir()} className={"navLink"} >Descubre más</button>
                     <Perfil />
                  </>
               }
            </div>
         </div>

         <div className="nav-navegacion mobile">
            {pathName !== RoutersLinks.Login &&
               pathName !== RoutersLinks.Registrarse &&
               <>
                  <NavLink to={`${RoutersLinks.Home}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Inicio</NavLink>
                  <NavLink to={`${RoutersLinks.MenuCapacitacion}`} className={({ isActive }) => "navLink" + (isActive ? " activeLink" : "")} >Capacítate</NavLink>
                  <a href={`${RoutersLinks.Descubre}`} className={"navLink"} >Descubre más</a>
               </>
            }

         </div>
      </nav>
   );
};

export default NavBar;
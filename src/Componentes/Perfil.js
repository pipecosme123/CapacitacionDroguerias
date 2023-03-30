import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import '../css/Perfil.css';

const Perfil = () => {

   const [show, setShow] = useState(false);

   const cookies = new Cookies();
   const usuario = localStorage.getItem('correo'); 
   // const usuario = `Prueba Prueba`; 

   const cerrarSesion = () => {

      cookies.remove("correoUsuario");
      cookies.remove("idUsuario");

      localStorage.removeItem('data');

      window.location.pathname = RoutersLinks.Login;
   }

   return (
      <div className='Perfil'>
         <div className='imgPerfil' onClick={() => setShow(!show)}>
            <h2>{usuario[0].toUpperCase()}</h2>
         </div>

         <div className={show ? "Overlay" : "noShow"} onClick={() => setShow(false)}></div>

         <div className={show ? "contenidoPerfil" : "noShow"}>
            {usuario}
            <hr />
            <button className='primary' onClick={() => cerrarSesion()}>Cerrar sesión</button>
         </div>
      </div>
   );
};

export default Perfil;
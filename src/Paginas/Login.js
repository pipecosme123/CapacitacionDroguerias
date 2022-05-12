import React from 'react';
import { Imagenes } from '../Constantes/Imagenes';
import '../css/Login.css';

const Login = () => {
   return (
      <div className='Login'>
         <div className="imgPortada">
            <div className="navLogin"></div>
            <img src={Imagenes.imgPortada} alt="" />
         </div>
         <div className="formIniciarSesion">
            <h1>Iniciar Sesión</h1>
            <form action="">
               <p htmlFor="inputCorreo">Correo Electrónico</p>
               <input type="text" id='inputCorreo' className='inputCorreo' placeholder='Correo Electrónico' /><br />
               <button type="submit" className='buttonSubmit'>Ingresar</button>
            </form>
         </div>
      </div>
   );
};

export default Login;
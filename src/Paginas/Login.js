import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from '../Componentes/Loading';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import '../css/Login.css';
import { useForm } from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';

const cookies = new Cookies();

const initialForm = {
   accessAPI: "Login",
   inputCorreo: ""
}

const validationForm = (form) => {
   let errors = {}

   if (!form["inputCorreo"].trim()) {
      errors["inputCorreo"] = true;
   }

   errors.estado = true;
   return errors;
}

const Login = () => {

   const [storage, setStorage] = useLocalStorage("data", {});

   const {
      // form,
      error,
      loading,
      responseApi,
      data,
      handleChange,
      handleBlur,
      handleSubmit
   } = useForm(initialForm, validationForm);

   const sesion = () => {
      setStorage(data[0]);
      cookies.set("idUsuario", data[0].idUsuarios, { path: '/' });
      cookies.set("correoUsuario", data[0].correoUsuarios, { path: '/' });
      window.location.pathname = RoutersLinks.Home;
   }

   useEffect(() => {
      if (responseApi && data !== undefined) {
         sesion();
      }

      if (cookies.get('idUsuario')) {
         window.location.pathname = RoutersLinks.Home;
      }
      
   }, [responseApi, data]);

   return (
      <div className='Login'>
         <div className='seccionForm'>
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="formIniciarSesion">
               <h1>Iniciar Sesión</h1>
               <form onSubmit={handleSubmit}>
                  <p htmlFor="inputCorreo">Correo Electrónico</p>
                  <input type="text" id='inputCorreo' name='inputCorreo' className='inputCorreo' placeholder='Correo Electrónico' onChange={handleChange} onBlur={handleBlur} />
                  <span className={error.inputCorreo ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                  <button type="submit" className='buttonSubmit'>Ingresar</button>
                  <div className="seccionLoginRegistro">
                     <p>¿No tienes una cuenta?</p>
                     <Link className='linkSeccion' to={RoutersLinks.Registrarse}>Regístrate</Link>
                  </div>
               </form>

               {loading === true && <Loading />}

               {responseApi === false &&
                  <div className='alert danger'  >
                     Tenemos un problema, Vuelve a intentarlo más tarde
                  </div>
               }

               {responseApi && data === undefined &&
                  <div className='alert danger'  >
                     <b>El correo electrónico es incorrecto</b> <br />
                     Vuelve a intentarlo
                  </div>
               }

            </div>
         </div>
         <div className="imgPortada">
            <img src={Imagenes.imgPortada} alt="" />
         </div>
      </div>
   );
};

export default Login;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from '../Componentes/Loading';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import '../css/Login.css';
import { useForm } from '../hooks/useForm';

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

   useEffect(() => {

      if (responseApi && data !== 'undefined') {

         window.localStorage.setItem("data", JSON.stringify(data[0]));
         cookies.set("idUsuario", data[0].idUsuarios, { path: '/' });
         cookies.set("correoUsuario", data[0].correoUsuarios, { path: '/' });
         window.location.pathname = RoutersLinks.Home;

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

               <div className="seccionLogin">
                  <p>¿Aún no estás registrado?</p>
                  <Link className='linkSeccion' to={RoutersLinks.Registrarse}>Registrarse</Link>
               </div>
               
               <hr />
               {/* <h1>Iniciar Sesión</h1> */}
               <form onSubmit={handleSubmit}>

                  <p htmlFor="inputCorreo">Si usted está registrado, ingrese su correo</p>
                  <input type="text" id='inputCorreo' name='inputCorreo' className='inputCorreo' placeholder='Correo Electrónico' onChange={handleChange} onBlur={handleBlur} />
                  <span className={error.inputCorreo ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                  <button type="submit" className='buttonSubmit'>Ingresar</button>

               </form>

               {loading === true && <Loading />}

               {responseApi === false &&
                  <div className='alert danger'  >
                     Tenemos un problema, Vuelve a intentarlo más tarde
                  </div>
               }

               {responseApi && data === 'undefined' &&
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
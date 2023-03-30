import React from 'react';
import { Link } from 'react-router-dom';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useForm } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import Loading from '../Componentes/Loading';
import { useAuthContext } from '../context/authContext';
import { toast, Toaster } from 'react-hot-toast';

import '../css/Login.css';

const initialForm = {
   method: 'get',
   url: 'login',
   auth: {
      correo: ''
   }
}

const Login = () => {

   const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();
   const { login } = useAuthContext();

   const onSubmit = (data) => {

      api_handleSubmit(data)
         .then((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('correo', res.correo);
            login();
         }).catch((err) => {
            toast.error(err.response.data, {
               duration: 7000,
               position: 'top-center'
            })
         })
   };

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

               <form onSubmit={handleSubmit(onSubmit)}>

                  <p htmlFor="inputCorreo">Si usted está registrado, ingrese suaaa correo</p>
                  <input
                     {...register("auth.correo", {
                        required: { value: true, message: "Este campo es obligatorio." },
                        pattern: { value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, message: "Debe ser una dirección de correo electrónico válida." }
                     })}
                     type="text" className='inputCorreo' placeholder='Correo Electrónico' />
                  {errors.auth?.correo && <span className='message_error'>{errors.auth.correo.message}</span>}

                  <button type="submit" className='buttonSubmit'>Ingresar</button>

               </form>

            </div>
         </div>
         <div className="imgPortada">
            <img src={Imagenes.imgPortada} alt="" />
         </div>

         {loading === true && <Loading />}
         <Toaster />

      </div>
   );
};

export default Login;

{/* {loading === true && <Loading />}

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
               } */}
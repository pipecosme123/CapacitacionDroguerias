import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { drogerias, Regiones } from '../Constantes/ConstRegistros';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks, urlApi } from '../Constantes/RoutersLinks';
import { useForm } from '../hooks/useForm';
import '../css/Registrarse.css';
import Loading from '../Componentes/Loading';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialForm = {
   accessAPI: "Registrarse",
   correo: "",
   distribuidor: "",
   region: "",
   celular: ""
}

const validationForm = (form) => {
   let errors = {};

   if (!form["distribuidor"].trim()) {
      errors["distribuidor"] = true;
   }

   if (!form["region"].trim()) {
      errors["region"] = true;
   }

   if (!form["correo"].trim()) {
      errors["correo"] = true;
   }

   if (!form["celular"].trim()) {
      errors["celular"] = true;
   }

   errors.estado = true;
   return errors;
}

const Registrarse = () => {

   const {
      error,
      showErrors,
      loading,
      responseApi,
      data,
      handleChange,
      handleBlur,
      handleSubmit
   } = useForm(initialForm, validationForm);

   const aletRegister = () => {
      Swal.fire({
         title: 'Registrado Correctamente',
         icon: 'success',
         text: 'Ahora usted puede iniciar sesión',
         showCloseButton: true,
         showCancelButton: false,
         focusConfirm: false,
         confirmButtonText:
            '<a href="/">Iniciar Sesión</a>',
         confirmButtonAriaLabel: 'Thumbs up, great!',
      })
   }

   useEffect(() => {
      if (responseApi && data !== undefined && data !== "existe") {
         aletRegister();
      }

      if (cookies.get('idUsuario')) {
         window.location.pathname = RoutersLinks.Home;
      }

   }, [responseApi, data]);

   return (
      <div className='Registrarse'>
         <div className='seccionForm'>
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="formRegistrarse">
               <h1>Registrarse</h1>
               <form onSubmit={handleSubmit}>
                  <div className='formCampos'>

                     <div className="selectsInputs">
                        <div className="contentInputs">
                           <p>Distribuidor que lo atiende</p>
                           <select name="distribuidor" className='selectDistribuidor' defaultValue='/' onChange={handleChange} onBlur={handleBlur}>
                              <option disabled value="/">Elige una opción</option>
                              {drogerias.map((item, index) => (
                                 <option key={index} value={item.distr}>{item.distr}</option>
                              ))}
                           </select>
                           <span className={error.distribuidor && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                        </div>

                        <div className="contentInputs">
                           <p>Zonas Equipo ACF</p>
                           <select name="region" className='selectDistribuidor' defaultValue='/' onChange={handleChange} onBlur={handleBlur}>
                              <option disabled value="/">Elige una opción</option>
                              {Regiones.map((item, index) => (
                                 <>
                                    <option key={index} disabled value="/">{item.cabecera}</option>
                                    {item.zonas.map((zona, id) => (
                                       <option key={id} value={zona.region}>{zona.region}</option>
                                    ))}
                                 </>
                              ))}
                           </select>
                           <span className={error.region && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                        </div>
                     </div>

                     <div className="contentInputs">
                        <p>Correo Electrónico</p>
                        <input type="text" id='correo' name='correo' className='inputCorreo' placeholder='Correo Electrónico' onChange={handleChange} onBlur={handleBlur} /><br />
                        <span className={error.correo && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                     </div>

                     <div className="contentInputs">
                        <p>Celular</p>
                        <input type="number" id='celular' name='celular' className='inputCorreo' placeholder='Celular' onChange={handleChange} onBlur={handleBlur} /><br />
                        <span className={error.celular && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                     </div>

                  </div>
                  <button type="submit" className='buttonSubmit'>Registrarse</button>

                  <div className="seccionLoginRegistro">
                     <p>Ya estoy registrado</p>
                     <Link className='linkSeccion' to={RoutersLinks.Login}>Iniciar Sesion</Link>
                  </div>
               </form>

               {loading === true && <Loading />}

               {responseApi === false &&
                  <div className='alert danger'>
                     Tenemos un problema, Vuelve a intentarlo más tarde
                  </div>
               }

               {responseApi && data === "existe" &&
                  <div className='alert warning'>
                     <b>Este usuario ya se encuentra registrado</b>, Intenta iniciando sesión
                  </div>
               }

            </div>
         </div>
         <div className="imgPortada">
            <div className="navRegistrarse"></div>
            <img src={Imagenes.imgPortada} alt="" />
         </div>
      </div>
   );
};

export default Registrarse;
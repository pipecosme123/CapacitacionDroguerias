import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { drogerias, Regiones } from '../Constantes/ConstRegistros';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useForm } from '../hooks/useForm';
import '../css/Registrarse.css';
import Loading from '../Componentes/Loading';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialForm = {
   accessAPI: "Registrarse",
   correo: "",
   distribuidor: "/",
   region: "/",
   celular: "",
   codigo: ""
}

const validationForm = (form) => {
   let errors = {};

   if (form["distribuidor"] === "/") {
      errors["distribuidor"] = true;
   }

   if (form["region"] === "/") {
      errors["region"] = true;
   }

   if (!form["correo"].trim()) {
      errors["correo"] = "Debes llenar este campo para continuar";
   }else if(Object.values(form.correo).length > 70){
      errors["correo"] = `Has superado el límite máximo de caracteres permitidos. Caracteres: ${Object.values(form.correo).length}/70`;
   }


   if (!form["celular"].trim()) {
      errors["celular"] = "Debes llenar este campo para continuar";
   }else if(Object.values(form.celular).length > 15){
      errors["celular"] = `Has superado el límite máximo de caracteres permitidos. Caracteres: ${Object.values(form.celular).length}/15`;
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
                           <p>Distribuidor que lo atiende <span>*</span></p>
                           <select name="distribuidor" className='selectDistribuidor' defaultValue='/' onChange={handleChange} onBlur={handleBlur}>
                              <option disabled value="/">Elige una opción</option>
                              {drogerias.map((item, index) => (
                                 <option key={index} value={item.distr}>{item.distr}</option>
                              ))}
                           </select> <br />
                           <span className={error.distribuidor && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                        </div>

                        <div className="contentInputs">
                           <p>Zonas Equipo ACF <span>*</span></p>
                           <select name="region" className='selectDistribuidor' defaultValue='/' onChange={handleChange} onBlur={handleBlur}>
                              <option disabled value="/">Elige una opción</option>
                              <option value={"OCC"}>OCC</option>
                              {Regiones.map((item, index) => (
                                 <>
                                    <option key={index} disabled value="/">{item.cabecera}</option>
                                    {item.zonas.map((zona, id) => (
                                       <option key={id} value={zona.region}>{zona.region}</option>
                                    ))}
                                 </>
                              ))}
                           </select> <br />
                           <span className={error.region && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                        </div>

                        <div className="contentInputs">
                           <p>Código IPV ACF <span>(opcional)</span></p>
                           <input type="text" id='codigo' name='codigo' className='inputCorreo' placeholder='Código IPV ACF' onChange={handleChange} onBlur={handleBlur} /><br />
                           <span className={error.correo && showErrors ? "errorText" : "noShow"}>Debes llenar este campo para continuar</span><br />
                        </div>
                     </div>

                     <div className="contentInputs">
                        <p>Correo Electrónico <span>*</span></p>
                        <input type="text" id='correo' name='correo' className='inputCorreo' placeholder='Correo Electrónico' onChange={handleChange} onBlur={handleBlur} /><br />
                        <span className={error.correo && showErrors ? "errorText" : "noShow"}>{error.correo}</span><br />
                     </div>

                     <div className="contentInputs">
                        <p>Celular <span>*</span></p>
                        <input type="number" id='celular' name='celular' className='inputCorreo' placeholder='Celular' onChange={handleChange} onBlur={handleBlur} /><br />
                        <span className={error.celular && showErrors ? "errorText" : "noShow"}>{error.celular}</span><br />
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
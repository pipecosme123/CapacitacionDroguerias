import React from 'react';
import { Imagenes } from '../Constantes/Imagenes';
import '../css/Registrarse.css';

const Registrarse = () => {

   let drogerias = [
      { distr: "Copidrogas" },
      { distr: "Copservir Ltda" },
      { distr: "Unidrogas S.A." },
      { distr: "Eticos" },
      { distr: "Farmatodo" },
      { distr: "Cruz Verde" },
      { distr: "Deposito" },
      { distr: "Axa" },
      { distr: "Drosan Ltda" },
      { distr: "Roma" },
      { distr: "Pasteur" },
      { distr: "Locatel" },
      { distr: "Internacional" },
      { distr: "Multidrogas" },
      { distr: "Medimarcas" },
      { distr: "Drocentro Ltda" },
      { distr: "Colsubsidio" },
   ];

   return (
      <div className='Registrarse'>
         <div className="imgPortada">
            <div className="navRegistrarse"></div>
            <img src={Imagenes.imgPortada} alt="" />
         </div>
         <div className="formRegistrarse">
            <h1>Iniciar Sesión</h1>
            <form action="">
               <div>
                  <p>Distribuidor que lo atiende</p>
                  <select name="distribuidor" className='selectDistribuidor'>
                     {drogerias.map((item, index) => (
                        <option key={index} value={item.distr}>{item.distr}</option>
                     ))}
                  </select>
                  <input type="text" id='inputCorreo' name='inputCorreo' className='inputCorreo' placeholder='Correo Electrónico' /><br />
               </div>
               <div>
                  <p>Correo Electrónico</p>
                  <input type="text" id='inputCorreo' name='inputCorreo' className='inputCorreo' placeholder='Correo Electrónico' /><br />
               </div>
               <div>
                  <p>Celular</p>
                  <input type="number" id='celular' name='celular' className='inputCorreo' placeholder='Correo Electrónico' /><br />
               </div>
               <button type="submit" className='buttonSubmit'>Ingresar</button>
            </form>
         </div>
      </div>
   );
};

export default Registrarse;
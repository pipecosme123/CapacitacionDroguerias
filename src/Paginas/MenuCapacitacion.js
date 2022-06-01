import React, { useEffect, useState } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MenuCap } from '../Constantes/Capacitaciones';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import '../css/MenuCapacitacion.css';
import { useForm } from '../hooks/useForm';

const MenuCapacitacion = () => {

   const {
      descargaMaterial
   } = useForm();

   const [productos, setProductos] = useState({
      SensitiveProAlivio: "NO",
      Periogard: "NO",
      Orthogard: "NO",
      Total12: "NO",
      LuminousWhite: "NO"
   });

   let url = RoutersLinks.Capacitacion.split('/');

   const vistoVideo = () => {

      let datos = JSON.parse(window.localStorage.getItem('data'));

      setProductos({
         SensitiveProAlivio: datos.SensitiveProAlivio,
         Periogard: datos.Periogard,
         Orthogard: datos.Orthogard,
         Total12: datos.Total12,
         LuminousWhite: datos.LuminousWhite
      })

   }

   useEffect(() => {
      vistoVideo();
   }, []);

   return (
      <div className='MenuCapacitacion'>
         <div className="Content">
            <h1 className='titulo'>Capacitaciones</h1>

            <div className="menuVideos">
               {MenuCap.map((item, index) => (

                  <div key={index} className={`capVideos ${productos[item.tituloAPI] === "SI" ? "visto" : "noVisto"}`}>

                     {productos[item.tituloAPI] === "SI" ?
                        <div className="status Check">
                           <AiOutlineCheck />
                           <p>Revisado</p>
                        </div>
                        :
                        <div className="status Close">
                           <AiOutlineClose />
                           <p>Sin Revisar</p>
                        </div>
                     }

                     <div className="nameContent">
                        <div className="imgContent">
                           <img src={item.imagen} alt="" />
                        </div>
                        <h3>{item.titulo}</h3>
                     </div>

                     {productos[item.tituloAPI] === "SI" &&
                        <div onClick={() => descargaMaterial(item.descarga, item.nombreDescarga)} className='descargaMaterial'> <MdFileDownload /> </div>
                     }
                     <Link to={`/${url[1]}/${index}`} className='verCapacitacion'>Ver ahora</Link>

                     <div className="buttonsMobile">
                        {productos[item.tituloAPI] === "SI" &&
                           <div onClick={() => descargaMaterial(item.descarga, item.nombreDescarga)} className='descargaMaterial mobile'> <MdFileDownload /> </div>
                        }
                        <Link to={`/${url[1]}/${index}`} className='verCapacitacion mobile'>Ver ahora</Link>
                     </div>
                  </div>

               ))}
            </div>
         </div>
      </div>
   );
};

export default MenuCapacitacion;
import React, { useEffect, useState } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { Imagenes } from '../Constantes/Imagenes';
import { Capacitaciones, MenuCap } from '../Constantes/Capacitaciones';
import ReactPlayer from 'react-player';
import Quiz from '../Componentes/Quiz';
import '../css/Capacitacion.css';
import { useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Cookies from 'universal-cookie';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useApi } from '../hooks/useApi';
import Loading from '../Componentes/Loading';
import { toast, Toaster } from 'react-hot-toast';

const cookies = new Cookies();

const Capacitacion = () => {

   const { loading, api_handleSubmit } = useApi();
   const [capacitacion, setCapacitacion] = useState({});

   const { id } = useParams();
   const video = parseInt(id);
   const cantProductos = JSON.parse(localStorage.getItem('videos')).length;

   // const handleCapacitacion = () => {
   //    if (video < 4) {
   //       setMasTexto(false);
   //       window.location.pathname = `/Capacitacion/${video + 1}`;
   //    } else {
   //       setMasTexto(false)
   //       window.location.pathname = RoutersLinks.Menu;
   //    }
   // }

   // const postVistoVideo = () => {

   //    let form = {
   //       method: 'post',
   //       url: "ViewCapacitacion",
   //       producto: { id }
   //    }

   //    api_handleSubmit(form)
   //       .then(() => {

   //       })
   //       .catch(() => {

   //       });
   // }

   const endVideo = () => {
      const form = {
         method: 'post',
         url: 'viewVideo',
         params: { id: video }
      }

      api_handleSubmit(form)
         .then((res) => {
            toast.success(res.data, {
               duration: 10000,
               position: 'top-center'
            })
         })
         .catch((err) => {
            toast.error(err.data, {
               duration: 7000,
               position: 'top-center'
            })
         });
   }

   const get_video = () => {
      const form = {
         method: 'get',
         url: 'producto',
         params: { id: video }
      }

      api_handleSubmit(form)
         .then((res) => {
            setCapacitacion(res.data);
         })
         .catch((err) => {
            toast.error(err.data, {
               duration: 7000,
               position: 'top-center'
            })
         });
   }

   useEffect(() => {
      get_video();
   }, []);

   return (
      <div className='Capacitacion'>

         <div className="video">
            <div className="Content">
               <h1 className='tituloVideo'>{capacitacion.nombre}</h1>
               <div className="video-responsive">
                  <ReactPlayer
                     url={capacitacion.video}
                     config={{
                        vimeo: {
                           controls: true,
                           playsinline: false,
                           quality: 'auto'
                        }
                     }}
                     volumen={1}
                     controls
                     onEnded={() => endVideo()}
                  />
               </div>
            </div>

         </div>

         <div className="informacion Content">
            <div>
               <div className="conten-buttons">
                  {video - 1 !== 0 &&
                     <button className="navigation">ANTES</button>
                  }
               </div>
               <div className="conten-buttons">
                  <button className="navigation"></button>
               </div>
               <div className="conten-buttons">
                  {video !== cantProductos &&
                     <button className="navigation">DESPUES</button>
                  }
               </div>
            </div>
            <div>
               <h3 className='titulo'>Descripción</h3>
               <div className="descripcion">
                  <div className='texto'>
                     <p>
                        {capacitacion.texto}
                        <br />
                     </p>
                  </div>
               </div>
            </div>

         </div>

         {loading === true && <Loading />}
         <Toaster />

      </div>
   );
};

export default Capacitacion;
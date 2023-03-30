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

const cookies = new Cookies();

const Capacitacion = () => {

   const [masTexto, setMasTexto] = useState(false);
   const [showQuiz, setShowQuiz] = useState(false);

   const {
      handleShowCapacitacion,
      descargaMaterial
   } = useForm();

   let { id } = useParams();

   let video = parseInt(id);

   let contentCap = Capacitaciones[video];
   let dowloadFile = MenuCap[video]

   const handleCapacitacion = () => {
      // console.log(video);
      if (video < 4) {
         // setVideo(video + 1);
         setShowQuiz(false);
         setMasTexto(false);
         window.location.pathname = `/Capacitacion/${video + 1}`;
      } else {
         setShowQuiz(false);
         setMasTexto(false)
         window.location.pathname = RoutersLinks.MenuCapacitacion;
      }
   }

   const getProducto = (idVideo) => {
      let producto;

      if (idVideo === 0) {
         producto = "SensitiveProAlivio";
      }
      else if (idVideo === 1) {
         producto = "Periogard";
      }
      else if (idVideo === 2) {
         producto = "Orthogard";
      }
      else if (idVideo === 3) {
         producto = "Total12";
      }
      else if (idVideo === 4) {
         producto = "LuminousWhite";
      }

      // console.log(producto, idVideo);
      return producto;
   }

   const viewQuiz = () => {

      let textApiVideo = getProducto(parseInt(id));
      let apiVideo = JSON.parse(window.localStorage.getItem('data'));

      if (apiVideo[textApiVideo] === "NO") {
         postVistoVideo();
      }
      changeLocalStorage();
      setShowQuiz(true)
   }

   const postVistoVideo = () => {
      let idUduario = cookies.get("idUsuario");
      let idVideo = video + 1;

      let datosCapacitacion = {
         url: "ViewCapacitacion",
         idUsuario: idUduario,
         idProducto: idVideo
      }
      handleShowCapacitacion(datosCapacitacion);
   }

   const changeLocalStorage = () => {

      let textApiVideo = getProducto(parseInt(id));
      let apiVideo = JSON.parse(window.localStorage.getItem('data'));

      apiVideo[textApiVideo] = "SI";

      window.localStorage.setItem('data', JSON.stringify(apiVideo));

   }

   useEffect(() => {

   }, []);

   return (
      <div className='Capacitacion'>

         <div className="video">
            <div className="Content">
               <h1 className='tituloVideo'>{contentCap.titulo}</h1>
               <div className="video-responsive">
                  <ReactPlayer
                     url={contentCap.video}
                     config={{
                        vimeo: {
                           controls: true,
                           playsinline: false,
                           quality: 'auto'
                        }
                     }}
                     volumen={1}
                     controls
                     onEnded={() => viewQuiz()}
                  />
               </div>
            </div>

         </div>

         <div className="informacion Content">
            <div>
               <h3 className='titulo'>Descripción</h3>
               <div className="descripcion">
                  <div className='texto'>
                     <p>
                        {masTexto ? contentCap.descripcion : contentCap.descripcionCorta}
                        <br />
                        <button onClick={() => setMasTexto(!masTexto)}>
                           {masTexto ? "Ver menos" : "Ver más"}
                           <br />
                           {masTexto ? <RiArrowUpSFill /> : <RiArrowDownSFill />}

                        </button>
                     </p>
                  </div>

                  <div className="material">
                     <h3>Material de estudio</h3>

                     <div className="descargaMaterial" onClick={() => descargaMaterial(dowloadFile.descarga, dowloadFile.nombreDescarga)}>
                        <img src={Imagenes.iconoPdf} alt="" />
                        <div className="textoMaterial">
                           <h5>Descargar <MdFileDownload className='iconSvg' /></h5>
                           <p>Infografia {contentCap.titulo}</p>
                        </div>
                     </div>

                  </div>

               </div>
            </div>

         </div>

         {showQuiz &&
            <div className="Content">
               <Quiz idVideoC={id} nombreQuiz={contentCap.nombreQuiz} handleCapacitacion={handleCapacitacion} />
            </div>
         }
      </div>
   );
};

export default Capacitacion;
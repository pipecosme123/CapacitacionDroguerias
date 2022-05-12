import React, { useState } from 'react';
import { MdFileDownload, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { Imagenes } from '../Constantes/Imagenes';
import { Capacitaciones } from '../Constantes/Capacitaciones';
import ReactPlayer from 'react-player';
import Quiz from '../Componentes/Quiz';
import '../css/Capacitacion.css';

const Capacitacion = () => {

   const [masTexto, setMasTexto] = useState(false);
   const [showQuiz, setShowQuiz] = useState(false);

   const [video, setVideo] = useState(0);

   let contentCap = Capacitaciones[video];
   // let contentPrev = Capacitaciones[video - 1].titulo;
   // let contentNext = Capacitaciones[video + 1].titulo;
// 
   const hadleCapacitacion = () => {
      console.log(video);
      if(video < 4){
         setVideo(video + 1);
         setShowQuiz(false);
         setMasTexto(false)
      }else{
         setVideo(0);
         setShowQuiz(false);
         setMasTexto(false)
      }
   }

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
                     controls
                     onEnded={() => setShowQuiz(true)}
                  />
               </div>
            </div>
            {/* <div className="botonesVideos">
               <div className="botonPrev">
                  <MdOutlineArrowBackIosNew />
                  <h3>{contentPrev}</h3>
               </div>
               <div className="botonNext">
                  <MdOutlineArrowForwardIos />
                  <h3>{contentNext}</h3>
               </div>
            </div> */}
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
                     <div className="descargaMaterial">
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
               <Quiz nombreQuiz={contentCap.nombreQuiz} hadleCapacitacion={hadleCapacitacion} />
            </div>
         }
      </div>
   );
};

export default Capacitacion;
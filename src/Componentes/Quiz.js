import React, { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { PreguntasQuiz } from '../Constantes/PreguntasQuiz';
import '../css/Quiz.css';

const Quiz = ({ nombreQuiz, hadleCapacitacion }) => {

   const [numPregunta, setNumPregunta] = useState(0);
   const [score, setScore] = useState(0);
   const [next, setNext] = useState(false);

   let pregunta = PreguntasQuiz[nombreQuiz][numPregunta];
   let countPreguntas = Object.keys(PreguntasQuiz[nombreQuiz]).length;

   const [classButton, setClassButton] = useState([]);

   const mostrarRespuestas = (position) => {

      let nunRespuestas = pregunta.opciones.length;
      let newArray = [];

      for (let i = 0; i < nunRespuestas; i++) {
         if (position === i) {
            if (pregunta.opciones[i].respuesta === true) {
               newArray[i] = "correcto";
               setScore(score + 1);
            } else {
               newArray[i] = "incorrectoSeleccionada";
            }
         } else {
            if (pregunta.opciones[i].respuesta === true) {
               newArray[i] = "correcto";
            } else {
               newArray[i] = "incorrectoSinSeleccionar";
            }
         }
      }

      console.log(newArray);

      setClassButton(newArray);
      setNext(true);
   }

   const siguientePregunta = (valor) => {

      if (numPregunta < countPreguntas) {
         setNumPregunta(numPregunta + 1);
         setClassButton([]);
         setNext(false);
      }
      console.log(numPregunta, countPreguntas, numPregunta < countPreguntas);
   }

   const changeVideo = () => {
      hadleCapacitacion();
   }

   // useEffect(() => {
   //    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   //    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

   //    window.onscroll = function () {
   //       window.scrollTo(scrollLeft, scrollTop);
   //    };
   // }, []);

   return (
      <>
         <div className={"Overlay opaco"} ></div>

         <div className='Quiz'>
            <h1>Cuestionario</h1>

            {numPregunta < countPreguntas ?
               <>
                  <h3>Pregunta #{numPregunta + 1}</h3>
                  <p>{pregunta.pregunta}</p>

                  {pregunta.opciones.map((opt, index) => (
                     <div key={index} className="opcionesRespuestas">
                        <button className={`opciones ${classButton[index] && classButton[index]}`} onClick={() => !next && mostrarRespuestas(index)}>
                           {opt.texto}
                        </button>
                     </div>
                  ))}

                  <hr />

                  <button className={`siguientePregunta ${!next && 'disable'}`} onClick={() => next && siguientePregunta()}> {/* disable */}
                     Siguiente <HiChevronDoubleRight />
                  </button>
               </>
               :
               <>
                  <h1 className="texto">Tu Resultado</h1>
                  <h1 className="respuestasCorrectas">{`${score}/${countPreguntas}`}</h1>
                  <hr />
                  <button className={`siguientePregunta`} onClick={() => changeVideo()}>
                     Continuar <HiChevronDoubleRight />
                  </button>
               </>
            }
         </div>
      </>
   );
};

export default Quiz;

/*

correcto
{items.opciones.length === 2 ?
                  <div className="opcionesRespuestas">
                     <button className='opciones correcto'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                  </div>
                  :
                  <div className="opcionesRespuestas">
                     <button className='opciones correcto'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSeleccionada'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                  </div>}
*/
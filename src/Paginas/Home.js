import React from 'react';
import { Imagenes, slider } from '../Constantes/Imagenes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../css/Home.css';

const Home = () => {
   return (
      <div className='Home'>
         <div className="sliders">
            <div className="Content">
               <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
               >
                  {slider.map((img, index) => (
                     <SwiperSlide key={index}>
                        <img src={img.imgSlider} alt="" />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
         <div className="informacionPrincipal">
            <div className="Content">
               <div className="informaciones">
                  <div className="informacion">
                     <img src={Imagenes.videos} alt="" />
                     <h3>Vídeos Explicativos</h3>
                     <p>Videos cortos referentes a los productos Colgate, donde se explican; formulación, beneficios y recomendaciones, de acuerdo a cada condición.</p>
                     <p>Los videos tienen una duración no mayor a 4 minutos.</p>
                  </div>
                  <div className="informacion">
                     <img src={Imagenes.encuesta} alt="" />
                     <h3>Encuesta Evaluativa</h3>
                     <p>Al final de cada video responde una breve encuesta, que te ayudará a fortalecer lo aprendido, con preguntas de selección múltiple.</p>
                  </div>
                  <div className="informacion">
                     <img src={Imagenes.descarga} alt="" />
                     <h3>Materiales para Descargar</h3>
                     <p>Este material es una guía práctica que podrá descargar una vez finalice la encuesta, que contiene la información resumida de cada producto Colgate.</p>
                     <p>Así podrá tener la información  a la mano.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
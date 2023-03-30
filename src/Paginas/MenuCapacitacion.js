import React, { useEffect, useState } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MenuCap } from '../Constantes/Capacitaciones';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import '../css/MenuCapacitacion.css';
import { useForm } from '../hooks/useForm';
import { useApi } from '../hooks/useApi';
import Loading from '../Componentes/Loading';

const MenuCapacitacion = () => {

   const { loading, api_handleSubmit } = useApi();

   const [productos, setProductos] = useState({
      SensitiveProAlivio: "",
      Periogard: "",
      Orthogard: "",
      Total12: "",
      LuminousWhite: ""
   });

   const [menuCap, setMenuCap] = useState([]);


   let url = RoutersLinks.Capacitacion.split('/');

   const vistoVideo = () => {
      const form = {
         method: 'get',
         url: 'productos',
      }

      api_handleSubmit(form)
         .then((res) => {
            localStorage.setItem('videos', JSON.stringify(res.data));
            setMenuCap(res.data);
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   useEffect(() => {
      vistoVideo();
   }, []);

   return (
      <div className='MenuCapacitacion'>
         <div className="Content">
            <h1 className='titulo'>Capacitaciones</h1>

            <div className="menuVideos">
               {menuCap.map((item, index) => (

                  <div key={index} className={`capVideos ${item.visto === true ? "visto" : "noVisto"}`}>

                     {item.visto === true ?
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
                           <img src={item.imagenes} alt="" />
                        </div>
                        <h3>{item.nombre}</h3>
                     </div>

                     <Link to={`${item.id}`} className='verCapacitacion'>Ver ahora</Link>

                     <div className="buttonsMobile">
                        <Link to={`${item.id}`} className='verCapacitacion mobile'>Ver ahora</Link>
                     </div>
                  </div>

               ))}
            </div>
         </div>
         {loading === true && <Loading />}
      </div>
   );
};

export default MenuCapacitacion;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../Componentes/NavBar';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Capacitacion from '../Paginas/Capacitacion';
import Home from '../Paginas/Home';
import Login from '../Paginas/Login';
import Material from '../Paginas/Material';
import MenuCapacitacion from '../Paginas/MenuCapacitacion';
import Registrarse from '../Paginas/Registrarse';

const RouterDom = () => {

   let pathName = window.location.pathname;

   return (
      <>
         {pathName !== RoutersLinks.Login &&
            pathName !== RoutersLinks.Registrarse &&
            <NavBar />
         }
         
         <Routes>
            <Route exact path={RoutersLinks.Login} element={<Login />} />
            <Route exact path={RoutersLinks.Registrarse} element={<Registrarse />} />
            {/* </Router>

         <Router> */}
            <Route exact path={RoutersLinks.Home} element={<Home />} />
            <Route exact path={RoutersLinks.MenuCapacitacion} element={<MenuCapacitacion />} />
            <Route exact path={RoutersLinks.Capacitacion} element={<Capacitacion />} />
            <Route exact path={RoutersLinks.Material} element={<Material />} />
         </Routes>
      </>
   );
};

export default RouterDom;
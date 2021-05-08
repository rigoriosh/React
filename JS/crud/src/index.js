import React from 'react';
import ReactDOM from 'react-dom';
import './css/frame-css.css';
import './css/dataTable.css'
import Login from './pages/Login'

//import {Busquedaproyectos} from './components/Busquedaproyectos'
import Projectsearch from './pages/Projectsearch'

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
import ModuloAdministracion from './pages/ModuloAdministracion';
import { Footer } from './components/Footer';
moment.locale('es');

// <React.StrictMode>

ReactDOM.render(
  <>
    {/* <App /> */}    
    <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina admistración del sistema</div>
    <ModuloAdministracion />    
    {/* <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina buscar proyectos</div>
    <Projectsearch /> */}
    <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina Login</div>
    <Login />
    <Footer/>
    
    
  </>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './css/frame-css.css';
import Login from './components/Login'

//import {Busquedaproyectos} from './components/Busquedaproyectos'
import Projectsearch from './components/Projectsearch'

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

// <React.StrictMode>

ReactDOM.render(
  <>
    {/* <App /> */}    
    <Login />
    <div style={{height: '10px', background: 'black'}}></div>
    <Projectsearch />
    <div style={{height: '10px', background: 'black'}}></div>
    
    
  </>,
  document.getElementById('root')
);

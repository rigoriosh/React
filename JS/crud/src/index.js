import React from 'react';

import ReactDOM from 'react-dom';
import './css/frame-css.css';
import './css/dataTable.css'
import Prorratas from './Prorratas';

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

ReactDOM.render(
  <React.StrictMode>
    {/* <MiniDrawer /> */}
    {/* <App /> */}    
    {/* <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina admistración del sistema</div> */}
    {/* <ModuloAdministracion /> */}    
    {/* <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina buscar proyectos</div>
    <Projectsearch />
    <div style={{height: '20px', background: 'black', color: 'white', textAlign: 'center'}}>Pagina Login</div>
    <Login /> */}
    <Prorratas />
    
    
    
    </React.StrictMode>,
  document.getElementById('root')
);

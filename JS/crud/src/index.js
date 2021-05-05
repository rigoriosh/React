import React from 'react';
import ReactDOM from 'react-dom';
import './css/frame-css.css';
import Capchat from './Capchat'
import MenuNavBar from './components/MenuNavBar'

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Capchat />
    <MenuNavBar />
  </React.StrictMode>,
  document.getElementById('root')
);

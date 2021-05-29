import React from 'react';
import ReactDOM from 'react-dom';

import 'overlayscrollbars/css/OverlayScrollbars.css';
import './css/frame-css.css';
import './css/dataTable.css'
import ProrratasApp from './ProrratasApp';
import OverlayScrollbars from 'overlayscrollbars';

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');



ReactDOM.render( < ProrratasApp /> , document.getElementById('root'));

/* 
OverlayScrollbars(document.body, {
    nativeScrollbarsOverlaid: {
        initialize: false
    }
}); */
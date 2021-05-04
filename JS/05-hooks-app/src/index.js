import React from 'react';
import ReactDOM from 'react-dom';
//import { MainApp } from './components/09-useContext/MainApp';
//import { HookApp } from './HookApp';
//import {App} from './App'
import Capchat from './compPruebas/Capchat'
import './css/index.css';
import './css/frame-css.css'

ReactDOM.render(
  <React.StrictMode>
    {/* <HookApp/> */}
    {/* <MainApp/>     */}
    {/* <App/> */}
    <Capchat/>
  </React.StrictMode>,
  document.getElementById('root')
);



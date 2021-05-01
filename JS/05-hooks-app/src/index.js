import React from 'react';
import ReactDOM from 'react-dom';
//import { MainApp } from './components/09-useContext/MainApp';
//import { HookApp } from './HookApp';
import {App} from './App'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <HookApp/> */}
    {/* <MainApp/>     */}
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);



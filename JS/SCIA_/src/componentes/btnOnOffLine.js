import React from 'react'
import {FaWifi} from 'react-icons/fa'
import './estilos/btnOnOffLine.css'

//Cada que cambia offLine de principal es llamado este metodo
//No se utiliza la variable porque se ejecuta varias veces y no trae un valor estable
//Mas sin embargo sirve como marcador de que ha ocurrido un cambio de
export const btnOnLine = (offLine) => {
    let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
    if(sinInternet.modeOffline){
        return <div id="offLine"><FaWifi id="circuloOffLine"/></div>   
    }else{
        return <div id="onLine"><FaWifi id="circuloOnLine"/></div>     
    }
}
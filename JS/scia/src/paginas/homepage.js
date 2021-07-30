import React from 'react'
import { Actividad } from "../actividades/Actividad"


const homepage = () =>{
/*
function objeto (){
    JSON.parse(window.localStorage.getItem('logearUsuario'))
}*/

    return(
        <div style={{height:'100%'}}>
            <div>{`Bienvendio a la homepage`}</div>
            <Actividad/>
        </div>
    )
}

export default homepage
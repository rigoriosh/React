import React, { useState } from 'react'
import { Actividad } from "../actividades/Actividad"
import { EjecutarActividad } from '../ejecutarActividad/EjecutarActividad';


const Homepage = () =>{
/*
function objeto (){
    JSON.parse(window.localStorage.getItem('logearUsuario'))
}*/
const [viewToSee, setViewToSee] = useState('');

const viewSelected = (target) => {
    setViewToSee(target.value)
}


    return(
        
        <div style={{height:'100%'}}>
           <div>{`Bienvendio a la homepage`}</div>
            <div>
                <p style={{fontWeight:'bold'}}>Vista a revisar</p>
                <div>
                    <select onChange={({target})=>viewSelected(target)} name="unitMeasurement"  className="form-select form-select-sm mb-3" aria-label=".form-select-sm ">
                    <option value="">Select view to see</option>
                        <option value="Actividad">Actividades</option>
                        <option value="EjecutarActividad">Ejecutar Actividad</option>
                    </select>
                </div>
            </div>
            {
                viewToSee === "Actividad" && <Actividad/>
            }
            {
                viewToSee === "EjecutarActividad" && <EjecutarActividad/>
            }
            
        </div>
    )
}

export default Homepage


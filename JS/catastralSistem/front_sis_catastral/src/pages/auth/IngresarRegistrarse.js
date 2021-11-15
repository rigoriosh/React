import React from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";

export const IngresarRegistrarse = () => {
    let navigate = useNavigate();
    return (
        <div style={{height:'100vh'}}>
            <h5>IngresarRegistrarse</h5>
            <button onClick={()=>{navigate("/login");}}>Ingresar</button>
            <button onClick={()=>{navigate("/sigin");}}>Registrarse</button>
        </div>
    )
}

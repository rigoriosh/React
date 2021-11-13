import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

export const Signin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre:'',
        apellido:'',
        tipoDocumento:'',
        numeroDocumento:'',
        departamento:'',
        municipio:'',
        direccionResidencia:'',
        numeroContacto:'',
        direccionResidencia:'',
        telefonoContacto:'',
        correo:'',
        confirmarCorreo:'',
        pass:'',
        confPass:''
    })
    const crearUsuario = async() => {
        if (validateForm()) {
            // TODO: ENVIAR AL BACK
            try {
                const url = 'https://api.themoviedb.org/3/movie/550?api_key=568f0c60273063c49307f18b57ce33fd';
                const response = await fetch(url);
                const respoJson = await response.json();
                console.log(respoJson);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const validateForm = () => {

        return true;
    }
    return (
        <div style={{paddingLeft:'40%'}}>
            <h1>Crear Usuario</h1>
            <div style={{display:'flex', /* justifyContent:'center' */}}>
                <div style={{display:'flex', justifyContent:'space-evenly', width:'50%'}}>
                    <label htmlFor="nombre">NOMBRE</label>
                    <input type="text" name="nombre" id="nombre" />
                </div>
                <div style={{display:'flex', justifyContent:'space-evenly', width:'50%'}}>
                    <label htmlFor="nombre">NOMBRE</label>
                    <input type="text" name="nombre" id="nombre" />
                </div>
            </div>
            <button onClick={()=>crearUsuario()}>Crear</button>
            {/* <button onClick={()=>{navigate("/");}}>Crear</button> */}
            <button onClick={()=>{navigate("/");}}>Cancelar</button>
        </div>
    )
}

import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { NoMatch } from '../componets/NoMatch';
import { pathsRoutes } from '../helpers/utils';
import { ConsultarUsuarios } from '../pages/tramites/crearUsuario/ConsultarUsuarios';
import { CrearUsuariosInterno } from '../pages/tramites/crearUsuario/CrearUsuariosInterno';

export const GestionarUsuariosRoute = () => {
    
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        // console.log("in GestionarUsuariosRoute")
        // console.log(location);
        return () => {}
    }, [/* location */]);


    if (location.pathname === pathsRoutes.gestionarUsuario) {
        return (
            <div>
                <h4>GestionarUsuariosRoute</h4>
                <button onClick={()=>{navigate("/tramites/gestionarUsuario/crearUsuario");}}>Crear usuario</button>
                <button onClick={()=>{navigate("/tramites/gestionarUsuario/consultarUsuarios");}}>Consultar usuario</button>
            </div>
            
        )
        
    }

    return (
        <Routes>
            {/* <Route index element={<Home/>} /> */}
            <Route path="crearUsuario" element={<CrearUsuariosInterno/>} />
            <Route path="consultarUsuarios" element={<ConsultarUsuarios/>} />
            <Route path="*" element={<NoMatch/>} />
        </Routes>
    )


}

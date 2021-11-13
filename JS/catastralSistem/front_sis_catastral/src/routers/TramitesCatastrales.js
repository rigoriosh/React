import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { ConsultarTramite } from '../pages/tramites/ConsultarTramite';
import { CrearTramite } from '../pages/tramites/CrearTramite';
import { CrearUsuarios } from '../pages/tramites/crearUsuario/CrearUsuarios';
import { VerSolicitudes } from '../pages/tramites/verSolicitudes/VerSolicitudes';

export const TramitesCatastrales = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h5>TramitesCatastrales</h5>
            <button onClick={()=>{navigate("/");}}>Regresar</button>
            <Routes>
                <Route path="crear" element={<CrearTramite/>} />
                <Route path="consultar" element={<ConsultarTramite/>} />
                <Route path="crearUsuarios" element={<CrearUsuarios/>} />
                <Route path="verSolicitudes" element={<VerSolicitudes/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>
        </div>
    )
}

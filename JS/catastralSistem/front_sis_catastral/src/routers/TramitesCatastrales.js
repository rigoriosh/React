import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { ConsultarTramite } from '../pages/tramites/ConsultarTramite';
import { CrearTramite } from '../pages/tramites/CrearTramite';
import { GestionarUsuariosRoute } from './GestionarUsuariosRoute';
import { SeguimientoTramitre } from '../pages/tramites/seguimientoTramitre/SeguimientoTramitre';
import { Tramites } from '../pages/tramites/Tramites';
import { pathsRoutes } from '../helpers/utils';

export const TramitesCatastrales = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pathPrevius, setPathPrevius] = useState('/');

    useEffect(() => {
        // console.log(location)
        let previusPath = location.pathname.split('/');
        previusPath.pop();
        previusPath = previusPath.join('/');
        setPathPrevius(previusPath);
        return () => {}
    }, [location])
    return (
        <div>
            <h5>TramitesCatastrales</h5>
            {
                location.pathname !== pathsRoutes.tramites &&
                    <button onClick={()=>{navigate(pathPrevius)}}>Regresar</button>
            }
            <Routes>
                <Route index element={<Tramites/>} />
                {/* <Route path="tramites" element={<Tramites/>} /> */}
                <Route path="crear" element={<CrearTramite/>} />
                <Route path="consultar" element={<ConsultarTramite/>} />
                <Route path="gestionarUsuario/*" element={<GestionarUsuariosRoute/>} />
                <Route path="seguimientoTramitre" element={<SeguimientoTramitre/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>
        </div>
    )
}

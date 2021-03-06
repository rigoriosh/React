import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Fab from '@mui/material/Fab';

import { NoMatch } from '../componets/NoMatch';
import { ConsultarTramite } from '../pages/tramites/consultarTramites/ConsultarTramite';
import { CrearTramite } from '../pages/tramites/CrearTramite';
import { GestionarUsuariosRoute } from './GestionarUsuariosRoute';
import { SeguimientoTramitre } from '../pages/tramites/seguimientoTramitre/SeguimientoTramitre';
import { Tramites } from '../pages/tramites/Tramites';
import { pathsRoutes } from '../helpers/utils';
import PasodePagIzq_Icon from '../assets/Iconos/PasodePagIzq_Icon.png'

export const TramitesCatastrales = ({salir}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pathPrevius, setPathPrevius] = useState('/');

    useEffect(() => {
        let previusPath = location.pathname.split('/');
        previusPath.pop();
        previusPath = previusPath.join('/');
        setPathPrevius(previusPath);
        return () => {}
    }, [location])
    return (
        <div style={{display:'flex', flexDirection:'row', height:'100vh', justifyContent:'center', alignItems:'center' }}>
            {/* <h5>TramitesCatastrales</h5> */}
            {
                location.pathname !== pathsRoutes.tramites &&
                    // <button onClick={()=>{navigate(pathPrevius)}}>Regresar</button>
                    <Fab size="small" style={{backgroundColor:'rgb(168, 207, 69)', position:'absolute', left:'140px'}} aria-label="add" onClick={()=>{navigate(pathPrevius)}}>
                        <img className="imgWidth" src={PasodePagIzq_Icon} alt="" style={{width:'15px'}}/>
                    </Fab>
            }
            <Routes>
                <Route index element={<Tramites salir={salir}/>} />
                {/* <Route path="tramites" element={<Tramites/>} /> */}
                <Route path="crear" element={
                        <CrearTramite
                            key={'CrearTramite'}
                            detalleTramite={{}}
                            modoTramite="Nuevo"
                            tipoTramite="NuevoTramite"
                        />
                    }
                />
                <Route path="consultar" element={<ConsultarTramite/>} />
                <Route path="gestionarUsuario/*" element={<GestionarUsuariosRoute/>} />
                <Route path="seguimientoTramitre" element={<SeguimientoTramitre/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>
        </div>
    )
}

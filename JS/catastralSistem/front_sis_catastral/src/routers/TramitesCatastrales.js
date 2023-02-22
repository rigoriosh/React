import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Fab from '@mui/material/Fab';

import { NoMatch } from '../componets/NoMatch';
// import { ConsultarTramite } from '../pages/tramites/consultarTramites/ConsultarTramite';
import { CrearTramite } from '../pages/tramites/CrearTramite';
import { GestionarUsuariosRoute } from './GestionarUsuariosRoute';
import { SeguimientoTramitre } from '../pages/tramites/seguimientoTramitre/SeguimientoTramitre';
import { Tramites } from '../pages/tramites/Tramites';
import { formarPath, pathsRoutes } from '../helpers/utils';
import PasodePagIzq_Icon from '../assets/Iconos/PasodePagIzq_Icon.png'
import { ConsultaTramiteRoute } from '../pages/tramites/consultarTramites/ConsultaTramiteRoute';



export const TramitesCatastrales = ({salir/* , setOpenBackDrop */}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pathPrevius, setPathPrevius] = useState('/');
    // console.log("TramitesCatastrales L24");
    
    function handleClick(pathSelected) {
        navigate(formarPath(location, pathSelected));
    }

    useEffect(() => {
        let previusPath = location.pathname.split('/');
        previusPath.pop();
        previusPath = previusPath.join('/');
        setPathPrevius(previusPath);
        return () => {}
    }, [location])
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100vh', justifyContent:'center', alignItems:'center' }}>
            {/* <pre>
                {location.pathname}
            </pre> */}
            <div className='contTramistesCatas'>
                {/* <div className={location.pathname.split("/").length > 2 ? 'alingLeft':''}> */}
                {/* <div className={location.pathname.split("/").length > 2 ? '':''}> */}
                {
                    location.pathname.split("/").length > 2 &&
                        <div role="presentation" /* onClick={handleClick} */ className='breadcrumb'>
                            <Breadcrumbs aria-label="breadcrumb" color='white' key={"breadcrumb"}>
                                {
                                        location.pathname.split("/").map((path, i) =>
                                            <p underline="hover" color="white" href={path} onClick={()=>handleClick(path)} style={{fontWeight:'bold', color:'white'}}
                                            className={path !== location.pathname.split("/")[location.pathname.split("/").length-1] ? "pointer":""} key={path + i}>
                                                {path}
                                            </p>
                                    )
                                }                    
                            </Breadcrumbs>
                        </div>        
                }

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
                                // setOpenBackDrop={setOpenBackDrop}
                            />
                        }
                    />
                    <Route path="gestionarUsuario/*" element={<GestionarUsuariosRoute/>} />
                    {/* <Route path="seguimientoTramite" element={<SeguimientoTramitre/>} /> */}
                    <Route path="seguimientoTramite/*" element={<SeguimientoTramitre/>} />
                    {/* <Route path="consultar" element={<ConsultarTramite/>} /> */}
                    <Route path="consultaTramite/*" element={<ConsultaTramiteRoute/>} />
                    <Route path="*" element={<NoMatch/>} />
                </Routes>
            </div>
        </div>
    )
}

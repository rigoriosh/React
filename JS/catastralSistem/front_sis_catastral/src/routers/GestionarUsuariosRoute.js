import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { NoMatch } from '../componets/NoMatch';
import { pathsRoutes } from '../helpers/utils';
import { ConsultarUsuarios } from '../pages/tramites/crearUsuario/ConsultarUsuarios';
import { CrearUsuariosInterno } from '../pages/tramites/crearUsuario/CrearUsuariosInterno';
import GestiondeUS_IconVerde from '../assets/Iconos/GestiondeUS_IconVerde.png'
// import GestiondeUS_Buscar_Icon from '../assets/Iconos/GestiondeUS_Buscar_Icon.png'
import { GestionarUsuarios } from '../pages/tramites/crearUsuario/GestionarUsuarios';
import GestiondeUS_CrearUs_Icon from '../assets/Iconos/GestiondeUS_CrearUs_Icon.png'



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
            <div style={{backgroundColor:'white', width:'60%', padding:'20px', borderRadius:'20px'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img className="imgWidth" /* onClick={()=>{navigate("/login");}} */ 
                        src={GestiondeUS_IconVerde} alt="" style={{cursor:'pointer', alignSelf:'center', width:'70px'}}
                    />
                    <p className="titleTramites">Gestión de Usuario</p>
                </div>
                {/* <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <img className="imgWidth"  
                        src={GestiondeUS_Buscar_Icon} alt="" style={{cursor:'pointer', alignSelf:'center', width:'10px'}}
                    />
                    <input type="text" name="" id="" style={{border:'none', borderBottom:'solid 1px gray'}}/>
                </div> */}
                <GestionarUsuarios />
                <div  style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
                    <img onClick={()=>{navigate("/tramites/gestionarUsuario/crearUsuario")}} className="imgWidth" src={GestiondeUS_CrearUs_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
                    <p onClick={()=>{navigate("/tramites/gestionarUsuario/crearUsuario")}} className="color2 pointer">Crear Usuario</p>
                </div>
                {/* <button onClick={()=>{navigate("/tramites/gestionarUsuario/crearUsuario");}}>Crear usuario</button> */}
                {/* <button onClick={()=>{navigate("/tramites/gestionarUsuario/consultarUsuarios");}}>Consultar usuario</button> */}
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

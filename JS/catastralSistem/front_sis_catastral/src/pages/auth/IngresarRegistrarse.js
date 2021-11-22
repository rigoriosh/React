import React from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import iconIngresar from '../../assets/Iconos/Ingresar_Icon.png'
import registrarse from '../../assets/Iconos/Registrese_Icon.png'
import { LogoAsomunicipiosPagInicio } from '../../componets/LogoAsomunicipiosPagInicio';


export const IngresarRegistrarse = () => {
    let navigate = useNavigate();
    return (
        <div style={{height:'100vh', display:'flex', flexDirection:'column', paddingTop:'1%', alignItems:'center'}}>
            {/* <img src={LogoAsomunicipios_PagInicio} alt="" srcSet="" style={{width:'160px'}}/> */}
            <LogoAsomunicipiosPagInicio width={'160px'}/>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <h1 style={{color:'rgb(168, 207, 69)', fontSize:'100px'}}>BIENVENIDO</h1>
                <h2 style={{color:'white', fontFamily:'monospace', fontSize:'24px'}}>AL SISTEMA DE GESTIÓN CATASTRAL DE</h2>
                <h1 style={{color:'white', fontWeight:'bold'}}>ASOMUNICIPIOS - CATATUMBO</h1>
            </div>
            <div style={{display:'flex',justifyContent:'space-evenly', padding:'0 30%', marginTop:'30px', width:'100%'}}>
                <div style={{}}>
                    <img onClick={()=>{navigate("/login");}} src={iconIngresar} alt="" style={{cursor:'pointer', width:'120px'}}/>
                </div>
                {/* Separador | */}<div style={{backgroundColor:'white', width:'1px', }}></div>
                <div style={{}}>
                    <img onClick={()=>{navigate("/sigin");}} src={registrarse} alt="" style={{cursor:'pointer', width:'150px'}}/>
                </div>
            </div>
        </div>
    )
}

import React, { useContext, useEffect } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";

import Logo_Asomunicipios_ColorLetrablanca from '../assets/Iconos/Logo_Asomunicipios_ColorLetrablanca.png'
import GestiondeUS_Icon from '../assets/Iconos/GestiondeUS_Icon.png'
import SeguimientoaTramite_Icon from '../assets/Iconos/SeguimientoaTramite_Icon.png'
import Usuario_Icon from '../assets/Iconos/Usuario_Icon.png'
import CerrarSesion_Icon from '../assets/Iconos/CerrarSesion_Icon.png'
import ConsultarTramite_Icon from '../assets/Iconos/ConsultarTramite_Icon.png'
import CrearTramite_Icon from '../assets/Iconos/CrearTramite_Icon.png'
import { StoreContext } from '../App'
import { checkPermits, initStore, permits, textosInfoWarnig } from '../helpers/utils'


export const VerticalMenu = ({usuario, salir, renewToken}) => {
    const { store, updateStore} = useContext(StoreContext);
    const { user, tiempoInicioSession, } = store;

    let navigate = useNavigate();

    const cerrar = () => {
        updateStore({...initStore, llama:"L22FVerticalMenu"})
        salir();
    }

    useEffect(() => {
        // monitorea actividad del usuario
        let intervalSessionUser;
        intervalSessionUser = setInterval(() => {
            if (user.isLogin) { // calcula el tiempo del usuario
                const tiempoExpiracion = user.tiempoExpiracion;
                const currentTime = new Date().getTime();
                const timeDifference = currentTime -  tiempoInicioSession;

                /* console.log(`
                    ////////////VerticalMenu//////////***********
                    currentTime                         =   ${currentTime}
                    tiempoExpiracion                    =   ${tiempoExpiracion}
                    timeDifference                      =   ${timeDifference}
                    timeDifference >= tiempoExpiracion  =   ${timeDifference >= tiempoExpiracion}
                `)
                console.log(store) */
                if(timeDifference >= tiempoExpiracion){ // si vencio solicita nuevo usuario
                    // console.log("// cierra la sesion")
                    navigate("/tramites")
                    let cont = 0;
                    const contInter = setInterval(() => {
                        // console.log(cont)
                        cont++;
                        salir(textosInfoWarnig.tiempoInactividad);
                        if (cont === 2) {
                            clearInterval(contInter);
                        }
                    }, 2000);
                }

                
            }
        }, 600000);// cada 10 minutos 600000
        
        return () => {
            clearInterval(intervalSessionUser);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="verticalMenu" >
            <img className="imgWidth" /* onClick={()=>{navigate("/login");}} */ 
                src={Logo_Asomunicipios_ColorLetrablanca} alt="" style={{cursor:'pointer', alignSelf:'center'}}
            />
            <p className="titleTramites">TRÁMITES</p>
            <p className="titleCatasTrales">CATAS-</p>
            <p className="titleCatasTrales">TRALES</p>
            {
                checkPermits(permits[0].valor, store) &&
                    <div onClick={()=>{navigate("/tramites/gestionarUsuario");}} style={{cursor:'pointer', display:'flex', alignItems:'center', margin:'25px 0 25px 0'}}>
                        <img className="imgWidth" src={GestiondeUS_Icon} alt="" style={{width:'30px'}}/>
                        <p className="fz12px">Gestión de Usuario</p>
                    </div>
            }
            {
                checkPermits(permits[1].valor, store) &&
                    <div onClick={()=>{navigate("/tramites/seguimientoTramite");}} style={{cursor:'pointer', display:'flex', alignItems:'center'}}>
                        <img className="imgWidth" src={SeguimientoaTramite_Icon} alt="" style={{width:'30px'}}/>
                        <div>
                            <p className="fz12px">Seguimiento</p>
                            <p className="fz12px">Trámite</p>
                        </div>
                    </div>
            }
            {
                checkPermits(permits[2].valor, store) &&
                    <div onClick={()=>{navigate("/tramites/crear");}} style={{cursor:'pointer', display:'flex', alignItems:'center', margin:'25px 0 25px 0'}}>
                        <img className="imgWidth" src={CrearTramite_Icon} alt="" style={{width:'30px'}}/>
                        <p className="fz12px">Crear Trámite</p>
                    </div>
            }
            {
                checkPermits(permits[3].valor, store) &&
                    <div onClick={()=>{navigate("/tramites/consultar")}} style={{cursor:'pointer', display:'flex', alignItems:'center', margin:'25px 0 25px 0'}}>
                        <img className="imgWidth" src={ConsultarTramite_Icon} alt="" style={{width:'30px'}}/>
                        <p className="fz12px">Consultar Trámite</p>
                    </div>
            }
            <div style={{height:'100%'}}></div>
            <div className="logOut">
                <img className="imgWidth" /* onClick={()=>{navigate("/login");}} */ src={Usuario_Icon} alt="" style={{width:'40px'}}/>
                <p style={{fontSize:'14px'}}>{usuario.infoUser.nombre}</p>
                <p className="fz12px">{usuario.infoUser.numeroDocumento}</p>
                <div className="horizontalDivider"></div>
                <div style={{display:'flex'}} onClick={()=>cerrar()}>
                    <img className="imgWidth" src={CerrarSesion_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                    <p style={{alignSelf:'end', fontSize:'10px', margin:'5px 0 5px 5px', cursor:'pointer'}}>Cerrar sesión</p>
                </div>
            </div>
        </div>
    )
}

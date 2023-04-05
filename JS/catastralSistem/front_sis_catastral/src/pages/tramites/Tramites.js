import React, { useContext, useEffect,  } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { StoreContext } from '../../App';
import { VerticalDivider } from '../../componets/VerticalDivider';
import { checkPermits, permits,  } from '../../helpers/utils';

import GestiondeUS_Icon from '../../assets/Iconos/GestiondeUS_Icon.png'
import SeguimientoaTramite_Icon from '../../assets/Iconos/SeguimientoaTramite_Icon.png'
import ConsultarTramite_Icon from '../../assets/Iconos/ConsultarTramite_Icon.png'
import CrearTramite_Icon from '../../assets/Iconos/CrearTramite_Icon.png'




export const Tramites = ({children, salir}) => {
    let navigate = useNavigate();
    const { store, updateStore} = useContext(StoreContext);

    useEffect(() => {
        updateStore({...store, openBackDrop:false, llama:"L20FTramites"});
      return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    
    

    if (store.user.isLogin) {
        return (
            <div style={{display:'flex', justifyContent:'center'}}>
                {
                    checkPermits(permits[0].valor, store) &&
                    <div style={{display:'flex', alignItems:'center'}}>
                        <VerticalDivider m="0px 30px" height="60%"/>
                        <div style={{cursor:'pointer'}} onClick={()=>{ 
                            updateStore({...store, openBackDrop:true, llama:"L29FTramites"});
                            navigate("/tramites/gestionarUsuario");
                            }}>
                            <img src={GestiondeUS_Icon} alt="" style={{ width:'80px' }}/>
                            <p style={{color:'white', fontWeight:'bold'}}>Gestión</p>
                            <p style={{color:'white', fontWeight:'bold'}}>de Usuario</p>
                        </div>
                        <VerticalDivider m="0px 30px" height="60%"/>
                    </div>
                }
                {
                    checkPermits(permits[1].valor, store) &&
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{cursor:'pointer'}} onClick={()=>{
                            sessionStorage.removeItem('solicitudes')
                            setTimeout(() => {
                                updateStore({...store, openBackDrop:true, detalleTramite:{},llama:"L44FTramites"});
                                navigate("/tramites/seguimientoTramite");
                            }, 1000);
                            }}>
                        <img src={SeguimientoaTramite_Icon} alt="" style={{ width:'80px' }}/>
                            <div>
                                <p style={{color:'white', fontWeight:'bold'}}>Seguimiento a</p>
                                <p style={{color:'white', fontWeight:'bold'}}>Trámite</p>
                            </div>
                        </div>
                        <VerticalDivider m="0px 30px" height="60%"/>
                    </div>
                }
                {
                    checkPermits(permits[2].valor, store) &&
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{cursor:'pointer'}} onClick={()=>{
                            updateStore({...store, llama:"L61FTramites"});
                            navigate("/tramites/crear");
                            }}>
                            <img src={CrearTramite_Icon} alt="" style={{ width:'80px' }}/>
                            <p style={{color:'white', fontWeight:'bold'}}>Crear</p>
                            <p style={{color:'white', fontWeight:'bold'}}>Trámitre</p>
                        </div>
                        <VerticalDivider m="0px 30px" height="60%"/>
                    </div>
                }
                {
                    checkPermits(permits[3].valor, store) &&
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{cursor:'pointer'}} onClick={()=>{
                            sessionStorage.removeItem('solicitudes')
                            updateStore({...store, openBackDrop:true, detalleTramite:{},llama:"L75FTramites"});
                            navigate("/tramites/consultaTramite");
                            }}>
                        <img src={ConsultarTramite_Icon} alt="" style={{ width:'80px' }}/>
                            <div>
                                <p style={{color:'white', fontWeight:'bold'}}>Consultar</p>
                                <p style={{color:'white', fontWeight:'bold'}}>Trámite</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

    return children;
}

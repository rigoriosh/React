import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import PropTypes from 'prop-types'
import { getDiaMesAnio } from '../helpers/tiempo';
import '../css/menuNavbar.css'
import { salir } from '../acciones/login_action';
import { quitarProyecto } from '../acciones/proyecto_actions';
import { rutasModulos } from '../constantes/generales';
import { resetBreadCrumb, setHijoBreadCrumb } from '../acciones/breadcrumb_action';
import { useHistory } from 'react-router-dom';

const MenuNavBar = ({history}) => {
    console.log("MenuNavBar");
    //const history = useHistory();
    const dispatch = useDispatch();    
    const { proyecto_reducer, breadCrumb_reducer} = useSelector(state => state);
    const { id, nombreProyecto} = proyecto_reducer;
    const { rutaHijo } = breadCrumb_reducer;
    //console.log(proyecto_reducer)
    
    let dma = getDiaMesAnio();
    dma = dma.slice(0, dma.length - 5)    

    useEffect(() => {
        
        return () => {}
    }, [])

    const admin = () => { 
        dispatch(setHijoBreadCrumb(rutasModulos[1]));
        console.log('/inicio'+rutasModulos[1].ruta);
        history.push('/inicio'+rutasModulos[1].ruta);
    }

    const prorratas = () => { 
        dispatch(setHijoBreadCrumb(rutasModulos[2])); 
        history.push('/inicio'+rutasModulos[2].ruta);
    }

    const reportes = () => { 
        dispatch(setHijoBreadCrumb(rutasModulos[3]));
        history.push('/inicio'+rutasModulos[3].ruta); 
    }

    

    const cerrarCesion = () => {
        localStorage.clear();
        dispatch(salir());
    }

    const cambiarProyecto = () => {
        history.push('/');
        dispatch(quitarProyecto());
        dispatch(resetBreadCrumb());
    }

    return (
        <div className="menuNavbar">
            <div className="login-menuNavbar">
                <div>
                    <h4 className="no-margen-inferior">
                        {
                            id && <>
                            <span className="proyecto">PROYECTO</span> <span className="nombreProyecto">{nombreProyecto}</span>
                            <button onClick={cambiarProyecto}>
                                <i className="fas fa-building"></i>
                                Cambiar proyecto
                            </button>
                            </>
                        }
                    </h4>
                </div>
                <h4 className="no-margen-inferior">Bienvenido <span className="ml-5">{JSON.parse(localStorage.getItem('userLogin'))?.nombreUsuario}</span>
                <button className="ml-10" onClick={cerrarCesion}><i className="fas fa-users ml-5"></i>Cerrar sesión</button></h4>                
            </div>
            <div className="menu-menuNavbar">
                <div className="aligSelfEnd menu-menuNavbar__btns">
                    
                    {
                        id && 
                            <>
                                <button onClick={prorratas} className={rutaHijo.ruta=== rutasModulos[2].ruta ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                                    Prorratas
                                </button>
                                <button onClick={reportes} className={rutaHijo.ruta=== rutasModulos[3].ruta ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                                    Reportes
                                </button>                        
                            </>
                    }
                    <button onClick={admin} className={rutaHijo.ruta=== rutasModulos[1].ruta ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                            Administración
                    </button>
                </div>

                <div className="alignSelfCenter menu-menuNavbar__titulo texto-centrado">
                    <h2 className="titulo no-margen-inferior">Módulo Mantenimiento Crédito Constructor</h2>
                </div>
                <div className="fecha-menuNavbar">
                    {dma}
                </div>                
            </div>
        </div>
    )
}

MenuNavBar.propTypes = {

}

export default MenuNavBar

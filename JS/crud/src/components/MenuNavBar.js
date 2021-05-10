import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { getDiaMesAnio } from '../helpers/tiempo';
import '../css/menuNavbar.css'

const MenuNavBar = props => {
    console.log("MenuNavBar");
    const [currentView, setCurrentView] = useState('admin');
    let dma = getDiaMesAnio();
    dma = dma.slice(0, dma.length - 5)    

    const admin = () => {
        setCurrentView('admin');
    }

    const reportes = () => {
        setCurrentView('reportes');
    }

    const prorratas = () => {
        setCurrentView('prorratas');
    }


    return (
        <div className="menuNavbar">
            <div className="login-menuNavbar">
                <div>
                    <h4 className="no-margen-inferior">
                        <span className="proyecto">PROYECTO</span> <span className="nombreProyecto">{`K104 - Etapa 1`}</span>
                        <button>
                            <i className="fas fa-building"></i>
                            Cambiar proyecto
                        </button>
                    </h4>
                </div>
                <h4 className="no-margen-inferior">Bienvenido <span className="ml-5">jguzman</span>
                <button className="ml-10"><i className="fas fa-users ml-5"></i>Cerrar sesión</button></h4>                
            </div>
            <div className="menu-menuNavbar">
                
                
                <div className="aligSelfEnd menu-menuNavbar__btns">
                    <button onClick={prorratas} className={currentView==='prorratas' ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                        Prorratas
                    </button>
                    <button onClick={reportes} className={currentView==='reportes' ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                        Reportes
                    </button>
                    <button onClick={admin} className={currentView==='admin' ? 'btn-menuNavbar btn-menuNavbar__pressed' : 'btn-menuNavbar'}>
                            Administración
                    </button>
                </div>
                <div className="alignSelfCenter menu-menuNavbar__titulo">
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

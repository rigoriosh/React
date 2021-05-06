import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { getDiaMesAnio } from '../helpers/tiempo';
import '../css/menuNavbar.css'

const MenuNavBar = props => {

    const [currentView, setCurrentView] = useState('admin');
    const dma = getDiaMesAnio();

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
                <h4 className="no-margen-inferior">Bienvenido <span className="ml-5">jguzman</span><i className="fas fa-users ml-5"></i><button className="ml-10">Cerrar sesión</button></h4>                
            </div>
            <div className="menu-menuNavbar">
                
                
                <div className="aligSelfEnd">
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
                <div className="alignSelfCenter">
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

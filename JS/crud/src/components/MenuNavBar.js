import React from 'react'
//import PropTypes from 'prop-types'
import { getDiaMesAnio } from '../helpers/tiempo';
import './css/menuNavbar.css'

const MenuNavBar = props => {

    const dma = getDiaMesAnio();


    return (
        <div className="menuNavbar">
            <div className="login-menuNavbar">
                <h4 className="no-margen-inferior">Bienvenido <span className="ml-5">jguzman</span><i className="fas fa-users ml-5"></i><button className="ml-10">Cerrar sesión</button></h4>                
            </div>
            <div className="menu-menuNavbar">
                <div className="aligSelfEnd">
                    <button className="btn-menuNavbar">Prorratas</button><button className="btn-menuNavbar">Reportes</button><button className="btn-menuNavbar">Administración</button>
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

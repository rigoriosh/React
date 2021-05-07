import React from 'react'
//import PropTypes from 'prop-types'
import '../css/moduloAdministracion.css'
import MenuNavBar from '../components/MenuNavBar'
import MenuDrawer from '../components/MenuDrawer'
import Breadcrumb from '../components/Breadcrumb'
import ParametrosDelSistema from './ParametrosDelSistema'


const ModuloAdministracion = props => {
    console.log("ModuloAdministracion");


    return (
        <div className="ModuloAdministracion ">
            <MenuNavBar />
            
            <div className="menu2Admin">
                <MenuDrawer />
                <div className="menu2Admin-breadcrumb">
                    <Breadcrumb />
                </div>
            </div>

            <ParametrosDelSistema />
            
        </div>
    )
}

ModuloAdministracion.propTypes = {

}

export default ModuloAdministracion

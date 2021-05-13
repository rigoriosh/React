import React, { useState } from 'react'
//import PropTypes from 'prop-types'



import '../css/moduloAdministracion.css'
import MenuNavBar from '../components/MenuNavBar'
import Breadcrumb from '../components/Breadcrumb'
import SnackbarComponent from "../components/Snackbar";
import DialogComponent from "../components/DialogComponent";
import { tiposParametrosSis } from '../constantes/constantesParametrosDelSistema'
import ParametrosDelSistema from './ParametrosDelSistema'
import AdminValoresTipo from './valoresTipos/AdminValoresTipo'
import DesbloquearLiberaciones from './DesbloquearLiberaciones'
import Permisos from './Permisos'
import Roles from './Roles'
import Menu from '../components/Menu';




const ModuloAdministracion = props => {
    console.log("ModuloAdministracion");
    
    const optsMenuDrawer = tiposParametrosSis.optsMenuDrawer;    
    
    const [mensajes, setMensajes] = useState({open:false, severity:'success', mensaje:''});
    const [dialog, setDialog] = useState({open: false, title: '', dialogContentText:'', agree: false, parametroAeliminar:{}});
    const [optMenuSeleccionado, setOptMenuSeleccionado] = useState(optsMenuDrawer[1]); //maneja la vista inicial al desplegar el modulo administración
    console.log(optMenuSeleccionado)
    return (
        <div className="ModuloAdministracion ">
            <MenuNavBar />
            <div id="administracion">
                
                <div >
                                
                    
                   
                    <Menu optsMenuDrawer={optsMenuDrawer} setOptMenuSeleccionado={setOptMenuSeleccionado}/>
                    
                    <main className='contenedor'>
                        {/* <div className={classes.toolbar} /> */}
                        <Breadcrumb />
                        <h3 className="no-margen-inferior animate__animated animate__bounce"> {`Administración ${optMenuSeleccionado}`} </h3>
                        {
                            optMenuSeleccionado === optsMenuDrawer[0] && <ParametrosDelSistema setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                        }
                        {
                            (optMenuSeleccionado === optsMenuDrawer[1] || optMenuSeleccionado === optsMenuDrawer[5]) && 
                            <AdminValoresTipo setMensajes={setMensajes} dialog={dialog} setDialog={setDialog} optMenuSeleccionado={optMenuSeleccionado} setOptMenuSeleccionado={setOptMenuSeleccionado}/>
                        }
                        {
                            optMenuSeleccionado === optsMenuDrawer[2] && <DesbloquearLiberaciones setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                        }
                        {
                            optMenuSeleccionado === optsMenuDrawer[3] && <Permisos setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                        }
                        {
                            optMenuSeleccionado === optsMenuDrawer[4] && <Roles setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                        }                    
                    
                </main>
                <SnackbarComponent mensajes={mensajes} setMensajes={setMensajes}/>
                <DialogComponent dialog={dialog} setDialog={setDialog}/>
                </div>
            </div>
        </div>
    );
}

ModuloAdministracion.propTypes = {

}

export default ModuloAdministracion

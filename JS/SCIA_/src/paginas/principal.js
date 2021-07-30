import React, {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { Dropdown, Navbar, NavDropdown } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import '../componentes/estilos/principal.css'
import Cargando from '../componentes/Cargar'
import {CerrarSesion, ObtenerPerfil} from '../componentes/ConsumirApiRest'
import logo from './../imagenes/logo.png'
import Menu from '../componentes/menu'
import Alertas from '../componentes/alertas'
import PerfilDelUsuario from '../componentes/perfilUsuario'
import Maestras from './maestras'
import Actividades3w from './actividades3w'
import TablaResumen from './tablaresumen'
import {NoInternet} from '../componentes/controlErrores'
import {btnOnLine} from '../componentes/btnOnOffLine'

const Principal = () => {

    
    const [state,setState] = useState({cargando: true, logearUsuario: null, menu: null })
    const [offLine, setOffline] = useState({offline:false, error:'', subPopup: false})
    const [salirSesion, setSalirSesion] = useState(false)
    const [verPerfil,setVerPerfil] = useState(false)
    const [pantalla, setPantalla] = useState({maestras: {activa: false, configuracion: null, nuevallamada: false}, 
                                              actividad:{activa: false, configuracion: null, nuevallamada: false},
                                              principal:{activa: true},
                                              btnOnOffLine:false})
    
    useEffect(()=>{
        async function ejecutar(){
            await ObtenerPerfil(onCambiarOffline).then(respuesta=>{
                let logearUsuario = JSON.parse(window.localStorage.getItem('logearUsuario'))
                let menu = (respuesta)?logearUsuario.perfilUsuario.menu:(logearUsuario.perfilUsuario!=null)?logearUsuario.perfilUsuario.menu:null
                setState({...state,
                            cargando:false,
                            logearUsuario,
                            menu})
            })
        }
        ejecutar()
    },[])

    //Maneja error al cargar una foto
    const onErrorFotoUser = (e) => {
        setState({ ...state, logearUsuario:{
                ...state.logearUsuario, perfilUsuario:{...state.logearUsuario.perfilUsuario, linkFoto: null}
            } 
        })
    } 

    //Ventana emergente cerrar sesión
    const salir = () =>{
        setState({ ...state, cargando:true })
        CerrarSesion()
    }

    const closePopupCerarSesion = () => setSalirSesion(false)

    //Ventana emergente sin internet
    const onConfirmSinConexion = () =>{
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: true}))
        setOffline({...offLine, offline: false})
    }

    const onCancelSinConexion = () => {
        setOffline({...offLine, offline: false, subPopup: true})
    }

    //Ventana emergente subMenu sin internet
    const onConfirmError = () => setOffline({...offLine, subPopup:false})

    //Activa modo offline
    const onCambiarOffline = (estado, error) =>{
        let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
        if(!sinInternet.modeOffline){
            error = error && error.toString()
            setOffline({...offLine, error: error, offline:estado})
        }
    }

    //Mostrar perfil
    const onPerfil = () => setVerPerfil(true)
    const onClosePerfil = () => setVerPerfil(false)
    
    //Mostrar o cambiar pantalla maestra
    const onMostrarPantalla = (configurarPantalla) =>{
        if(configurarPantalla.idModulo==='Actividades'){
            setPantalla({actividad:{activa: true, 
                                    configuracion: configurarPantalla,
                                    nuevallamada: pantalla.actividad.nuevallamada?false:true}, 
                         maestras: {activa: false, 
                                    configuracion: null,
                                    nuevallamada: false}, 
                         principal:{activa: false}})
        }else{
            setPantalla({maestras: {activa: true, 
                                     configuracion: configurarPantalla,
                                     nuevallamada: pantalla.maestras.nuevallamada?false:true}, 
                         actividad:{activa: false, 
                                     configuracion: null,
                                     nuevallamada: false}, 
                         principal:{activa: false}})
        }
    }

    //Cambiar a pantalla principal
    const verPantallaPrincipal = () =>{
        setPantalla({maestras: {...pantalla.maestras.configuracion, activa: false}, 
                    principal:{activa: true}})
    }

    if(state.cargando)
      return <Cargando />

    return (
        <div className="" style={{marginTop: '20px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Navbar expand="lg" className="bg-light justify-content-between">
                            <Navbar.Brand href="/" onClick={()=>verPantallaPrincipal()}><img  className="logo" src={logo} alt="logo"/></Navbar.Brand>
                            {btnOnLine(pantalla.btnOnOffLine)}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Menu itemsMenu={state.menu} onMostrarPantalla={onMostrarPantalla}/>
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                    <Alertas onCambiarOffline={onCambiarOffline}/>
                                    <Dropdown>
                                        <Dropdown.Toggle  variant="" className="colorTexto" >
                                            {(state.logearUsuario.perfilUsuario.linkFoto==null)
                                                ?<FaUser />
                                                :<img id="fotoUsuario" className="fotoUsuario" src={state.logearUsuario.perfilUsuario.linkFoto} onError={(e)=>onErrorFotoUser(e)} alt="fotoUsuario"/>
                                            } {state.logearUsuario.perfilUsuario.nombreCompleto}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            <NavDropdown.Item className="colorTexto"  onClick={()=>onPerfil()}>Editar perfil</NavDropdown.Item>
                                            <NavDropdown.Item className="colorTexto"  onClick={()=>setSalirSesion(true)}>Cerrar Sesion</NavDropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Navbar.Collapse>
                        </Navbar>
                        <br/>
                        {pantalla.principal.activa && <TablaResumen />}
                        {pantalla.maestras.activa && <Maestras configuracion={pantalla.maestras.configuracion} 
                                                               setPantalla={setPantalla}
                                                               nuevallamada={pantalla.maestras.nuevallamada}
                                                               pantalla={pantalla}
                                                               />}
                        {pantalla.actividad.activa && <Actividades3w configuracion={pantalla.actividad.configuracion} 
                                                               setPantalla={setPantalla}
                                                               nuevallamada={pantalla.actividad.nuevallamada}
                                                               pantalla={pantalla}
                                                               />}
                    </div>
                    <NoInternet
                        show={offLine.offline}
                        title={'¡Sin conexión de Internet!'}
                        onConfirm={()=>onConfirmSinConexion}
                        onCancel={()=>onCancelSinConexion}
                        mensaje={'¿Desea activar el modo offline?'}/>
                        
                    <SweetAlert show={offLine.subPopup} danger confirmBtnText={"Aceptar"} title="Error presentado!" onConfirm={onConfirmError}>
                        {offLine.error}
                    </SweetAlert>

                    <SweetAlert
                        show={salirSesion}
                        warning
                        title={'Cerrar sesión!'}
                        onConfirm={salir}
                        onCancel={closePopupCerarSesion}
                        showCancel={true}
                        confirmBtnText={"Aceptar"}
                        cancelBtnText={"Cancelar"}
                        closeOnClickOutside={false}
                        showCloseButton={true}>
                            <p>¿Esta seguro que quiere salir del sistema?</p>
                    </SweetAlert>

                    <PerfilDelUsuario activar={verPerfil} onClosePerfil={onClosePerfil}/>
                </div>
            </div>
        </div>
    )
}

export default Principal
import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import './estilos/perfilUsuario.css'

const Perfil = (props) =>{
    const logearUsuario = JSON.parse(window.localStorage.getItem('logearUsuario'))
    const perfil = logearUsuario.perfilUsuario

    const cerrarVentana = () => {props.onClosePerfil()}

     return(
        <SweetAlert
            show={props.activar}
            custom
            showCloseButton
            confirmBtnText="Aceptar"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="light"
            customIcon={perfil.linkFoto}
            title="Perfil de usuario"
            onConfirm={()=>cerrarVentana()}
        >
            <div><spam className="etiqueta">Estado:</spam>{` ${perfil.activo?'Activo':'Inactivo'}`}</div>
            <div><spam className="etiqueta">Nombre:</spam>{` ${perfil.nombre!=null?perfil.nombre:''} ${perfil.nombre2!=null?perfil.nombre2:''}`}</div>
            <div><spam className="etiqueta">Apellido:</spam>{` ${perfil.apellido!=null?perfil.apellido:''} ${perfil.apellido2!=null?perfil.apellido2:''}`}</div>
            <div><spam className="etiqueta">Idenficación:</spam>{` ${perfil.idTipoDoc}`}</div>
            <div><spam className="etiqueta">Documento:</spam>{` ${perfil.documento}`}</div>
            <div><spam className="etiqueta">Dirección:</spam>{` ${perfil.direccion!==null?perfil.direccion:'-----'}`}</div>
            <div><spam className="etiqueta">Correo:</spam>{` ${perfil.correo!==null?perfil.correo:'-----'}`}</div>
            <div><spam className="etiqueta">Teléfono:</spam>{` ${perfil.telefono} - ${perfil.celular}`}</div>
        </SweetAlert>
     )
 }

 export default Perfil
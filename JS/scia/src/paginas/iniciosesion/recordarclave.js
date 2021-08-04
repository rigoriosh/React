import React, { useState, useEffect, useRef } from 'react'
import { FaKey } from 'react-icons/fa'
import Popup from './recordarclavepopup'
import { /* ipPublica, */ NombreDispositivo, TipoClienteAccede } from '../../componentes/datosApiRest'

const RecordarClave = (props) => {

    const validarClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

    const [show, setShow] = useState({ recuperar: false, validar: false, cambiarcontrasena: false, cambiadaConExito: false })
    const [state, setState] = useState({ txtCorreoRecuperar: '', txtPIN: '', txtNuevaClave: '', txtError: '' })
    
    const handleCloseRecuperar = () => setShow({ recuperar: false })
    const handleClosePIN = () => setShow({ validar: false })
    const handleCloseCambiar = () => setShow({ cambiarcontrasena: false })
    const handleExitoCambiar = () => setShow({ cambiadaConExito: false })
    
    const IPPublicaDispositivo = useRef()
    useEffect(() => {
        /* async function fetchMyAPI() {
            return await ipPublica().then(valorIp => { IPPublicaDispositivo.current = valorIp })
        }
        fetchMyAPI() */
    }, []);

    async function solicitarClave(Email, IPPublicaDispositivo) {
        const url = 'https://scia.cmsolinfo.com/api/Login/GeneraPinAccesso'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email, TipoClienteAccede, NombreDispositivo, IPPublicaDispositivo })
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    setState({ ...state, txtPIN: '', txtNuevaClave: '', txtError: '' })
                    setShow({ recuperar: false, validar: true, cambiarcontrasena: false })
                } else {
                    response.text().then((text) => { setState({ ...state, txtError: text }) })
                    setShow({ recuperar: true, validar: false, cambiarcontrasena: false })
                }
            })
            .catch(() => {
                setState({ ...state, txtError: "No se ha podido recuperar la clave." })
                setShow({ recuperar: true, validar: false, cambiarcontrasena: false })
            });
    }

    async function validarPIN(Email, Clave, IPPublicaDispositivo) {
        const url = 'https://scia.cmsolinfo.com/api/Login/ValidaPinAccesso'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email, Clave, TipoClienteAccede, NombreDispositivo, IPPublicaDispositivo })
        };
        await fetch(url, requestOptions)
            .then(text => text.text())
            .then(text => {
                if (text==="true") {
                    setState({ ...state, txtNuevaClave: '', txtError: '' })
                    setShow({ recuperar: false, validar: false, cambiarcontrasena: true })
                } else {
                    setState({ ...state, txtError: "PIN no es valido" })
                    setShow({ recuperar: false, validar: true, cambiarcontrasena: false })
                }
            })
            .catch(() => {
                setState({ ...state, txtError: "No se ha podido validar el PIN." })
                setShow({ recuperar: false, validar: true, cambiarcontrasena: false })
            });
    }

    async function cambiarContrasena(Email, Clave, GeoLoc, IPPublicaDispositivo) {
        const url = 'https://scia.cmsolinfo.com/api/Login/AsignarPrimeraClave'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email, Clave, TipoClienteAccede, NombreDispositivo, IPPublicaDispositivo, GeoLoc })
        };

        await fetch(url, requestOptions)
            .then(response => {

                if (response.ok) {
                    setState({ txtCorreoRecuperar: '', txtPIN: '', txtNuevaClave: '', txtError: '' })
                    setShow({ recuperar: false, validar: false, cambiarcontrasena: false, cambiadaConExito: true })
                } else {
                    response.text().then((text) => { setState({ ...state, txtError: text }) })
                    setShow({ recuperar: false, validar: false, cambiarcontrasena: true })
                }
            })
            .catch(() => {
                setState({ ...state, txtError: "No se ha podido cambiar la clave." })
                setShow({ recuperar: false, validar: false, cambiarcontrasena: true })
            });
    }

    const onRecuperar = (e) => { 
        if(state.txtCorreoRecuperar!==""){
            solicitarClave(state.txtCorreoRecuperar, IPPublicaDispositivo.current)
        } else if(e.target.name === 'idTengoPIN'){
            setState({ ...state, txtPIN: '', txtNuevaClave: '', txtError: '' })
            setShow({ recuperar: false, validar: true, cambiarcontrasena: false })
        }
    }

    const onValidarPIN = () => { 
        if(state.txtPIN!==""){
            validarPIN(state.txtCorreoRecuperar, state.txtPIN, IPPublicaDispositivo.current) 
        }
    }

    const onCambiarContrasena = () => { 
            if (state.txtNuevaClave==="") {
                setState({ ...state, txtError:'¡Por favor ingrese una clave valida!' })
              } else if (state.txtNuevaClave.length <= 8) {
                setState({ ...state, txtError:'¡La clave debe tener al menos 8 caracteres!' })
              } else if (!validarClave.test(state.txtNuevaClave)) {
                setState({ ...state, txtError:'¡La clave debe tener al menos 1 caracteres especial, mayúscula, minúscula y número!'})
              } else { 
                  cambiarContrasena(state.txtCorreoRecuperar, state.txtNuevaClave, props.ubicacion, IPPublicaDispositivo.current) 
              }
    }
    
    const onChange = (e) => { setState({ ...state, txtError: '', [e.target.name]: e.target.value }) }
    const onRecordarClave = () => {
        setState({ txtCorreoRecuperar:'', txtPIN:'', txtNuevaClave:'', txtError:'' })
        setShow({ recuperar: true })
    }

    return (
        <div>
            <div className="btn btn-link" onClick={() => onRecordarClave()} style={{ float: 'right', color: 'black' }}> Recordar clave <FaKey /></div>
            <Popup state={state}
                show={show.recuperar}
                onCancel={handleCloseRecuperar}
                onConfirm={onRecuperar}
                confirmBtnText={"Generar pin"}
                cancelBtnText={"Cancelar"}
                cancelBtnBsStyle={"secondary"}
                reverseButtons={true}
                showCancel={true}
                success={false}
                title={"Recuperar contraseña"}
                subTitle={"Ingrese su correo electrónico:"}
                name={"txtCorreoRecuperar"}
                type={'email'}
                onChange={onChange}
                placeholder={'Digite su dirección de correo electrónico'}
                value={state.txtCorreoRecuperar} />

            <Popup state={state}
                show={show.validar}
                onCancel={handleClosePIN}
                onConfirm={onValidarPIN}
                confirmBtnText={"Validar pin"}
                success={false}
                title={"Pin de acceso"}
                subTitle={"Ingrese el PIN enviado al correo:"}
                name={"txtPIN"}
                type={'text'}
                onChange={onChange}
                placeholder={'Digite el PIN enviado a su dirección de correo electrónico'}
                maxLength={"50"}
                value={state.txtPIN} />

            <Popup state={state}
                show={show.cambiarcontrasena}
                onCancel={handleCloseCambiar}
                onConfirm={onCambiarContrasena}
                confirmBtnText={"Aceptar"}
                success={false}
                title={"Cambiar clave"}
                subTitle={"Ingrese su nueva clave:"}
                name={"txtNuevaClave"}
                type={'password'}
                onChange={onChange}
                placeholder={'Digite su nueva clave'}
                maxLength={"15"}
                minLength={"8"}
                value={state.txtNuevaClave}
                pattern={validarClave} />

            <Popup state={state}
                show={false}
                onCancel={handleExitoCambiar}
                onConfirm={handleExitoCambiar}
                success={show.cambiadaConExito}
                title={"Aceptado!"}
                subTitle={"Se ha cambiado la clave!"} />
        </div>
    )
}

export default RecordarClave
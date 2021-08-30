const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))

//Consumo de Api para la principal

export const  CerrarSesion = async () =>{
    const url = 'https://scia.cmsolinfo.com/api/Home'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
        }
    }
    const remover =()=> {
        localStorage.removeItem('offline')
        localStorage.removeItem('logearUsuario')
        localStorage.removeItem('tablaMaestra')
        localStorage.removeItem('actividades')
    }

    await fetch(url, requestOptions)
          .then(respuesta=>{
              if(respuesta.ok){
                remover()
                window.location.reload()
              }
          }).catch(error => { 
            remover()
            window.location.reload()
           })
}

export const  ObtenerPerfil = async (onCambiarOffline) =>{
    const url = 'https://scia.cmsolinfo.com/api/Home'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
        }
    }

    const retorno = await fetch(url, requestOptions)
        .catch(error => { 
            onCambiarOffline(true,error)
        })

    if(retorno!==undefined && retorno.status===200){
        onCambiarOffline(false,null)
        let datos = retorno.json()
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        window.localStorage.setItem('logearUsuario', JSON.stringify({...usuario, perfilUsuario: await datos}))
        return true
    }else if(retorno!==undefined && retorno.status!==200){
        //onCambiarOffline(true, retorno.status)
    }

}


export const  Notificaciones = async (props) =>{
    const url = 'https://scia.cmsolinfo.com/api/Notificacion'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        }
    }

    const retorno = await fetch(url, requestOptions)
        .catch(error => { 
            props.onCambiarOffline(true,error)
        })

    if(retorno!==undefined && retorno.status===200){
        props.onCambiarOffline(false,null)
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        let datos =  retorno.json()
        return datos
    }else if(retorno!==undefined && retorno.status!==200){
        //onCambiarOffline(true, retorno.status)
    }
    
    return false
}

export const confirmarCerrarNotificacion = async (nota,props) =>{
    const url = 'https://scia.cmsolinfo.com/api/Notificacion'
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify(nota)
    };

    const retorno = await fetch(url, requestOptions)
        .catch(error => { 
            props.onCambiarOffline(true,error)
        })

    if(retorno!==undefined && retorno.status===200){
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        props.onCambiarOffline(false,null)
        let datos =  retorno.json()
        return (datos === true)?true:false
    }else if(retorno!==undefined && retorno.status!==200){
        //onCambiarOffline(true, retorno.status)
    }
    
    return false
}






//Consumo de Api para las Maestras

export const  GetDatosMaestra = async (props, onCambiarOffline) =>{
    const url = props.configuracion.microServicio
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        }
    }

    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })

    if(retorno!==undefined && retorno.status===200){
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        onCambiarOffline(false,null)
        let datos =  retorno.json()
        return datos
    }else if(retorno!==undefined && retorno.status!==200){
        //onCambiarOffline(true, retorno.status)
    }
    return false
}

export const GuardarMaestra = async (datos, onCambiarOffline, setCrudEjecutadoBien,microServicio,datosImagen) => {
    const url = microServicio
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify(datos)
    }


    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })

    if(retorno!==undefined && retorno.status===200){
        const elId = await retorno.text().then(valor=>{return valor})
        if(datosImagen!==null){
            datosImagen.id = elId
            await guardarImagen(datosImagen)
        }
        return true
    }else if(retorno!==undefined && retorno.status!==200){
        let datos =  retorno.json()
        datos.then(d=>{
            let textoError = ''
            if(d.errors!==undefined){
                let objetoError = Object.values(d.errors)
                for (let i = 0; i < objetoError.length; i++) {
                    textoError = `${textoError} ${i+1}- ${objetoError[i]}   `
                }
            }else{
                textoError = d.mensaje
            }
            setCrudEjecutadoBien({accion:'', 
                                titulo:'Error', 
                                mensaje: textoError,
                                btnCancelar: false, 
                                mostrar: true, 
                                tipoMensaje: 'warning', 
                                rowId:null})
        })
    }
    return false
}






export const EliminarMaestra = async (datos, onCambiarOffline, setCrudEjecutadoBien,microServicio) => {
    const url = microServicio
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify(datos)
    }

    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })

    if(retorno!==undefined && retorno.status===200){
        return true
    }else if(retorno!==undefined && retorno.status!==200){
        let datos =  retorno.json()
        datos.then(d=>{
            let textoError = ''
            if(d.errors!==undefined){
                let objetoError = Object.values(d.errors)
                for (let i = 0; i < objetoError.length; i++) {
                    textoError = `${textoError} ${i+1}- ${objetoError[i]}   `
                }
            }else{
                textoError = d.mensaje
            }
            setCrudEjecutadoBien({accion:'', 
                                 titulo:'Error', 
                                 mensaje: textoError,
                                 btnCancelar: false, 
                                 mostrar: true, 
                                 tipoMensaje:'warning',
                                 rowId: null})
        })
    }
    return false
}




const guardarImagen = async (imagen64) =>{
    const url = 'https://scia.cmsolinfo.com/api/Archivos'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))

    const datos = {
        partitionKey: imagen64.pantalla,
        id: imagen64.id,
        fileName: imagen64.filename,
        fileCab: "",
        data64File: imagen64.data64File
    }

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify(datos)
    }

    await fetch(url, requestOptions).catch(error => {})
}




//Actividades
export const GuardarCargaMasiva = async (datos, onCambiarOffline, setCrudEjecutadoBien) => {
    const url = 'https://scia.cmsolinfo.com/api/Masivos/Importar/Actividades'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify(datos)
    };

    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })
                            
    if(retorno!==undefined && retorno.status===200){
        const elText = await retorno.text().then(valor=>{return valor})
        setCrudEjecutadoBien({titulo:'Proceso exitoso', 
                              mensaje: elText,
                              mostrar: true, 
                              tipoMensaje: 'success'})
        return true
    }else if(retorno!==undefined && retorno.status!==200){
        let datos =  retorno.json()
        datos.then(res=>{
            setCrudEjecutadoBien({titulo:'Error', 
                                  mensaje: res,
                                  mostrar: true, 
                                  tipoMensaje: 'warning'})
        })
    }
    return false
}




export const  GetUnaActividad = async (idActividad, idNotificacion,onCambiarOffline, linkDe) =>{

    let url = 'https://scia.cmsolinfo.com/api/Programacion'
    if(linkDe==='variable'){
        url = 'https://scia.cmsolinfo.com/api/Programacion/Variables'
    }
    
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`,
                    'Georef': usuario.ubicacion},
        body: JSON.stringify({idactividad: idActividad,idnotificacion: idNotificacion})
    }

    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })
    if(retorno!==undefined && retorno.status===200){
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        onCambiarOffline(false,null)
        let datos =  retorno.json()
        return datos
    }else if(retorno!==undefined && retorno.status!==200){
        //onCambiarOffline(true, retorno.status)
    }
    return false
}



export const GuardarUnaActividad = async (datos, onCambiarOffline, setCrudEjecutadoBien, linkDe) => {
    let url = 'https://scia.cmsolinfo.com/api/Programacion/ActualizaActividad'
    if(linkDe==='variable'){
        url = 'https://scia.cmsolinfo.com/api/Programacion/ActualizaVariables'
    }
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify(datos)
    }


    const retorno = await fetch(url, requestOptions)
                            .catch(error => { onCambiarOffline(true,error) })
    if(retorno!==undefined && retorno.status===200){
        const elId = await retorno.text().then(valor=>{return valor})
        return elId
    }else if(retorno!==undefined && retorno.status!==200){
        let datos =  retorno.json()
        datos.then(d=>{
            let textoError = ''
            if(d.errors!==undefined){
                let objetoError = Object.values(d.errors)
                for (let i = 0; i < objetoError.length; i++) {
                    textoError = `${textoError} ${i+1}- ${objetoError[i]}   `
                }
            }else{
                textoError = d.mensaje
            }
            setCrudEjecutadoBien({accion:'', 
                                titulo:'Error', 
                                mensaje: textoError,
                                btnCancelar: false, 
                                mostrar: true, 
                                tipoMensaje: 'warning', 
                                rowId:null})
        })
    }
    return false
}

// Ejecutar Actividad
export const GetEjecutarActividad = async (idtarea, idreporte) => {
    const url = 'https://scia.cmsolinfo.com/api/Ejecucion'
    const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`,
            'Georef': usuario.ubicacion
        },
        body: JSON.stringify({idtarea, idreporte})
    };

    const retorno = await fetch(url, requestOptions)
                            .catch(error => { console.log({error}) })
    return retorno.json();
}
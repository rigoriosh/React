import React, {useState, useEffect} from 'react'
import {FaFileExcel, FaUserSecret, FaEdit, FaTasks, FaCamera, FaThumbsUp} from 'react-icons/fa'

import Cargando from '../componentes/Cargar'
import {GetDatosMaestra} from '../componentes/ConsumirApiRest'
import ArbolDatos from '../componentes/Actividades/arbolDatos'
import {Actividad} from './unaActividad/Actividad'
import {EjecutarActividad} from './ejecutarActividad/EjecutarActividad'

export default function Actividades3w(props){

    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [titulo, setTitulo] = useState()
    const [showActividadCampo, setShowActividadCampo] = useState(false)
    const [showEjecutar, setShowEjecutar] = useState(false)
    const [idAbrirActividad, setIdAbrirActividad] = useState(null)
    const [estadoBotones, setEstadoBotones] = useState({CmdActividadCampo:{visible: false, activo: false},
                                                        CmdCargaMasiva:{visible: false, activo: false},
                                                        CmdProgramar:{visible: false, activo: false},
                                                        CmdEjecutar:{visible: false, activo: false},
                                                        CmdConfirmar:{visible: false, activo: false},
                                                        CmdExportar:{visible: false, activo: false},
                                                        CmdAuditoria:{visible: false, activo: false},
                                                        CmdCerrar:{visible: false, activo: false}})
    const [arbol, setArbol] = useState([])
    

    const onCerrarActividades = () =>{
        setCargando(true)
        setTimeout(() =>{
            props.setPantalla(antes=>{
                               return {...antes,
                                       actividad: {activa: false, configuracion: null, nuevallamada: false}, 
                                       principal:{activa: true}}
                            })
            setCargando(false)
        },200)
    }

    const onAbrirCargaMasiva =()=>{
        let microServicio = null
        let loginUser = JSON.parse(window.localStorage.getItem('logearUsuario'))
        let menu = loginUser.perfilUsuario.menu
        for(let obj of menu){
            if(obj.pantalla === 'Carga Masiva'){
                microServicio = obj.microServicio
                break
            }
        }
        props.setCargaMasiva({show:true,configuracion: {microServicio: microServicio}})
    }


    const onAbrirActividad =()=>setShowActividadCampo(true)

    const onAbrirEjecutar =()=> setShowEjecutar(true)

    useEffect(() => {
        setCargando(true)
        setTitulo(null)
        const obtieneDatos = async ()=>{
            let apiActividades = await GetDatosMaestra(props, ()=>console.log)
                                .then((datos)=>{ return datos })
            if(apiActividades!==false){
                window.localStorage.setItem('actividades', JSON.stringify(apiActividades))
            }else{
                apiActividades = JSON.parse(window.localStorage.getItem('actividades'))
            }
            if(apiActividades!==null){
                setTitulo(apiActividades.tituloPantalla)
                setEstadoBotones(antes=>{
                    let old = []
                    apiActividades.listadoObjetosEstado.map(estado =>{
                        old[estado.id] = {visible: estado.visible, activo: estado.activo}
                    })
                    return old
                })
                setArbol(apiActividades.datatable)
            }else{
                setError(`No existen actividades en el dispositivo. Por favor intente de 
                          nuevo cuando cuente con acceso a internet`)
            }
            setCargando(false)
        }
        obtieneDatos()
    },[])

    if(cargando)
        return <Cargando />

    if(error!==null)
        return <div>
                    <div className="panel panel-default">
                        <div className="panel-heading text-center border"><b>Actividades 3w - {titulo}</b></div>
                        <div className="panel-body border">
                            <div className="alert alert-danger text-center m-2 "> {error}{titulo}</div>
                        </div>
                    </div>
                </div>

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading text-center border">
                    <b>{titulo}</b>
                    <button className="btn btn-danger btn-sm m-0" 
                            style={{float:'right'}} 
                            onClick={()=>onCerrarActividades()}>Cerrar</button>
                </div>
                <div className="panel-body border">
                    {(estadoBotones.CmdActividadCampo.visible && idAbrirActividad !== null) && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdActividadCampo.activo}  
                                onClick={() => onAbrirActividad()}>
                                    <span><FaEdit className="tamanoImg" />
                                        <p className="tamanoLetraImg">Actividad Campo</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdCargaMasiva.visible && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdCargaMasiva.activo}  
                                onClick={() => onAbrirCargaMasiva()}>
                                    <span><FaFileExcel className="tamanoImg" />
                                        <p className="tamanoLetraImg">Carga Masiva</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdProgramar.visible && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdProgramar.activo} 
                                onClick={() => null}>
                                    <span><FaTasks className="tamanoImg" />
                                        <p className="tamanoLetraImg">Programar</p>
                                    </span>
                        </button>}
                    {(estadoBotones.CmdEjecutar.visible && idAbrirActividad !== null) && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdEjecutar.activo} 
                                onClick={() => onAbrirEjecutar()}>
                                    <span><FaCamera className="tamanoImg" />
                                        <p className="tamanoLetraImg">Ejecutar</p>
                                    </span>
                        </button>}
                    {(estadoBotones.CmdConfirmar.visible  && idAbrirActividad !== null) && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdConfirmar.activo} 
                                onClick={() => onAbrirActividad()}>
                                    <span><FaThumbsUp className="tamanoImg" />
                                        <p className="tamanoLetraImg">Confirmar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdExportar.visible && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdExportar.activo}  
                                onClick={() => null}>
                                    <span><FaFileExcel className="tamanoImg" />
                                        <p className="tamanoLetraImg">Exportar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdAuditoria.visible && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline||
                                            !estadoBotones.CmdAuditoria.activo} 
                                onClick={() => null}>
                                    <span><FaUserSecret className="tamanoImg" />
                                        <p className="tamanoLetraImg">Auditoria</p>
                                    </span>
                        </button>}
                    
                </div>
                <ArbolDatos arbol={arbol} setIdAbrirActividad={setIdAbrirActividad}/>
                {showActividadCampo &&
                <Actividad showActividadCampo={showActividadCampo} 
                           setShowActividadCampo={setShowActividadCampo}
                           titulo={titulo}
                           idAbrirActividad={idAbrirActividad}
                           setIdAbrirActividad={setIdAbrirActividad}/>}

                <EjecutarActividad showEjecutar={showEjecutar} idAbrirActividad={idAbrirActividad}
                    arbol={arbol} setShowEjecutar={setShowEjecutar}/>
            </div>
        </div>
    )
}
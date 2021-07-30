import React, {useState, useEffect} from 'react'
import {FaFileExcel, FaUserSecret, FaEdit, FaTasks, FaCamera, FaThumbsUp} from 'react-icons/fa'

import Cargando from '../componentes/Cargar'
import {GetDatosMaestra} from '../componentes/ConsumirApiRest'
import ArbolDatos from '../componentes/Actividades/arbolDatos'

export default function Actividades3w(props){

    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [titulo, setTitulo] = useState()
    const [estadoBotones, setEstadoBotones] = useState({CmdActividadCampo:false,
                                                        CmdCargaMasiva:false,
                                                        CmdProgramar:false,
                                                        CmdEjecutar:false,
                                                        CmdConfirmar:false,
                                                        CmdExportar:false,
                                                        CmdAuditoria:false,
                                                        CmdCerrar:false})
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

    useEffect(() => {
        setCargando(true)
        setTitulo(null)
        const obtieneDatos = async ()=>{
            let apiActividades = await GetDatosMaestra(props, ()=>console.log)
                                .then((datos)=>{ return datos })
            window.localStorage.setItem('actividades', JSON.stringify(apiActividades))
            setTitulo(apiActividades.tituloPantalla)
            setEstadoBotones(antes=>{
                let old = []
                apiActividades.listadoObjetosEstado.map(estado =>{
                    old[estado.id] = estado.activo
                })
                return old
            })
            setArbol(apiActividades.datatable)
        }
        obtieneDatos()
        setCargando(false)
    },[])

    if(cargando)
        return <Cargando />

    if(error!==null)
        return (<div>
                    <div className="panel panel-default">
                        <div className="panel-heading text-center border"><b>Actividades 3w - {titulo}</b></div>
                        <div className="panel-body border">
                            <div className="alert alert-danger text-center m-2 "> {error}{titulo}</div>
                        </div>
                    </div>
                </div>)

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading text-center border">
                    <b>{titulo}</b>
                    <button className="btn btn-danger btn-sm m-0 p-0" onClick={()=>onCerrarActividades()}>Cerrar</button>
                </div>
                <div className="panel-body border">
                    {estadoBotones.CmdActividadCampo && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaEdit className="tamanoImg" />
                                        <p className="tamanoLetraImg">Actividad Campo</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdCargaMasiva && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaFileExcel className="tamanoImg" />
                                        <p className="tamanoLetraImg">Carga Masiva</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdProgramar&& 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaTasks className="tamanoImg" />
                                        <p className="tamanoLetraImg">Programar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdEjecutar && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaCamera className="tamanoImg" />
                                        <p className="tamanoLetraImg">Ejecutar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdConfirmar && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaThumbsUp className="tamanoImg" />
                                        <p className="tamanoLetraImg">Confirmar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdExportar && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaFileExcel className="tamanoImg" />
                                        <p className="tamanoLetraImg">Exportar</p>
                                    </span>
                        </button>}
                    {estadoBotones.CmdAuditoria && 
                        <button className="btn btn-light botonesSuperior" 
                                disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} 
                                onClick={() => null}>
                                    <span><FaUserSecret className="tamanoImg" />
                                        <p className="tamanoLetraImg">Auditoria</p>
                                    </span>
                        </button>}
                    
                </div>

                <ArbolDatos arbol={arbol}/>
                
            </div>
        </div>
    )
}
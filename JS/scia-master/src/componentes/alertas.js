import React, {useState, useEffect} from 'react'
import { Dropdown } from 'react-bootstrap';
import { FaBell, FaTimes } from 'react-icons/fa';
import './estilos/alertas.css'
import {confirmarCerrarNotificacion} from './ConsumirApiRest'
import {Notificaciones} from '../componentes/ConsumirApiRest'



const Alertas = (props) => {

    const [lista, setLista] = useState()
    const [numeroDeNotificaciones, setNumeroDeNotificaciones] = useState(null)
    const [mostrarButton, setMostrarButton] = useState(true)

    useEffect(() => {
        BuscarNotificacion()
    }, [mostrarButton]);

    function BuscarNotificacion(){
        async function  obtieneNotificaciones(){
            const usuario =  JSON.parse(window.localStorage.getItem('logearUsuario'))
                
            Notificaciones(props).then(dato=>{
                if(dato !== false){
                    window.localStorage.setItem('logearUsuario', JSON.stringify({...usuario, notificacion: dato}))
                    obtenerCards(dato)
                }else if(usuario.notificacion!==null){
                    obtenerCards(usuario.notificacion)
                }
                
            })
        }
        obtieneNotificaciones()
    }

    const CerrarNotificacion = async (nota) => {
        let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
        if(sinInternet.modeOffline){
            setMostrarButton(old=>{return false})
        }else{
            await confirmarCerrarNotificacion(nota,props)
            BuscarNotificacion() 
        }
    }

    const obtenerCards = (dato) => {
        if (dato != null && dato.length > 0) {
            setNumeroDeNotificaciones(<b className="numeroDeNotificaciones">{dato.length}</b>)
            setLista( 
                    <div>
                        <div className="text-white"> Cantidad de notificaciones pendientes por leer {dato.length}</div>
                        {dato.map(function (nota, index) {
                            return  <div key={index} className='card m-1' >
                                        <div className="card-body">
                                            {mostrarButton &&
                                                (nota.tipo==='I') 
                                                    ? <button className="btn btn-light p-0" id="btnCerrar" onClick={()=> CerrarNotificacion(nota)}><FaTimes /></button>
                                                    : ""
                                            }
                                            <p className="card-text colorTexto">{nota.detalle} 
                                                {mostrarButton &&
                                                    (nota.tipo==='E') 
                                                        ? <a href={nota.funcionalidad} className="card-link"> Ejecutar.</a>
                                                        : ""
                                                }
                                            </p>
                                        </div>
                                    </div>
                        })}
                    </div>
            )
        }else{
            setNumeroDeNotificaciones(null)
            setLista(<div id="msjSinNotificacion">Cantidad de notificaciones pendientes por leer 0</div>)
        }
    }

    return <Dropdown>
                <Dropdown.Toggle variant="danger" >
                <FaBell /> Alertas{numeroDeNotificaciones}
                </Dropdown.Toggle>
                <Dropdown.Menu id="contenedorAlertas">
                    {lista}
                </Dropdown.Menu>
            </Dropdown>
}

export default Alertas
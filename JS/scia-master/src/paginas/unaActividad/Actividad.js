import React, { useEffect, useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import Steps from '../../componentes/Actividades/Steps'
import { View3W } from './views/View3W';
import { ViewRecursos } from './views/ViewRecursos';
import { ViewVariables } from './views/ViewVariables';
import '../../componentes/estilos/actividades.css'
import {GetUnaActividad} from '../../componentes/ConsumirApiRest'

export const Actividad = (props) => {
    const [stateActividades, setStateActividades] = useState({step:0,titlePage: 'Actividad 3W - { Estado }'});
    const {step, titlePage} = stateActividades;
    const [apiActividad, setApiActividad] = useState(null)
    const [apiActividadVariable, setApiActividadVariable] = useState(null)
    const updateStateActividades = (variable, valor) => setStateActividades({...stateActividades, [variable]:valor})
    const cerrar = () => props.setShowActividadCampo(false)

    useEffect(() => {
        const getActividad = async () => {
            let datos = null
            if (step === 0) {
                datos = await GetUnaActividad(props.idAbrirActividad, null,()=>console.log,'programacion')
                setApiActividad(datos)
            }else if(step === 1){
                updateStateActividades('titlePage', 'Recursos Actividad');
            }else if(step === 2){
                datos = await GetUnaActividad(props.idAbrirActividad, null,()=>console.log,'variable')
                setApiActividadVariable(datos)
            }else {
                updateStateActividades('titlePage', '');
            }

            if(step !== 1&&datos!==null){
                updateStateActividades('titlePage',
                    <div> {datos.titulopantalla||datos.tituloPantalla}
                        <button onClick={cerrar} type="button" className="btn btn-outline-danger btn-sm" style={{position:'absolute', right:'10px'}}>
                            Cerrar
                        </button>
                    </div> );
            }
        }
        getActividad()
    }, [step])

    
    return (
        <SweetAlert
            show={props.showActividadCampo}
            title={titlePage}
            onConfirm={()=>null}
            showCancel={false}
            showConfirm={false}
            confirmBtnText={"Aceptar"}
            closeOnClickOutside={false}
            showCloseButton={true}>
            <div style={{backgroundColor:'aliceblue', borderRadius:'1%'}} className="border">
                { (step === 0)  && <View3W apiActividad={apiActividad}/> }
                { (step === 1)  && <ViewRecursos/> }
                { (step === 2)  && <ViewVariables apiActividadVariable={apiActividadVariable}/> }
                <Steps updateStateActividades={updateStateActividades} 
                       stateActividades={stateActividades}
                       cerrar={cerrar}
                       apiActividad={apiActividad}
                       idActividad={props.idAbrirActividad}
                       setIdActividad={props.setIdAbrirActividad}/>
            </div>
        </SweetAlert>
    )
}

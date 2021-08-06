import React, { useEffect, useState } from 'react'
import Steps from './componentes/Steps'
import { View3W } from './views/View3W';
import { ViewRecursos } from './views/ViewRecursos';
import { ViewVariables } from './views/ViewVariables';
import './actividades.css';
import { ActividadRecursos } from './views/ActividadRecursos';

export const Actividad = () => {
    const [stateActividades, setStateActividades] = useState(
        {
            step:0,
            titlePage: 'Actividad 3W - { Estado }',
        }
    );
    const {step, titlePage} = stateActividades;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateStateActividades = (variable, valor)=>{
        setStateActividades({...stateActividades, [variable]:valor});
    }

    const cerrar = () => {
        console.log('Cerrando....')
    }

    useEffect(() => {
        if (step === 0) {
            updateStateActividades('titlePage', 'Actividad 3W - { Estado }');
        }else if(step === 1){
            updateStateActividades('titlePage', 'Tareas de Actividad');
        }else if(step === 2){
            updateStateActividades('titlePage', 'Variables Cumplidas');
        }else {
            updateStateActividades('titlePage', '');
        }
        return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])

    return (
        <div style={{backgroundColor:'aliceblue', paddingTop:'10px'/* , height:'100%' */}}>
            <div style={{display:'flex', /* justifyContent:'space-around', */ alignItems:'center', marginBottom:'20px'}}>
                
                <p>{titlePage}</p>
                {
                    step < 3 && <button onClick={cerrar} type="button" class="btn btn-outline-danger btn-sm" style={{position:'absolute', right:'10px'}}>Cerrar</button>
                }
                
            </div>
            {
                (step === 0)  && <View3W/>
            }
            {
                (step === 1)  && <ActividadRecursos />
            }
            {
                (step === 2)  && <ViewVariables/>
            }
            <Steps updateStateActividades={updateStateActividades} stateActividades={stateActividades}/>
            
        </div>
    )
}

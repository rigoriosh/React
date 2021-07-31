import React, { useEffect, useState } from 'react'
import Steps from './componentes/Steps'
import { View3W } from './views/View3W';
import { ViewRecursos } from './views/ViewRecursos';
import { ViewVariables } from './views/ViewVariables';
import './actividades.css';

export const Actividad = () => {
    const [stateActividades, setStateActividades] = useState(
        {
            step:0,
            titlePage: 'Actividad 3W - { Estado }',
        }
    );

    const {step, titlePage} = stateActividades;

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
            updateStateActividades('titlePage', 'Recursos Actividad');
        }else {
            updateStateActividades('titlePage', 'Variables Cumplidas');
        }
        return () => { }
    }, [step])

    
    
    return (
        <div style={{backgroundColor:'aliceblue', paddingTop:'10px', height:'110%'}}>
            <div style={{display:'flex', /* justifyContent:'space-around', */ alignItems:'center', marginBottom:'20px'}}>
                
                <p>{titlePage}</p>
                <button onClick={cerrar} type="button" class="btn btn-outline-danger btn-sm" style={{position:'absolute', right:'10px'}}>Cerrar</button>
            </div>
            {
                (step === 0)  && <View3W/>
            }
            {
                (step === 1)  && <ViewRecursos />
            }
            {
                (step === 2)  && <ViewVariables/>
            }
            <Steps updateStateActividades={updateStateActividades} stateActividades={stateActividades}/>
            
        </div>
    )
}

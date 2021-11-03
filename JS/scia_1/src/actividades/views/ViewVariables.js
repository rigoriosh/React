import React, { useState } from 'react'

export const ViewVariables = () => {
    const [stateVariablesCumplidas, setStateVariablesCumplidas] = useState(
        {
            titlePag:'',
            formulario:{
                personas: false,
                HSE: false,
                Documentos: false,
                Calidad: false,
                Area: false,
                Materiales: false,
                Herramientas: false,
                Equipos: false,
                observations:''
            }
        }
    );
    const {/* titlePag, */ formulario} = stateVariablesCumplidas;
    const {personas, HSE, Documentos, Calidad, Area, Materiales, Herramientas, Equipos} = formulario;
    const updateChecksFormulario = (target) => {
        console.log({[target.name]: target.checked})
        setStateVariablesCumplidas(
            {
                ...stateVariablesCumplidas,
                formulario: {
                    ...formulario,
                    [target.name]: target.checked
                } 
            })
    }
    const handleObservations = (target) => {
        console.log({[target.name]: target.value})
        setStateVariablesCumplidas(
            {
                ...stateVariablesCumplidas,
                formulario: {
                    ...formulario,
                    [target.name]: target.value
                } 
            })
    }
    console.log(stateVariablesCumplidas)
    const titleView = () => {
        return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
        ? `Hoy 21-mar-21 confirmo que se han cumplido las siguientes variables`
        : `Hoy 21-mar-21 confirmo que la actividad 'decripcion de la actividad' no puede ser ejecutada por falta de:`
        
    }
    const observationsPlaceHolder = () => {
        return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
        ? `Observación de cumplimiento de variables`
        : `Observación de no cumplimiento de variable(s)`
        
    }
    const textObservaciones = () => {
        return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
        ? `Por tando; la actividad "descripción de la actividad", cambia de estado a "Programada"`
        : `Observaciones`
        
    }
    return (
        <div >
            <p style={{height:'70px'}}>{titleView()}</p>
            <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px', marginBottom:'15px'}}>
                <div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="personas" style={{color:personas?'green':'red', fontWeight:'bold'}}>Personas</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='personas'  className="form-check-input" type="checkbox" id="personas" />
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="HSE" style={{color:HSE?'green':'red', fontWeight:'bold'}}>HSE</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='HSE' className="form-check-input" type="checkbox" id="HSE"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Documentos" style={{color:Documentos?'green':'red', fontWeight:'bold'}}>Documentos</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Documentos' className="form-check-input" type="checkbox" id="Documentos"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Calidad" style={{color:Calidad?'green':'red', fontWeight:'bold'}}>Calidad</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Calidad' className="form-check-input" type="checkbox" id="Calidad"/>
                    </div>
                </div>
                <div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Area" style={{color:Area?'green':'red', fontWeight:'bold'}}>Área</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Area' className="form-check-input" type="checkbox" id="Area"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Materiales" style={{color:Materiales?'green':'red', fontWeight:'bold'}}>Materiales</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Materiales' className="form-check-input" type="checkbox" id="Materiales"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Herramientas" style={{color:Herramientas?'green':'red', fontWeight:'bold'}}>Herramientas</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Herramientas' className="form-check-input" type="checkbox" id="Herramientas"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Equipos" style={{color:Equipos?'green':'red', fontWeight:'bold'}}>Equipos</label>
                        <input onChange={({target})=>updateChecksFormulario(target)} name='Equipos' className="form-check-input" type="checkbox" id="Equipos"/>
                    </div>
                </div>
            </div>
            <p>{textObservaciones()}</p>
            <div className="input-group">
                <textarea onChange={({target})=>handleObservations(target)} name="observations" className="form-control" aria-label="observations" 
                    placeholder={observationsPlaceHolder()} style={{height: "100px"}}></textarea>
            </div>
        </div>
    )
}

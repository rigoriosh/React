import React, { useState, useEffect } from 'react'

export const ViewVariables = (props) => {
    const variables = props.apiActividadVariable
    const [stateVariablesCumplidas, setStateVariablesCumplidas] = useState(
        {
            titlePag:'',
            formulario:{
                personas: false,
                HSE: false,
                Documentos: false,
                Calidad: false,
                Area: false,
                Materiales:false,
                Herramientas: false,
                Equipos: false,
                observations:false,
            }
        }
    );

    useEffect(() => {
        setStateVariablesCumplidas({
            ...stateVariablesCumplidas,
            formulario:{
                personas: (variables!==null)?variables.personas:false,
                HSE: (variables!==null)?variables.hse:false,
                Documentos: (variables!==null)?variables.documentos:false,
                Calidad: (variables!==null)?variables.calidad:false,
                Area: (variables!==null)?variables.area:false,
                Materiales:(variables!==null)?variables.materiales:false,
                Herramientas: (variables!==null)?variables.herramientas:false,
                Equipos: (variables!==null)?variables.equipos:false,
                observations:(variables!==null)?variables.observacion:false,
            }
        })
    },[props.apiActividadVariable])

    const {titlePag, formulario} = stateVariablesCumplidas;
    const {personas, HSE, Documentos, Calidad, Area, Materiales, Herramientas, Equipos} = formulario;
    const updateChecksFormulario = (target) => {
        setStateVariablesCumplidas(
            {
                ...stateVariablesCumplidas,
                formulario: {
                    ...formulario,
                    [target.name]: target.checked
                } 
            })
    }
    const titleView = () => {
        if(variables!==null)
            return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
                ? variables.lblobjeto3
                : variables.lblobjeto3no
        else
            return ''
    }
    const observationsPlaceHolder = () => {
        return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
        ? `Observación de cumplimiento de variables`
        : `Observación de no cumplimiento de variable(s)`
        
    }
    const textObservaciones = () => {
        if(variables!==null)
            return (personas && HSE && Documentos && Calidad && Area && Materiales && Herramientas && Equipos)
                ? variables.lblobjeto5
                : variables.lblobjeto5no
        else
            return ''
    }
    return (
        <div >
            <p style={{height:'70px'}}>{titleView()}</p>
            <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px', marginBottom:'15px'}}>
                <div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="personas" style={{color:personas?'green':'red', fontWeight:'bold'}}>Personas</label>
                        <input checked={personas}  onChange={({target})=>updateChecksFormulario(target)} id='varPersonas' name='personas'  className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="HSE" style={{color:HSE?'green':'red', fontWeight:'bold'}}>HSE</label>
                        <input checked={HSE} onChange={({target})=>updateChecksFormulario(target)} id='varHSE' name="HSE" className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Documentos" style={{color:Documentos?'green':'red', fontWeight:'bold'}}>Documentos</label>
                        <input checked={Documentos} onChange={({target})=>updateChecksFormulario(target)} id='varDocumentos' name="Documentos" className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Calidad" style={{color:Calidad?'green':'red', fontWeight:'bold'}}>Calidad</label>
                        <input checked={Calidad} onChange={({target})=>updateChecksFormulario(target)} id='varCalidad'name="Calidad" className="form-check-input" type="checkbox"/>
                    </div>
                </div>
                <div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Area" style={{color:Area?'green':'red', fontWeight:'bold'}}>Área</label>
                        <input checked={Area} onChange={({target})=>updateChecksFormulario(target)} id='varArea' name="Area" className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Materiales" style={{color:Materiales?'green':'red', fontWeight:'bold'}}>Materiales</label>
                        <input checked={Materiales} onChange={({target})=>updateChecksFormulario(target)} id='varMateriales' name="Materiales" className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Herramientas" style={{color:Herramientas?'green':'red', fontWeight:'bold'}}>Herramientas</label>
                        <input checked={Herramientas} onChange={({target})=>updateChecksFormulario(target)} id='varHerramientas' name="Herramientas" className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="Equipos" style={{color:Equipos?'green':'red', fontWeight:'bold'}}>Equipos</label>
                        <input checked={Equipos} onChange={({target})=>updateChecksFormulario(target)} id='varEquipos' name="Equipos" className="form-check-input" type="checkbox"/>
                    </div>
                </div>
            </div>
            <p>{textObservaciones()}</p>
            <div className="input-group">
                <textarea onChange={({target})=>updateChecksFormulario(target)} id="varObservations" name="observations" className="form-control" aria-label="observations" 
                   value={formulario.observations} placeholder={observationsPlaceHolder()} style={{height: "100px"}}></textarea>
            </div>
        </div>
    )
}

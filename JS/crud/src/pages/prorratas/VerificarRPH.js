import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";

import { mostrarDialog, mostrarMensaje, ocultarMensaje } from '../../Redux-actions/alertasMensajes_action';
import { estadoLiberacion, tiposCrud, tiposDeInmuebles, tiposEstadoInmuebles } from '../../Tools/dominios';
import Seleccionar from '../../components/Select';


const formularioInitialState = {
    tipoInmueble:   '',
    nomenclatura:   '',
    interior:       '',
    etapa:          '',
    area:           '',
    verificadoRPH:   false,
    estadoInmueble: tiposEstadoInmuebles.INACTIVO,
    estadoLiberacion: estadoLiberacion.NOLIBERADO
};
const validacionesFomrularioInitialState = {
    tipoInmueble: null,
    nomenclatura: null,   
    area: null,
    verificadoRPH: null,
    estadoInmueble: null,
}
const initialState = {
    modoFormulario: tiposCrud.guardar,
    inmuebles: [],
    formulario: formularioInitialState,
    validacionesFormlario: validacionesFomrularioInitialState,
    banderaAgregarRegistro: false,
    tiposInmuebles: tiposDeInmuebles
};

export const VerificarRPH = () => {
    console.log('in VerificarRPH');
    const [stateVerificarRPH, setStateVerificarRPH] = useState(initialState);
    const {modoFormulario, inmuebles, formulario, validacionesFormlario, banderaAgregarRegistro, tiposInmuebles} = stateVerificarRPH;
    const {tipoInmueble, nomenclatura, interior, etapa, area, verificadoRPH, estadoInmueble} = formulario;

    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: traer data de inmuebles
        setStateVerificarRPH({
            ...stateVerificarRPH,
            inmuebles:[]
        });
        return () => { }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) modoFormulario === tiposCrud.guardar ? agregarNuevoInmueble() : dispatch(mostrarDialog('Nota', 'Esta segur@ de EDITAR este inmueble'));
    };

    const checkValidaciones = () => {

        /* if(nombreRepetido(parametrosDeslSistema, formParametrosDelsistema, 'nombreParametro') && modoFormulario === tiposCrud.guardar){            
            dispatch(mostrarMensaje('warning', 'No se puede adicionar el inmueble porque ya existe uno con las mismas caractrísticas'));
            return false;
        }    

        if (
            (!esEntero(formParametrosDelsistema.valorParametro) && formParametrosDelsistema.selectTipoDeDato === 'Entero') ||            
            ( !isNaN(formParametrosDelsistema.valorParametro * 1) && formParametrosDelsistema.selectTipoDeDato === 'Texto') ||
            ( !esFlotante(formParametrosDelsistema.valorParametro) && formParametrosDelsistema.selectTipoDeDato === 'Flotante') 
            )  {
                setValidaciones({...validaciones, selectTipoDeDato:'El campo valor no coincide con el tipo de dato seleccionado'});
                return false;
        } */

        setStateVerificarRPH( { ...stateVerificarRPH, validacionesFormlario: validacionesFomrularioInitialState });
        return true;
    }

    const agregarNuevoInmueble = () => {
        setStateVerificarRPH( //GUARDA UN NUEVO PARÁMETRO
            {
                ...stateVerificarRPH,
                inmuebles:  [                    
                    {
                        id: Date.parse(Date()), tipoInmueble, nomenclatura, interior, etapa,
                        area, verificadoRPH, estadoInmueble,
                    },
                    ...inmuebles,
                ]
            }
        );   
        limpiarFormulario();  
        ocultarMostarFormulario();
    }

    const limpiarFormulario = () => { setStateVerificarRPH({...stateVerificarRPH, formulario: formularioInitialState}); }
    const ocultarMostarFormulario = () => {setStateVerificarRPH( { ...stateVerificarRPH, banderaAgregarRegistro: !banderaAgregarRegistro })}

    console.log(stateVerificarRPH);
    return (
        <>
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Verificar RPH</h3>
            <div className="contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel control={ <Switch checked={!banderaAgregarRegistro} onChange={ocultarMostarFormulario} name="checkedA" /> }
                        label="Agregar inmueble" 
                    />
                    {
                        banderaAgregarRegistro && 
                        <>
                            <Seleccionar id={"selectTipoInmueble"} label={"Tipo de inmmueble *"} optInit={"Seleccione"} options={tiposInmuebles}
                             valorSeleccionado={tipoInmueble} requerido={true}
                             handleSelect={(value)=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, tipoInmueble: value}})}}
                            />  

                            <div className="columna1 ali-item-cent">
                                <TextField id="nomenclatura"  className="input no-margen-inferior" label="Nomenclatura " variant="outlined"
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, nomenclatura: target.value}})}}
                                    value={nomenclatura} required 
                                />                    
                            </div>

                            <div className="columna1 ali-item-cent ">
                                <TextField id="interior" className="input no-margen-inferior h100" label="Interior" variant="outlined"
                                    value={interior} /* multiline */
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, interior: target.value}})}}                                    
                                />                    
                            </div>

                            <div className="columna1 ali-item-cent ">
                                <TextField id="etapa" className="input no-margen-inferior h100" label="Etapa" variant="outlined"
                                    value={etapa} /* multiline requerido*/
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, etapa: target.value}})}}                                    
                                />                    
                            </div>
                            
                            <div className="columna1 ali-item-cent ">
                                <TextField id="area" className="input no-margen-inferior h100" label="Area " variant="outlined"
                                    value={area} required
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, area: target.value}})}}                                    
                                />                    
                            </div>

                            <div className="columna1 ali-item-cent ">
                                <TextField id="estadoInmueble" className="input no-margen-inferior h100" label="Estado del inmueble" variant="outlined"
                                    value={estadoInmueble} disabled 
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, estadoInmueble: target.value}})}}                                    
                                />                    
                            </div>

                            <div className="columna1 ali-item-cent ">
                                <label><input type="checkbox" id="verificadoRPH" checked={verificadoRPH}
                                    onChange={({target})=>{setStateVerificarRPH({...stateVerificarRPH, formulario:{...formulario, verificadoRPH: target.checked}})}}/> Verificado RPH</label>                                
                            </div>
                            
       
                            <div className="elem-derecha btnIngresar mt-10">
                                <button className="boton" type="submit"> {modoFormulario} </button>
                                <button className="boton ml-10" type="reset" onClick={limpiarFormulario}> Nuevo </button>
                            </div>
                        </>
                    
                    }
                    
                </form>
            </div>
        </>
    )
}

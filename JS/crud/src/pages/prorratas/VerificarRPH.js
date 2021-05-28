import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import DataTable from "../../components/DataTable";
import { mostrarDialog, mostrarMensaje, ocultarMensaje } from '../../Redux-actions/alertasMensajes_action';
import { estadoLiberacion, tiposCrud, tiposDeInmuebles, tiposEstadoInmuebles } from '../../Tools/dominios';
import Seleccionar from '../../components/Select';


const configRowsTable = [
    { id:0, tipoInmueble: '', nomenclatura: '',  etapa: '', interior:'', area:'', verificadoRPH: '',
        estadoInmueble: '', estadoLiberacion: ''},
  ];
const formularioInitialState = {
    tipoInmueble:   '',
    nomenclatura:   '',
    etapa:          '',
    interior:       '',
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
    inmuebles:[],   
    formulario: formularioInitialState,
    validacionesFormlario: validacionesFomrularioInitialState,
    banderaAgregarRegistro: false,
    tiposInmuebles: tiposDeInmuebles,    
};

export const VerificarRPH = () => {
    console.log('in VerificarRPH');
    const configColumnasTable = [
        {field:'tipoInmueble', headerName: 'Tipo inmueble', width: 150},
        {field:'nomenclatura', headerName: 'Nomenclatura', width: 150},
        {field:'etapa', headerName: 'Etapa', width: 150},
        {field:'interior', headerName: 'Interior', width: 150},
        {field:'area', headerName: 'Área', width: 150},
        {field:'verificadoRPH', headerName: 'Verificado RPH', width: 150},
        {field:'estadoInmueble', headerName: 'Estado', width: 150},
        {field:'estadoLiberacion', headerName: 'Estado Liberación', width: 150},
        {field:'acciones', headerName: ' ', width: 150,
        renderCell: (params) => (
            <strong>   
                
                <EditIcon onClick={()=>{editarInmueble(params.row)}} className="apuntador"/>                  
                <DeleteForeverIcon onClick={()=>{eliminarInmueble(params.row)}} className="apuntador"/>
                
            </strong>
            ),},
    ];
    const dispatch = useDispatch();
    const {alertas_mensajes_reducer} = useSelector(state => state);
    const {respuestaDialog} = alertas_mensajes_reducer;
    const [state, setState] = useState(initialState);
    const {modoFormulario, formulario, validacionesFormlario, banderaAgregarRegistro, tiposInmuebles} = state;
    const {tipoInmueble, nomenclatura, interior, etapa, area, verificadoRPH, estadoInmueble} = formulario;
    const [registroSeleccionado, setRegistroSeleccionado] = useState();
    console.log(registroSeleccionado);    
    const [inmuebles, setInmuebles] = useState([])

    /* useEffect(() => {
        // TODO: traer data de inmuebles
        setState({
            ...state,
            inmuebles:configRowsTable
        });
        return () => { }
    }, []) */


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

        setState( { ...state, validacionesFormlario: validacionesFomrularioInitialState });
        return true;
    }

    const agregarNuevoInmueble = () => {
              
        setInmuebles( //GUARDA UN NUEVO PARÁMETRO
            [   
                { id: Date.parse(Date()), ...formulario, verificadoRPH: verificadoRPH ? 'Si' : 'No', estadoLiberacion: estadoLiberacion.NOLIBERADO },
                ...inmuebles,
            ],
        );          
        
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se agregó correctamente'));
    }

    useEffect(() => {
        setState({...state, inmuebles});
        limpiarFormulario();  
        return () => { }
    }, [inmuebles])

    const editarInmueble = (inmuebleAeditar) => {
        console.log('editarInmueble', inmuebleAeditar);
        // poner en modo editar, cargar el formulario con la data seleccionada y mostrar formulario
        setState({ ...state, modoFormulario: tiposCrud.editar, formulario: inmuebleAeditar, banderaAgregarRegistro: !banderaAgregarRegistro});
    }

    const confirmacionEditarInmueble = () => {
        const inmueblesEditados = inmuebles.map(inmueble => {
            return inmueble.id === formulario.id ? {...formulario, verificadoRPH:  verificadoRPH ? 'Si' : 'No'}: inmueble
        });
        setInmuebles(inmueblesEditados);
        setState({...state, inmuebles: inmueblesEditados});
        limpiarFormulario();
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se editó correctamente'));
    }    

    const eliminarInmueble = (inmuebleAEliminar) => {
        console.log('eliminarInmueble', inmuebleAEliminar);
        setState({ ...state, modoFormulario: tiposCrud.eliminar, formulario: inmuebleAEliminar, banderaAgregarRegistro: true});        
        dispatch(mostrarDialog('Nota', '¿ Esta segur@ de eliminar este inmueble ?'));
    }
    
    const confirmacionEliminarInmueble = () => {
        const inmueblesEditados = inmuebles.filter(inmueble => inmueble.id !== registroSeleccionado.id);                
        setInmuebles(inmueblesEditados);
        setState({...state, inmuebles: inmueblesEditados});
        limpiarFormulario();
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se eliminó correctamente'));
    }

    const limpiarFormulario = () => { setState({...state, formulario: formularioInitialState, modoFormulario: tiposCrud.guardar, banderaAgregarRegistro: false}); }
    const ocultarMostarFormulario = (estado) => {setState( { ...state, banderaAgregarRegistro: estado })}

    useEffect(() => {//SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
        console.log(registroSeleccionado)
        // respuestaDialog es la respuesta del modal
        if (respuestaDialog && modoFormulario === tiposCrud.eliminar) confirmacionEliminarInmueble();

       (respuestaDialog && modoFormulario === tiposCrud.editar) ? confirmacionEditarInmueble() : limpiarFormulario();


        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respuestaDialog])
    console.log(state, inmuebles);
    return (
        <>
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Verificar RPH</h3>
            <div className="contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel control={ <Switch checked={!banderaAgregarRegistro} onChange={()=>ocultarMostarFormulario(!banderaAgregarRegistro)} name="checkedA" /> }
                        label="Agregar inmueble" 
                    />
                    {
                        banderaAgregarRegistro && 
                        < >                             
                            <div className="grid col-2">
                                <div>
                                    <Seleccionar id={"selectTipoInmueble"} label={"Tipo de inmmueble *"} optInit={"Seleccione"} options={tiposInmuebles}
                                        valorSeleccionado={tipoInmueble} requerido={true}
                                        handleSelect={(value)=>{setState({...state, formulario:{...formulario, tipoInmueble: value}})}}
                                    /> 
                                    <div className="columna1 ali-item-cent">
                                        <TextField id="nomenclatura"  className="input no-margen-inferior" label="Nomenclatura " variant="outlined"
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, nomenclatura: target.value}})}}
                                            value={nomenclatura} required 
                                        />                    
                                    </div>

                                    <div className="columna1 ali-item-cent ">
                                        <TextField id="interior" className="input no-margen-inferior h100" label="Interior" variant="outlined"
                                            value={interior} /* multiline */
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, interior: target.value}})}}                                    
                                        />                    
                                    </div>                                    
                                </div>
                                <div>
                                    <div className="columna1 ali-item-cent ">
                                        <TextField id="etapa" className="input no-margen-inferior h100" label="Etapa" variant="outlined"
                                            value={etapa} /* multiline requerido*/
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, etapa: target.value}})}}                                    
                                        />                    
                                    </div>
                                    <div className="columna1 ali-item-cent ">
                                        <TextField id="area" className="input no-margen-inferior h100" label="Area " variant="outlined"
                                            value={area} required
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, area: target.value}})}}                                    
                                        />                    
                                    </div>
                                    <div className="columna1 ali-item-cent ">
                                        <TextField id="estadoInmueble" className="input no-margen-inferior h100" label="Estado del inmueble" variant="outlined"
                                            value={estadoInmueble} disabled 
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, estadoInmueble: target.value}})}}                                    
                                        />                    
                                    </div>
                                    <div className="columna1 ali-item-cent ">
                                        <label><input type="checkbox" id="verificadoRPH" checked={verificadoRPH}
                                            onChange={({target})=>{setState({...state, formulario:{...formulario, verificadoRPH: target.checked}})}}/> Verificado RPH</label>                                
                                    </div>
                                    

                                </div>                            
                            </div>
                            <div className="elem-derecha btnIngresar mt-10">
                                <button className="boton" type="submit"> {modoFormulario} </button>
                                <button className="boton ml-10" type="reset" onClick={limpiarFormulario}> Nuevo </button>
                            </div>                            
                            
                        </>
                    }
                    
                </form>                
            </div>
            <DataTable columns={configColumnasTable} rows={inmuebles} setRegistroSeleccionado={setRegistroSeleccionado}/>
        </>
    )
}

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import '../../css/verificarRPH.css'
import DataTable from "../../components/DataTable";
import { mostrarDialog, mostrarMensaje, ocultarMensaje } from '../../Redux-actions/alertasMensajes_action';
import { estadoLiberacion, tiposCrud, tiposDeInmuebles, tiposEstadoInmuebles } from '../../Tools/dominios';
import Seleccionar from '../../components/Select';
import { ubicarScrollBar } from '../../helpers/helperUtil';
import { updateCargueCuadroDeAreas } from '../../Redux-actions/cargueCuadroDeAreas_action';


/* const configRowsTable = [
    { id:0, TipodeInmueble: '', Nomenclatura: '',  Etapa: '', Interior:'', AreaMt2:'', verificadoRPH: '',
        estadoInmueble: '', estadoLiberacion: ''},
  ]; */
const formularioInitialState = {
    AreaMt2:           '',
    Etapa:          '',
    Interior:       '',
    Nomenclatura:   '',
    TipodeInmueble:   '',
    estadoInmueble: tiposEstadoInmuebles.INACTIVO,
    estadoLiberacion: estadoLiberacion.NOLIBERADO,
    verificadoRPH:   false,
};
const validacionesFomrularioInitialState = {
    TipodeInmueble: null,
    Nomenclatura: null,   
    AreaMt2: null,
    verificadoRPH: null,
    estadoInmueble: null,
}
const initialState = {
    modoFormulario: tiposCrud.guardar, 
    inmuebles:[],
    inmueblesSeleccionadosParaModificar:[],
    formulario: formularioInitialState,
    validacionesFormlario: validacionesFomrularioInitialState,
    banderaAgregarRegistro: false,
    tiposInmuebles: tiposDeInmuebles,    
};

const ubicacionMitadaPagina = 600;
const tipoCrudVrph = {actualizarCuadroDeAreas:'actualizarCuadroDeAreas'}
export const VerificarRPH = () => {
    console.log('in VerificarRPH');
    const configColumnasTable = [
        {field:'TipodeInmueble', headerName: 'Tipo inmueble', width: 150},
        {field:'Nomenclatura', headerName: 'Nomenclatura', width: 150},
        {field:'Etapa', headerName: 'Etapa', width: 100},
        {field:'Interior', headerName: 'Interior', width: 100},
        {field:'AreaMt2', headerName: 'Área mt2', width: 110},
        {field:'verificadoRPH', headerName: 'Verificado RPH', width: 150},
        {field:'estadoInmueble', headerName: 'Estado', width: 100},
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
    const {cargueCuadroDeAreas_reducer, alertas_mensajes_reducer} = useSelector(state => state);
    const {rows} = cargueCuadroDeAreas_reducer;
    const {respuestaDialog} = alertas_mensajes_reducer;
    const [state, setState] = useState(initialState);
    const {modoFormulario, formulario, validacionesFormlario, banderaAgregarRegistro, tiposInmuebles} = state;
    const {TipodeInmueble, Nomenclatura, Interior, Etapa, AreaMt2, verificadoRPH, estadoInmueble} = formulario;
    const [registroSeleccionado, setRegistroSeleccionado] = useState();    
    const [inmueblesFromCargueCuadroAreas, setInmueblesFromCargueCuadroAreas] = useState([]);
    const [inmueblesSeleccionadosParaModificar, setInmueblesSeleccionadosParaModificar] = useState([]);

    const dataAjustada = (rows) => {//toma el cuadro de areas cargado y a cada registro le agrega los tres campos por defecto.
        const dataAjustada = rows.map(inmueble => ({
            ...inmueble, verificadoRPH: 'No', estadoLiberacion: estadoLiberacion.NOLIBERADO, estadoInmueble: tiposEstadoInmuebles.INACTIVO
        }))
        return dataAjustada;
    }

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
              
        setInmueblesSeleccionadosParaModificar( //GUARDA UN NUEVO PARÁMETRO
            [   
                { id: Date.parse(Date()), ...formulario, verificadoRPH: verificadoRPH ? 'Si' : 'No', estadoLiberacion: estadoLiberacion.NOLIBERADO },
                ...inmueblesSeleccionadosParaModificar,
            ],
        );          
        
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se agregó correctamente a la lista de modificados'));
        ajustarPosicionScrollBar(ubicacionMitadaPagina);        
    }

    const ajustarPosicionScrollBar = (posicion = 0) => {
        if (posicion === 0) {
            ubicarScrollBar(posicion);            
        } else if(inmueblesFromCargueCuadroAreas.length > 15 || inmueblesSeleccionadosParaModificar.length > 15){
            ubicarScrollBar(posicion); // a la mitada de la pagina en donde esta la tabla de inmuebles modificados
        }
    }


    const editarInmueble = (inmuebleAeditar) => {
        console.log('editarInmueble', inmuebleAeditar);
        // poner en modo editar, cargar el formulario con la data seleccionada y mostrar formulario
        setState({ ...state, modoFormulario: tiposCrud.editar, formulario: inmuebleAeditar, banderaAgregarRegistro: true});
        ubicarScrollBar();
    }

    const confirmacionEditarInmueble = () => {

        // Quitar inmueble seleccionado de la lista inmuebles y agregar a la lista de inmueblesSeleccionadosParaModificar
        const listaInmueblesUpdated = inmueblesFromCargueCuadroAreas.filter(inmueble => inmueble.id !== formulario.id);        
        setInmueblesFromCargueCuadroAreas(listaInmueblesUpdated);                
        
        /// agregar formulario a la lista de inmueblesSeleccionadosParaModificar        
        if(inmueblesSeleccionadosParaModificar.length < 0 || !inmueblesSeleccionadosParaModificar.includes(formulario)){            
            setInmueblesSeleccionadosParaModificar([...inmueblesSeleccionadosParaModificar, {...formulario, verificadoRPH:  verificadoRPH ? 'Si' : 'No'}]);
        } else{           
            const dataTemp = inmueblesSeleccionadosParaModificar.map(inmueble => {
                return inmueble.id === formulario.id ? {...formulario, verificadoRPH:  verificadoRPH ? 'Si' : 'No'}: inmueble
            });
            setInmueblesSeleccionadosParaModificar(dataTemp)
        }              
        
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se adicionó correctamente a la lista'));
        ubicarScrollBar(ubicacionMitadaPagina); // a la mitada de la pagina en donde esta la tabla de inmuebles modificados
    }    

    const eliminarInmueble = (inmuebleAEliminar) => {
        console.log('eliminarInmueble', inmuebleAEliminar);
        setState({ ...state, modoFormulario: tiposCrud.eliminar, formulario: inmuebleAEliminar, banderaAgregarRegistro: true});        
        dispatch(mostrarDialog('Nota', '¿ Esta segur@ de eliminar este inmueble ?'));
    }
    
    const confirmacionEliminarInmueble = () => {
        const inmueblesEditados = inmueblesFromCargueCuadroAreas.filter(inmueble => inmueble.id !== formulario.id);                
        setInmueblesFromCargueCuadroAreas(inmueblesEditados);        

        const inmueblesEditadosParaModificar = inmueblesSeleccionadosParaModificar.filter(inmueble => inmueble.id !== formulario.id);                
        setInmueblesSeleccionadosParaModificar(inmueblesEditadosParaModificar);        
        
        ocultarMostarFormulario(false);
        dispatch(mostrarMensaje('success', 'El inmueble se eliminó correctamente'));
    }

    const limpiarFormulario = () => { setState({...state, formulario: formularioInitialState, modoFormulario: tiposCrud.guardar, banderaAgregarRegistro: false}); }
    const ocultarMostarFormulario = (estado) => {setState( { ...state, banderaAgregarRegistro: estado })}

    const actualizarDataCuadroDeAreas = () => {
        setState({ ...state, modoFormulario: tipoCrudVrph.actualizarCuadroDeAreas});
        dispatch(mostrarDialog('Nota',
            `¿ Esta segur@ de modificar los ${ (inmueblesSeleccionadosParaModificar.length === 0) 
                ? inmueblesFromCargueCuadroAreas.length 
                : inmueblesSeleccionadosParaModificar.length} inmuebles y que pasen al cuadro de áreas ?`));
    }
    const confirmacionActualizarDataCuadroDeAreas = () => {
        const inmCCA_temp = [...inmueblesSeleccionadosParaModificar, ...inmueblesFromCargueCuadroAreas];        
        setInmueblesSeleccionadosParaModificar([]);
        setInmueblesFromCargueCuadroAreas(inmCCA_temp);
        dispatch(updateCargueCuadroDeAreas(inmCCA_temp));
        ubicarScrollBar();
    }
    
    useEffect(() => {
        // TODO: traer data de inmuebles   
        if (rows?.length > 0) {
            setInmueblesFromCargueCuadroAreas(dataAjustada(rows));            
        }     
        ubicarScrollBar();
        return () => { }
    }, [])

    useEffect(() => {//limpia el formulario despues de aver actualizado inmueblesSeleccionadosParaModificar
        limpiarFormulario();  
        return () => { }
    }, [inmueblesSeleccionadosParaModificar])

    useEffect(() => {//SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
        console.log(registroSeleccionado)
        // respuestaDialog es la respuesta del modal
        if (respuestaDialog) {
            if (modoFormulario === tiposCrud.editar) { confirmacionEditarInmueble(); }
            else if(modoFormulario === tiposCrud.eliminar){ confirmacionEliminarInmueble(); }
            else if(modoFormulario === tipoCrudVrph.actualizarCuadroDeAreas){ confirmacionActualizarDataCuadroDeAreas(); } 
        } else { limpiarFormulario(); }
        //ubicarScrollBar();
        //if (respuestaDialog && modoFormulario === tiposCrud.eliminar) confirmacionEliminarInmueble();
       /* if(respuestaDialog && modoFormulario === tiposCrud.editar){
           confirmacionEditarInmueble();
        }else if(respuestaDialog && modoFormulario === tiposCrud.editar){
            limpiarFormulario();
        }
 */
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respuestaDialog])
    console.log(state, inmueblesFromCargueCuadroAreas, inmueblesSeleccionadosParaModificar);
    return (
        <>
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Verificar RPH</h3>
            {/* {
                (inmueblesFromCargueCuadroAreas?.length > 0) && */}
                
                <div className="verificarRPH-encabezado">
                    <div >
                        <form onSubmit={handleSubmit} className="card">                        
                            <FormControlLabel control={ <Switch checked={!banderaAgregarRegistro} onChange={()=>ocultarMostarFormulario(!banderaAgregarRegistro)} name="checkedA" /> }
                                label="Agregar inmueble" 
                            />
                            {
                                banderaAgregarRegistro && 
                                < >                             
                                    <div className="grid col-2">
                                        <div>
                                            <Seleccionar id={"selectTipodeInmueble"} label={"Tipo de inmmueble *"} optInit={"Seleccione"} options={tiposInmuebles}
                                                valorSeleccionado={TipodeInmueble} requerido={true}
                                                handleSelect={(value)=>{setState({...state, formulario:{...formulario, TipodeInmueble: value}})}}
                                            /> 
                                            <div className="columna1 ali-item-cent">
                                                <TextField id="Nomenclatura"  className="input no-margen-inferior" label="Nomenclatura " variant="outlined"
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, Nomenclatura: target.value}})}}
                                                    value={Nomenclatura} required 
                                                />                    
                                            </div>

                                            <div className="columna1 ali-item-cent ">
                                                <TextField id="Interior" className="input no-margen-inferior h100" label="Interior" variant="outlined"
                                                    value={Interior} /* multiline */
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, Interior: target.value}})}}                                    
                                                />                    
                                            </div>                                    
                                        </div>
                                        <div>
                                            <div className="columna1 ali-item-cent ">
                                                <TextField id="Etapa" className="input no-margen-inferior h100" label="Etapa" variant="outlined"
                                                    value={Etapa} /* multiline requerido*/
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, Etapa: target.value}})}}                                    
                                                />                    
                                            </div>
                                            <div className="columna1 ali-item-cent ">
                                                <TextField id="AreaMt2" className="input no-margen-inferior h100" label="Area " variant="outlined"
                                                    value={AreaMt2} required
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, AreaMt2: target.value}})}}                                    
                                                />                    
                                            </div>
                                            <div className="columna1 ali-item-cent ">
                                                <TextField id="estadoInmueble" className="input no-margen-inferior h100" label="Estado del inmueble" variant="outlined"
                                                    value={estadoInmueble} disabled 
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, estadoInmueble: target.value}})}}                                    
                                                />                    
                                            </div>
                                            <div className="columna1 ali-item-cent ">
                                                <label><input type="checkbox" id="verificadoRPH" checked={(verificadoRPH === 'Si' || verificadoRPH === true) ? true : false}
                                                    onChange={({target})=>{setState({...state, formulario:{...formulario, verificadoRPH: target.checked}})}}/> Verificado RPH</label>                                
                                            </div>
                                            

                                        </div>                            
                                    </div>
                                    <div className="elem-derecha btnIngresar mt-10">
                                        <button className="boton" type="submit"> {(modoFormulario === tiposCrud.editar) ? 'Adicionar a modificados' : modoFormulario} </button>
                                        <button className="boton ml-10" type="reset" onClick={limpiarFormulario}> Nuevo </button>
                                    </div>                            
                                    
                                </>
                            }
                            
                        </form>                
                    </div>  
                    {
                        (inmueblesFromCargueCuadroAreas.length > 15 || inmueblesSeleccionadosParaModificar.length > 15) &&
                        <div className="aligSelfEnd"><button className="boton ml-10" type="reset" onClick={()=>ubicarScrollBar(650)}> Bajar </button></div>
                    }                  
                </div>                
            
            {
                (inmueblesFromCargueCuadroAreas?.length > 0) &&
                
                    <DataTable columns={configColumnasTable} rows={inmueblesFromCargueCuadroAreas} setRegistroSeleccionado={setRegistroSeleccionado}
                    checkboxSelection={true}/>

            }
            {
                (inmueblesSeleccionadosParaModificar?.length > 0) && 
                    <>
                        <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Inmuebles seleccionados para modificar</h3>
                        <DataTable columns={configColumnasTable} rows={inmueblesSeleccionadosParaModificar} setRegistroSeleccionado={setRegistroSeleccionado}/>
                        
                    </>
            }
            <div className="displayFlex justiContFlexEnd">
                
                {
                        (inmueblesFromCargueCuadroAreas.length > 0 || inmueblesSeleccionadosParaModificar.length > 0) &&
                        <button className="boton ml-10" type="reset" onClick={actualizarDataCuadroDeAreas}> Actualizar </button>
                }
                {
                        (inmueblesFromCargueCuadroAreas.length > 15 || inmueblesSeleccionadosParaModificar.length > 15) &&
                        <button className="boton ml-10" type="reset" onClick={()=>ubicarScrollBar()}> Subir </button>
                }
            </div>
        </>
    )
}



    
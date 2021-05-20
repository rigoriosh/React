import React, { useEffect, useRef, useState } from "react";
//import PropTypes from 'prop-types'
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";

import '../../css/parametrosDelSistema.css'
import Seleccionar from "../../components/Select";
import DataTable from '../../components/DataTable'
import { esEntero, esFlotante, nombreRepetido } from "../../helpers/helperUtil";
import { tiposCrud, tiposDeDatos } from "../../Tools/types";
import { mostrarDialog, mostrarMensaje } from "../../Redux-actions/alertasMensajes_action";


const ParametrosDelSistema = (/* {setMensajes, dialog, setDialog} */) => {
    console.log("ParametrosDelSistema");  

    const dispatch = useDispatch();
    const {alertas_mensajes_reducer} = useSelector(state => state);
    const {respuestaDialog} = alertas_mensajes_reducer;
    const refTipoDato = useRef();
    

    const [registroSeleccionado, setRegistroSeleccionado] = useState({});
    const columns = [
    /* { field: "id",                      headerName: "id",           width: 200 }, */
    { field: "nombreParametro",         headerName: "Nombre",       width: 200 },
    { field: "descripcionParametro",    headerName: "Descripción",  width: 200 },
    { field: "valorParametro",          headerName: "Valor",        width: 180 },
    { field: "selectTipoDeDato",        headerName: "Tipo de Dato", width: 200 },    
    { field: "actions",                 headerName: "Acciones",     width: 200,
    renderCell: (params) => (
        <strong>   
            
            <EditIcon onClick={()=>{editarParametro(params.row)}} className="apuntador"/>                  
            <DeleteForeverIcon onClick={()=>{eliminarParametro(params.row)}} className="apuntador"/>
            
        </strong>
        ), },
    ];
    
    const [formParametrosDelsistema, setFormParametrosDelsistema] = useState(
        {
            nombreParametro:'',
            descripcionParametro:'',
            valorParametro:'',
            selectTipoDeDato:''
        }
    );
    const [validaciones, setValidaciones] = useState({ValnombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null}); 
    const [accionesFormulario, setAccionesFormulario] = useState(tiposCrud.guardar); // guardar, editar, eliminar
    const [parametrosDeslSistema, setParametrosDeslSistema] = useState([]);// ALMACENA LOS PARAMETROS DEL SISTEMA
    const [agregarRegistro, setAgregarRegistro] = useState(false); // muestra el formulario para agregar un registro
    
    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) accionesFormulario === tiposCrud.guardar ? agregarNuevoParametroAlSistema() : dispatch(mostrarDialog('Nota', 'Esta segur@ de EDITAR este parámetro del sistema'));
    };

    const agregarNuevoParametroAlSistema = () => {
        setParametrosDeslSistema( //GUARDA UN NUEVO PARÁMETRO
            [            
                {
                    id: Date.parse(Date()),
                    nombreParametro: formParametrosDelsistema.nombreParametro,
                    descripcionParametro: formParametrosDelsistema.descripcionParametro,
                    valorParametro: formParametrosDelsistema.valorParametro,
                    selectTipoDeDato: formParametrosDelsistema.selectTipoDeDato
                },
                ...parametrosDeslSistema,
            ]
        );     
    }

    const editarParametroDelSistema = () => {
        const parametrosDeslSistemaActualizados = parametrosDeslSistema.map(ps => {
            return ps.id === formParametrosDelsistema.id ? formParametrosDelsistema : ps;
        })
        
        setParametrosDeslSistema(parametrosDeslSistemaActualizados);              
    }

    const editarParametro = (parametroAeditar) => {        
        setFormParametrosDelsistema({...parametroAeditar}); //  carga los datos en el formulario para editarlos
        setAccionesFormulario(tiposCrud.editar); // ajusta la vandera de guardar o editar, por editar
        setAgregarRegistro(true);
    }

    const eliminarParametro = (parametroAEliminar) => {      
        setAccionesFormulario(tiposCrud.eliminar)        
        dispatch(mostrarDialog('Nota', '¿ Esta segur@ de eliminar este parámetro del sistema ?'));
    }

    const eliminarParametroDelSistema = () => { 
        const parametrosDeslSistemaActualizados = parametrosDeslSistema.filter(parametro => parametro !== registroSeleccionado);
        setParametrosDeslSistema(parametrosDeslSistemaActualizados);        
        dispatch(mostrarMensaje('success', 'El parámetro se eliminó correctamente'));
        resetCampos();
    }

    const checkValidaciones = () => {

        if(nombreRepetido(parametrosDeslSistema, formParametrosDelsistema, 'nombreParametro') && accionesFormulario === tiposCrud.guardar){            
            dispatch(mostrarMensaje('warning', 'No se puede almacenar el parámetro del sistema porque ya existe'));
            return false;
        }    

        if (
            (!esEntero(formParametrosDelsistema.valorParametro) && formParametrosDelsistema.selectTipoDeDato === 'Entero') ||            
            ( !isNaN(formParametrosDelsistema.valorParametro * 1) && formParametrosDelsistema.selectTipoDeDato === 'Texto') ||
            ( !esFlotante(formParametrosDelsistema.valorParametro) && formParametrosDelsistema.selectTipoDeDato === 'Flotante') 
            )  {
                setValidaciones({...validaciones, selectTipoDeDato:'El campo valor no coincide con el tipo de dato seleccionado'});
                return false;
        }

        setValidaciones({nombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null});
        return true;
    }

    const resetCampos = () => {
        setFormParametrosDelsistema({nombreParametro:'', descripcionParametro:'', valorParametro:'', selectTipoDeDato:''}); // resetea los campos del formulario
        setValidaciones({nombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null});        
        setAccionesFormulario(tiposCrud.guardar)
    }

    const enviarDB = () => {
        if(agregarRegistro) {
            localStorage.setItem('parametrosDeslSistema', JSON.stringify(parametrosDeslSistema));               
            const txtmsg = accionesFormulario === tiposCrud.guardar ? 'guardó' : 'editó';
            dispatch(mostrarMensaje('success', `El parámetro se ${txtmsg} correctamente`));
            setAgregarRegistro(false);// switch el formulario para mejorar la vista de la tabla
            resetCampos();
        }
    }

    const leerDB = () => {
        const db = JSON.parse(localStorage.getItem('parametrosDeslSistema'))
        if(!!db) setParametrosDeslSistema(db);
    }
    
    useEffect(() => {//SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
        console.log(registroSeleccionado)
        // respuestaDialog es la respuesta del modal
        if (respuestaDialog && accionesFormulario === tiposCrud.eliminar) eliminarParametroDelSistema();

        if (respuestaDialog && accionesFormulario === tiposCrud.editar) editarParametroDelSistema();


        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respuestaDialog])

    // uploadComponent
    useEffect(() => {
        leerDB();
        return () => { //onCloseComponent
        }
    }, [])

    useEffect(() => {
        enviarDB();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parametrosDeslSistema])
        
        
    
    return (
        <div className='pb-20px'>

            {/* Formulario donde se capturan los datos para crear un nuevo parámetro del sistema */}
            <div className="contenedor contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel control={ <Switch checked={!agregarRegistro} onChange={()=>{setAgregarRegistro(!agregarRegistro)}} name="checkedA" /> }
                        label="Agregar un parámetro" 
                    />
                    {
                        agregarRegistro && 
                        <>
                            <div className="columna1 ali-item-cent">
                                <TextField id="nombreParametro"  className="input no-margen-inferior" label="Nombre del parámetro" variant="outlined"
                                    onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, nombreParametro: target.value})}}
                                    value={formParametrosDelsistema.nombreParametro} required 
                                />                    
                            </div>

                            <div className="columna1 ali-item-cent paraSis-textArea">
                            <TextField id="descripcionParametro" className="input no-margen-inferior h100" label="Descripción del parámetro " variant="outlined"
                                value={formParametrosDelsistema.descripcionParametro} required
                                onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, descripcionParametro: target.value})}}
                                multiline
                            />                    
                            </div>                            

                            <Seleccionar id={"selectTipoDeDato"} label={"Tipo de dato *"} optInit={"Seleccione"} options={tiposDeDatos}
                            referencia={refTipoDato} valorSeleccionado={formParametrosDelsistema.selectTipoDeDato}    requerido={true} 
                            handleSelect={(value)=>{setFormParametrosDelsistema({...formParametrosDelsistema, selectTipoDeDato: value})}}
                            />        
                            {!!validaciones.selectTipoDeDato && ( <p className="msgError no-margen-superior"> {validaciones.selectTipoDeDato} </p> )}

                            <div className="columna1 ali-item-cent">
                                {
                                    formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[3] &&
                                    
                                        <input type="date" name="fecha" id="fecha" className="input no-margen-inferior" required
                                            value={formParametrosDelsistema.valorParametro}
                                            onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, valorParametro: target.value})}}
                                        />                                     
                                }
                                {
                                     (formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[0] || formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[2] ||
                                        formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[1] ) &&
                                            <TextField id="valorParametro" className="input no-margen-inferior" label="Valor " variant="outlined"
                                                value={formParametrosDelsistema.valorParametro}   required
                                                type={(formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[0] || formParametrosDelsistema.selectTipoDeDato === tiposDeDatos[2]) ? 'number' : 'text'}
                                                onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, valorParametro: target.value})}}
                                            />
                                }
                                 
                            </div>

                            <div className="elem-derecha btnIngresar mt-10">
                                <button className="boton" type="submit"> {accionesFormulario} </button>
                                <button className="boton ml-10" type="reset" onClick={resetCampos}> Nuevo </button>
                            </div>
                        </>
                    
                    }
                    
                </form>
            </div>

            {/* Tabla donde se muestran los parámetros del sistema */}
            <div className="margen-superior contenedor ">
                
                <DataTable columns={columns} rows={parametrosDeslSistema} setRegistroSeleccionado={setRegistroSeleccionado}/>
            </div>

        </div>
    );
};

export default ParametrosDelSistema;

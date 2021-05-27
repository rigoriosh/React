import React, { useEffect, useState } from 'react'
//import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';
import { tiposCrud } from '../../../Tools/dominios';
import { nombreRepetido } from '../../../helpers/helperUtil';
//import { tiposParametrosSis } from '../../../constantes/constantesParametrosDelSistema';
import DataTable from '../../../components/DataTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarDialog, mostrarMensaje } from '../../../Redux-actions/alertasMensajes_action';

const VerEditarTipos = (/* {setMensajes, registroSeleccionado, setRegistroSeleccionado, dialog, setDialog} */) => {
    console.log('VerEditarTipos');
    
    const {EditarValoresTipo} = useParams();
    const dispatch = useDispatch();
    const {alertas_mensajes_reducer} = useSelector(state => state);
    const {respuestaDialog} = alertas_mensajes_reducer;
    const [DB, setDB] = useState([]);// INFO DB
    const [registroSeleccionado, setRegistroSeleccionado] = useState();
    console.log(registroSeleccionado);
    const [accionesFormulario, setAccionesFormulario] = useState(tiposCrud.guardar); // guardar, editar, eliminar
    const [tipos, setTipos] = useState([]);
    console.log(DB)
    const [formulario, setformulario] = useState( { nombreTipo:'', valor:'' } );
    const [agregarRegistro, setAgregarRegistro] = useState(false); // muestra/oculta el formulario
    const [registroTipoSeleccionado, setRegistroTipoSeleccionado] = useState(''); // captura la fila de la tabla seleccionada
    const [eviarDB, setEviarDB] = useState(false);
    const columns = [
        /* { field: "id",   headerName: "id",       width: 200 }, */
        { field: "nombreTipo",  headerName: "Nombre",   width: 200 },
        { field: "valor",       headerName: "Valor",    width: 535 },       
        { field: "actions",     headerName: "Acciones", width: 200,
        renderCell: (params) => (
            <strong>   
                
                <EditIcon onClick={()=>{editarRegistro(params.row)}} className="apuntador"/>                  
                <DeleteForeverIcon onClick={()=>{eliminarRegistro(params.row)}} className="apuntador"/>
              
            </strong>
          ),
        },
    ];
    //const {agree} = dialog;

    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) accionesFormulario === tiposCrud.guardar ? agregarNuevoRegistroAlSistema() : dispatch(mostrarDialog('Nota', 'Esta segur@ de EDITAR este parámetro del sistema'));        
    };
    const checkValidaciones = () => {        

        if(nombreRepetido(registroSeleccionado.tipos, formulario, 'nombreTipo') && accionesFormulario === tiposCrud.guardar){
            dispatch(mostrarMensaje('warning', 'No se puede almacenar el parámetro del sistema porque ya existe'));
            return false;
        }    
                
        return true;
    }
    const agregarNuevoRegistroAlSistema = () => {

        const registroSeleccionadoActualizado = {...registroSeleccionado};
        if (!registroSeleccionado.tipos) {
            
            registroSeleccionadoActualizado.tipos = [{
                id: Date.parse(Date()),
                nombreTipo: formulario.nombreTipo,
                valor: formulario.valor
            }];

        }else{
            registroSeleccionadoActualizado.tipos = [{
                id: Date.parse(Date()),
                nombreTipo: formulario.nombreTipo,
                valor: formulario.valor
            }, ...registroSeleccionadoActualizado.tipos];            
        }
        
        setRegistroSeleccionado(registroSeleccionadoActualizado);

        const DBActualizado = DB.map(vt => {
            return vt.id === registroSeleccionadoActualizado.id ? registroSeleccionadoActualizado : vt ;
        })
        //GUARDA UN NUEVO TIPO
        setEviarDB(true);
        setDB(  DBActualizado );     
        setTipos(registroSeleccionadoActualizado.tipos);
    };
    const resetCampos = () => {
        setformulario({nombreTipo:'', valor:''}); // resetea los campos del formulario                
        setAccionesFormulario(tiposCrud.guardar)
    }
    const editarRegistro = (registroAeditar) => {
        //console.log({registroAeditar});    
        setformulario({...registroAeditar}); //  carga los datos en el formulario para editarlos
        setAccionesFormulario(tiposCrud.editar); // ajusta la vandera de guardar o editar, por editar
        setAgregarRegistro(true);
    }    
    const eliminarRegistro = (parametroAEliminar) => {      
        setAccionesFormulario(tiposCrud.eliminar)        
        dispatch(mostrarDialog('Nota', '¿ Esta segur@ de eliminar el registro del sistema ?'));
    }
    const eliminarRegistroConfirmado = () => { 
        const registrosSistemaActualizados = DB.filter(parametro => parametro !== registroSeleccionado);
        setDB(registrosSistemaActualizados);        
        dispatch(mostrarMensaje('success', 'El registro se eliminó correctamente'));
        resetCampos();
    }
    const editarRegistroConfirmado = () => {
        const registrosActualizados = DB.map(vt => {
            const bb = vt.tipos.map(tipo => {
                return tipo.id === formulario.id ? formulario : tipo
            })
            vt.tipos = bb            
            return vt
        })
        setDB(registrosActualizados);              
    }
    const enviarDB = () => {
        if(agregarRegistro) {
            localStorage.setItem('valoresTipo', JSON.stringify(DB));      
            const txtmsg = accionesFormulario === tiposCrud.guardar ? 'guardó' : 'editó';
            dispatch(mostrarMensaje('success', `El valor tipo se ${txtmsg} correctamente`));
            setAgregarRegistro(false);// switch el formulario para mejorar la vista de la tabla
            resetCampos();
        }
    }

    const leerDB = () => {
        const db = JSON.parse(localStorage.getItem('valoresTipo'))
        if(!!db) setDB(db);
    }
    

    //SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
    useEffect(() => {
        console.log(registroSeleccionado)
        //respuestaDialog(true o false) es la respuesta del modal
        if (respuestaDialog && accionesFormulario === tiposCrud.eliminar) eliminarRegistroConfirmado();

        if (respuestaDialog && accionesFormulario === tiposCrud.editar) editarRegistroConfirmado();

        return () => {}    
    }, [respuestaDialog])   

    // uploadComponent
    useEffect(() => {
        leerDB();
        return () => {}
    }, [])

    useEffect(() => { // captura los cambios en el arreglo de registro para actualiza la db
        enviarDB();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DB])

    useEffect(() => {
        const tipoSeleccionado = DB.find(e => e.id === Number(EditarValoresTipo)); 
        console.log(tipoSeleccionado);
        setRegistroSeleccionado(tipoSeleccionado);
        setTipos(tipoSeleccionado?.tipos ||  [])        
        return () => { }
    }, [DB, EditarValoresTipo])

    return (
        <div className='contenedor'>
            <div className="contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel 
                        control={ <Switch checked={!agregarRegistro} onChange={()=>{setAgregarRegistro(!agregarRegistro)}} name="checkedA" /> }
                            label="Agregar un tipo"
                    />
                        {
                            agregarRegistro && 
                            <>
                                <div className="columna1 ali-item-cent">
                                    <TextField id="nombreTipo"  className="input no-margen-inferior" label="Nombre" variant="outlined"
                                        onChange={({target})=>{setformulario({...formulario, nombreTipo: target.value})}}
                                        value={formulario.nombreTipo} required 
                                    />                    
                                </div>

                                <div className="columna1 ali-item-cent">
                                    <TextField id="valor" className="input no-margen-inferior" label="Valor " variant="outlined"
                                        value={formulario.valor}   required                                        
                                        onChange={({target})=>{setformulario({...formulario, valor: target.value})}}
                                    />                   
                                </div>

                                <div className="columna1 ali-item-cent">
                                    <TextField id="valor" className="input no-margen-inferior" label="Tipo " variant="outlined"
                                        value={registroSeleccionado.nombre} disabled                                                                     
                                    />                   
                                </div>
                                
                                <div className="elem-derecha btnIngresar mt-10">
                                    <button className="boton" type="submit"> {accionesFormulario} </button>
                                    <button className="boton ml-10" type="reset" onClick={resetCampos}> Nuevo </button>
                                </div>
                                </>
                        }
                            
                </form>
            </div>

            {/* Tabla donde se muestran los tipos del sistema */}
            <div className="margen-superior">
                <h4>Resultado de la búsqueda</h4>
                <DataTable columns={columns} rows={tipos} setRegistroSeleccionado={setRegistroTipoSeleccionado}/>
            </div>
        </div>
    )
}

VerEditarTipos.propTypes = {

}

export default VerEditarTipos

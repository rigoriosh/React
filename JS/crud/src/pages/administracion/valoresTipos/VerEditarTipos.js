import React, { useEffect, useState } from 'react'
//import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';
import { tiposCrud } from '../../../constantes/types';
import { nombreRepetido } from '../../../helpers/helperUtil';
import { tiposParametrosSis } from '../../../constantes/constantesParametrosDelSistema';
import DataTable from '../../../components/DataTable';

const VerEditarTipos = ({setMensajes, registroSeleccionado, setRegistroSeleccionado, dialog, setDialog}) => {
    console.log('VerEditarTipos');
    console.log(registroSeleccionado)

    const [accionesFormulario, setAccionesFormulario] = useState(tiposCrud.guardar); // guardar, editar, eliminar
    const [DB, setDB] = useState([]);// INFO DB
    const [tipos, setTipos] = useState(registroSeleccionado?.tipos || []);
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
    const {agree} = dialog;

    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) {          
          if (accionesFormulario === tiposCrud.guardar) {
              agregarNuevoRegistroAlSistema();
              resetCampos();              
          } else {
              setDialog({open: true, title: 'Atención', dialogContentText:'Esta segur@ de EDITAR este registro'});
          }  
            
        }    
        
    };
    const checkValidaciones = () => {        

        if(nombreRepetido(registroSeleccionado.tipos, formulario, 'nombreTipo') && accionesFormulario === tiposCrud.guardar){
            setMensajes({open:true, severity:'warning', mensaje:'No se puede almacenar este nombre de tipo porque ya existe'});
            return false;
        }    
        
        //setValidaciones({nombre:null, descripcion:null, valorParametro:null, selectTipoDeDato:null});
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
        //setValidaciones({nombre:null, descripcion:null, valorParametro:null, selectTipoDeDato:null});
        setDialog({open: false, title: '', dialogContentText:'', agree: false});
        //setMensajes({open:false, severity:'success', mensaje:''});
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
        setDialog({...dialog , open: true, title: 'Nota', dialogContentText:'Esta segur@ de eliminar este parámetro del sistema'});      
    }
    const eliminarRegistroConfirmado = () => { 
        const registrosSistemaActualizados = DB.filter(parametro => parametro !== registroSeleccionado);
        setDB(registrosSistemaActualizados);
        setMensajes({open:true, severity:'success', mensaje:'El registro se eliminó correctamente'});
        resetCampos();
    }
    const editarRegistroConfirmado = () => {
        const registrosActualizados = DB.map(ps => {
            return ps.id === formulario.id ? formulario : ps;
        })
        
        setDB(registrosActualizados);      
        setAccionesFormulario(tiposCrud.guardar); // ajusta la vandera de guardar o editar, por guardar
        setMensajes({open:true, severity:'success', mensaje:'El parámetro se editó correctamente'});
        resetCampos();
    }
    const enviarDB = () => {
        if(eviarDB) {
            localStorage.setItem('valoresTipo', JSON.stringify(DB));      
            setMensajes({open:true, severity:'success', mensaje:'El valor tipo se almacenó correctamente'});
            setEviarDB(false);
        }
    }

    const leerDB = () => {
        const db = JSON.parse(localStorage.getItem('valoresTipo'))
        if(!!db) setDB(db);
    }
    

    //SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
    useEffect(() => {
        console.log(registroSeleccionado)
        //agree(true o false) es la respuesta del modal
        if (agree && accionesFormulario === tiposCrud.eliminar) eliminarRegistroConfirmado();

        if (agree && accionesFormulario === tiposCrud.editar) editarRegistroConfirmado();

        return () => {}    
    }, [agree])   

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

    return (
        <div className='contenedor'>
            <div className="contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel control={ <Switch checked={!agregarRegistro} onChange={()=>{setAgregarRegistro(!agregarRegistro)}} name="checkedA" /> }
                            label={tiposParametrosSis.optsMenuDrawer[5]} 
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

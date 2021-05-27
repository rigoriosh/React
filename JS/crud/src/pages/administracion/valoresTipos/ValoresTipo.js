import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';
//import PropTypes from 'prop-types'


import DataTable from '../../../components/DataTable'
import { nombreRepetido } from '../../../helpers/helperUtil';
import { tiposCrud } from '../../../Tools/dominios';



const ValoresTipo = (/* {setMensajes, dialog, setDialog, setRegistroSeleccionado} */) => {
    console.log("ValoresTipo");
    
    const history = useHistory();
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});
    const [accionesFormulario, setAccionesFormulario] = useState(tiposCrud.guardar); // guardar, editar, eliminar
    const [valoresTipo, setValoresTipo] = useState([]);// ALMACENA LOS PARAMETROS DEL SISTEMA
    const [formulario, setformulario] = useState( { nombre:'', descripcion:'' } );
    const [eviarDB, setEviarDB] = useState(false); // bandera para controlar envios a DB
        
    
    const [agregarRegistro, setAgregarRegistro] = useState(false); // muestra/oculta el formulario
  

    const columns = [
        /* { field: "id",                      headerName: "id",           width: 200 }, */
        { field: "nombre",         headerName: "Nombre",       width: 200 },
        { field: "descripcion",    headerName: "Descripción",  width: 835 },       
        /* { field: "actions",                 headerName: "Acciones",     width: 200,
        renderCell: (params) => (
            <strong>   
                
                <EditIcon onClick={()=>{editarRegistro(params.row)}} className="apuntador"/>                  
                <DeleteForeverIcon onClick={()=>{eliminarRegistro(params.row)}} className="apuntador"/>
              
            </strong>
          ), }, */
      ];

    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) {          
          if (accionesFormulario === tiposCrud.guardar) {
              agregarNuevoRegistroAlSistema();
              resetCampos();              
          } else {
              //setDialog({open: true, title: 'Atención', dialogContentText:'Esta segur@ de EDITAR este registro'});
          }  
            
        }    
        
    };

    const checkValidaciones = () => {
    
        if(nombreRepetido(valoresTipo, formulario, 'nombre') && accionesFormulario === tiposCrud.guardar){
            //setMensajes({open:true, severity:'warning', mensaje:'No se puede almacenar el parámetro del sistema porque ya existe'});
            return false;
        }    
        
        //setValidaciones({nombre:null, descripcion:null, valorParametro:null, selectTipoDeDato:null});
        return true;
    }

    const agregarNuevoRegistroAlSistema = () => {
        setEviarDB(true);
        setValoresTipo( //GUARDA UN NUEVO PARÁMETRO
            [                
                {
                    id: Date.parse(Date()),
                    nombre: formulario.nombre,
                    descripcion: formulario.descripcion
                },
                ...valoresTipo
            ]
        );                 
    }

    const resetCampos = () => {
        setformulario({nombre:'', descripcion:''}); // resetea los campos del formulario
        
        //setDialog({open: false, title: '', dialogContentText:'', agree: false});
        
        setAccionesFormulario(tiposCrud.guardar)
    }

    /* const editarRegistro = (registroAeditar) => {
        //console.log({registroAeditar});    
        setformulario({...registroAeditar}); //  carga los datos en el formulario para editarlos
        setAccionesFormulario(tiposCrud.editar); // ajusta la vandera de guardar o editar, por editar
        setAgregarRegistro(true);
    }
    
    const eliminarRegistro = (parametroAEliminar) => {      
        setAccionesFormulario(tiposCrud.eliminar)
        setDialog({...dialog , open: true, title: 'Nota', dialogContentText:'Esta segur@ de eliminar este parámetro del sistema'});      
    } */

    /* const eliminarRegistroConfirmado = () => { 
        const parametrosDeslSistemaActualizados = valoresTipo.filter(parametro => parametro !== registroSeleccionado);
        setValoresTipo(parametrosDeslSistemaActualizados);
        setMensajes({open:true, severity:'success', mensaje:'El parámetro se eliminó correctamente'});
        resetCampos();
    } */

    /* const editarRegistroConfirmado = () => {
        const registrosActualizados = valoresTipo.map(ps => {
            return ps.id === formulario.id ? formulario : ps;
        })
        
        setValoresTipo(registrosActualizados);      
        setAccionesFormulario(tiposCrud.guardar); // ajusta la vandera de guardar o editar, por guardar
        setMensajes({open:true, severity:'success', mensaje:'El parámetro se editó correctamente'});
        resetCampos();
    } */

    const enviarDB = () => {
        if(eviarDB) {
            localStorage.setItem('valoresTipo', JSON.stringify(valoresTipo));      
            //setMensajes({open:true, severity:'success', mensaje:'El parámetro se almacenó correctamente'});
        }
        setEviarDB(false);
    }

    const leerDB = () => {
        const db = JSON.parse(localStorage.getItem('valoresTipo'))
        if(!!db) setValoresTipo(db);
    }

         

    // uploadComponent
    useEffect(() => {
        leerDB();
        return () => {}
    }, [])

    useEffect(() => { // captura los cambios en el arreglo de registro para actualiza la db
        enviarDB();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valoresTipo]);

    useEffect(() => {
        if(!!registroSeleccionado.id){
            console.log(registroSeleccionado);
            history.push(`/inicio/administracion/ValoresTipo/${registroSeleccionado.id}`);
        }
        return () => { }
    }, [registroSeleccionado])

    

    return (
        <div className='contenedor'>
            {/* Formulario donde se capturan los datos para crear un nuevo parámetro del sistema */}
            <div className="contenedor-min">
                <form onSubmit={handleSubmit} className="w50 card">
                    <FormControlLabel control={ <Switch checked={!agregarRegistro} onChange={()=>{setAgregarRegistro(!agregarRegistro)}} name="checkedA" /> }
                            label="Agregar un tipo" 
                        />
                        {
                            agregarRegistro && 
                            <>
                                <div className="columna1 ali-item-cent">
                                    <TextField id="nombre"  className="input no-margen-inferior" label="Nombre" variant="outlined"
                                        onChange={({target})=>{setformulario({...formulario, nombre: target.value})}}
                                        value={formulario.nombre} required 
                                    />                    
                                </div>

                                <div className="columna1 ali-item-cent paraSis-textArea">
                                    <TextField id="descripcion" className="input no-margen-inferior h100" label="Descripción " variant="outlined"
                                        value={formulario.descripcion} required
                                        onChange={({target})=>{setformulario({...formulario, descripcion: target.value})}}
                                        multiline
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
                <DataTable columns={columns} rows={valoresTipo} setRegistroSeleccionado={setRegistroSeleccionado}/>
            </div>
        
        </div>
    )
}
/* 
ValoresTipo.propTypes = {
    setMensajes: PropTypes.func.isRequired,
    dialog: PropTypes.object.isRequired,
    setDialog: PropTypes.func.isRequired
} */

export default ValoresTipo

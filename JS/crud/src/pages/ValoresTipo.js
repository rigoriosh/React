import React, { useEffect, useState } from 'react'
//import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from "@material-ui/core/TextField";
import DataTable from '../components/DataTable'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { nombreRepetido } from '../helpers/helperUtil';
import { tiposComunes } from '../constantes/generales';



const ValoresTipo = ({setMensajes, dialog, setDialog}) => {
    console.log("ValoresTipo");

    const {agree} = dialog;
    const [accionesFormulario, setAccionesFormulario] = useState(tiposComunes.guardar); // guardar, editar, eliminar
    const [valoresTipo, setValoresTipo] = useState([]);// ALMACENA LOS PARAMETROS DEL SISTEMA
    const [formulario, setformulario] = useState( { nombre:'', descripcion:'' } );
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});
    const [noEnviarDataDB, setNoEnviarDataDB] = useState(0);// para evitar que al despliegue inicial del componente envie datos a la DB
    const [agregarRegistro, setAgregarRegistro] = useState(false); 
  

    const columns = [
        /* { field: "id",                      headerName: "id",           width: 200 }, */
        { field: "nombre",         headerName: "Nombre",       width: 200 },
        { field: "descripcion",    headerName: "Descripción",  width: 200 },       
        { field: "actions",                 headerName: "Acciones",     width: 200,
        renderCell: (params) => (
            <strong>   
                
                <EditIcon onClick={()=>{editarRegistro(params.row)}} className="apuntador"/>                  
                <DeleteForeverIcon onClick={()=>{eliminarRegistro(params.row)}} className="apuntador"/>
              
            </strong>
          ), },
      ];


    const handleSubmit = (e) => {
        e.preventDefault();    
        if (checkValidaciones()) {          
          if (accionesFormulario === tiposComunes.guardar) {
              agregarNuevoRegistroAlSistema();
              resetCampos();              
          } else {
              setDialog({open: true, title: 'Atención', dialogContentText:'Esta segur@ de EDITAR este registro'});
          }  
            
        }    
        
    };

    const checkValidaciones = () => {
    
        if(nombreRepetido(valoresTipo, formulario, 'nombre') && accionesFormulario === tiposComunes.guardar){
            setMensajes({open:true, severity:'warning', mensaje:'No se puede almacenar el parámetro del sistema porque ya existe'});
            return false;
        }    
        
        //setValidaciones({nombre:null, descripcion:null, valorParametro:null, selectTipoDeDato:null});
        return true;
    }

    const agregarNuevoRegistroAlSistema = () => {
        setValoresTipo( //GUARDA UN NUEVO PARÁMETRO
            [
                ...valoresTipo,
                {
                    id: Date.parse(Date()),
                    nombre: formulario.nombre,
                    descripcion: formulario.descripcion
                    }
                ]
            );     
    }

    const resetCampos = () => {
        setformulario({nombre:'', descripcion:''}); // resetea los campos del formulario
        //setValidaciones({nombre:null, descripcion:null, valorParametro:null, selectTipoDeDato:null});
        setDialog({open: false, title: '', dialogContentText:'', agree: false});
        //setMensajes({open:false, severity:'success', mensaje:''});
        setAccionesFormulario(tiposComunes.guardar)
    }

    const editarRegistro = (registroAeditar) => {
        //console.log({registroAeditar});    
        setformulario({...registroAeditar}); //  carga los datos en el formulario para editarlos
        setAccionesFormulario(tiposComunes.editar); // ajusta la vandera de guardar o editar, por editar
    }
    
    const eliminarRegistro = (parametroAEliminar) => {      
        setAccionesFormulario(tiposComunes.eliminar)
        setDialog({...dialog , open: true, title: 'Nota', dialogContentText:'Esta segur@ de eliminar este parámetro del sistema'});      
    }

    const eliminarRegistroConfirmado = () => { 
        const parametrosDeslSistemaActualizados = valoresTipo.filter(parametro => parametro !== registroSeleccionado);
        setValoresTipo(parametrosDeslSistemaActualizados);
        setMensajes({open:true, severity:'success', mensaje:'El parámetro se eliminó correctamente'});
        resetCampos();
    }

    const editarRegistroConfirmado = () => {
        const registrosActualizados = valoresTipo.map(ps => {
            return ps.id === formulario.id ? formulario : ps;
        })
        
        setValoresTipo(registrosActualizados);      
        setAccionesFormulario(tiposComunes.guardar); // ajusta la vandera de guardar o editar, por guardar
        setMensajes({open:true, severity:'success', mensaje:'El parámetro se editó correctamente'});
        resetCampos();
    }

    useEffect(() => {//SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR O EDITAR EL PARÁMETRO DEL SISTEMA
        console.log(registroSeleccionado)
        // agree(true o false) es la respuesta del modal
        if (agree && accionesFormulario === tiposComunes.eliminar) eliminarRegistroConfirmado();

        if (agree && accionesFormulario === tiposComunes.editar) editarRegistroConfirmado();


        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agree])    

    const enviarDB = () => {
        if(noEnviarDataDB < 2) {
            setNoEnviarDataDB(a => a + 1)
        }else{
            localStorage.setItem('valoresTipo', JSON.stringify(valoresTipo));      
            setMensajes({open:true, severity:'success', mensaje:'El parámetro se almacenó correctamente'});
        }
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

    console.log({valoresTipo})
    useEffect(() => {
        enviarDB();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valoresTipo])

    return (
        <div>
            {/* Formulario donde se capturan los datos para crear un nuevo parámetro del sistema */}
            <div className="contenedor contenedor-min">
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

            {/* Tabla donde se muestran los parámetros del sistema */}
            <div className="margen-superior contenedor">
            <h4>Resultado de la búsqueda</h4>
            <DataTable columns={columns} rows={valoresTipo} setRegistroSeleccionado={setRegistroSeleccionado}/>
        </div>
        
        </div>
    )
}

ValoresTipo.propTypes = {

}

export default ValoresTipo

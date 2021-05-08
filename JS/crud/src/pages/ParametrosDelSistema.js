import React, { memo, useEffect, useRef, useState } from "react";
//import PropTypes from 'prop-types'
import TextField from "@material-ui/core/TextField";
//import { useForm } from "react-hook-form";
import Seleccionar from "../components/Select";
import DataTable from '../components/DataTable'
import SnackbarComponent from "../components/Snackbar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogComponent from "../components/DialogComponent";
import { tiposParametrosSis } from "../constantes/constantesParametrosDelSistema";


const ParametrosDelSistema = memo((props) => {
  console.log("ParametrosDelSistema");
  const refTipoDato = useRef();
  //const [selectTipoDeDato, setselectTipoDeDato] = useState("");
  //const [errorSelect, setErrorSelect] = useState(null);

  const [mensajes, setMensajes] = useState({open:false, severity:'success', mensaje:''});
  const [dialog, setDialog] = useState({open: false, title: '', dialogContentText:'', agree: false, parametroAeliminar:{}});
  const {agree} = dialog;
  const [registroSeleccionado, setRegistroSeleccionado] = useState({});
  const columns = [
    { field: "id",                      headerName: "Nombre",       width: 200 },
    { field: "descripcionParametro",    headerName: "Descripción",  width: 200 },
    { field: "valorParametro",          headerName: "Valor",        width: 180 },
    { field: "selectTipoDeDato",  headerName: "Tipo de Dato", width: 200 },    
    { field: "actions",                 headerName: "Acciones",      width: 200,
    renderCell: (params) => (
        <strong>   
            
            <EditIcon onClick={()=>{editarParametro(params.row)}} className="apuntador"/>                  
            <DeleteForeverIcon onClick={()=>{eliminarParametro(params.row)}} className="apuntador"/>
          
        </strong>
      ), },
  ];

  const tiposDeDatos = ["Entero", "Texto"];

  //const { register, handleSubmit, formState, reset } = useForm();
  const [formParametrosDelsistema, setFormParametrosDelsistema] = useState(
      {
          nombreParametro:'',
          descripcionParametro:'',
          valorParametro:'',
          selectTipoDeDato:''
        }
    );
  const [validaciones, setValidaciones] = useState({ValnombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null}); 
  const [accionesFormulario, setAccionesFormulario] = useState(tiposParametrosSis.guardar) ;

  const [parametrosDeslSistema, setParametrosDeslSistema] = useState([]);// ALMACENA LOS PARAMETROS DEL SISTEMA
  console.log(parametrosDeslSistema);

  const handleSubmit = (e) => {
      e.preventDefault();    
      if (checkValidaciones()) {
          console.log(formParametrosDelsistema);
                    
          setParametrosDeslSistema( //GUARDA UN NUEVO PARÁMETRO
              [
                  ...parametrosDeslSistema,
                  {
                      id: formParametrosDelsistema.nombreParametro,
                      descripcionParametro: formParametrosDelsistema.descripcionParametro,
                      valorParametro: formParametrosDelsistema.valorParametro,
                      selectTipoDeDato: formParametrosDelsistema.selectTipoDeDato
                    }
                ]
            );
          setMensajes({open:true, severity:'success', mensaje:'El parámetro se almacenó correctamente'});
      }    
      
  };

  const checkValidaciones = () => {
    
    const repetido = parametrosDeslSistema.find(e => e.id === formParametrosDelsistema.nombreParametro)    
    if(repetido){
        setMensajes({open:true, severity:'warning', mensaje:'No se puede almacenar el prámetro del sistema porque ya existe'});
        return false;
    }

    if ( (isNaN(formParametrosDelsistema.valorParametro * 1) && formParametrosDelsistema.selectTipoDeDato === 'Entero') ||
       ( !isNaN(formParametrosDelsistema.valorParametro * 1) && formParametrosDelsistema.selectTipoDeDato === 'Texto'))  {
            setValidaciones({...validaciones, selectTipoDeDato:'El campo valor no coincide con el tipo de dato seleccionado'});
            return false;
    }
    
    setValidaciones({nombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null});
    return true;
  }


  const resetCampos = () => {
      setFormParametrosDelsistema({nombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null}); // resetea los campos del formulario
      setValidaciones({nombreParametro:null, descripcionParametro:null, valorParametro:null, selectTipoDeDato:null});
      setDialog({open: false, title: '', dialogContentText:'', agree: false, parametroAeliminar:{}});
      setMensajes({open:false, severity:'success', mensaje:''});
      setAccionesFormulario(tiposParametrosSis.guardar)
  }

  const editarParametro = (parametroAeditar) => {
      console.log({parametroAeditar});
      setFormParametrosDelsistema({...parametroAeditar, nombreParametro: parametroAeditar.id})
      setAccionesFormulario(tiposParametrosSis.editar);
  }

  const eliminarParametro = (parametroAeliminar) => {
      console.log({parametroAeliminar});
      setDialog({...dialog , open: true, title: 'Nota', dialogContentText:'Esta segur@ de eliminar este parámetro del sistema'});
      console.log(dialog)
    }

    useEffect(() => {//SE ENCARGA DE TOMAR LA CONFIRMACIÓN DEL USUARIO Y ELIMINAR EL PARÁMETRO DEL SISTEMA
        console.log(registroSeleccionado)
        if (agree) {
            const parametrosDeslSistemaActualizados = parametrosDeslSistema.filter(parametro => parametro !== registroSeleccionado);
            setParametrosDeslSistema(parametrosDeslSistemaActualizados);
            setMensajes({open:true, severity:'success', mensaje:'El parámetro se eliminó correctamente'});
            resetCampos();
        }
        return () => {}
    }, [agree])

 
  
  return (
    <div>
        <h3 className="no-margen-inferior">
            Administración de parámetros del sistema
        </h3>

            {/* Formulario donde se capturan los datos para crear un nuevo parámetro del sistema */}
        <div className="contenedor contenedor-min">
            <form onSubmit={handleSubmit} className="w50 card">
                <div className="columna1 ali-item-cent">
                    <TextField id="nombreParametro"  className="input no-margen-inferior" label="Nombre del parámetro" variant="outlined"
                        onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, nombreParametro: target.value})}}
                        value={formParametrosDelsistema.nombreParametro} required
                    />
                    {/* {!formParametrosDelsistema.nombreParametro && ( <p className="msgError no-margen-superior"> {validaciones.ValnombreParametro} </p> )} */}
                </div>
                <div className="columna1 ali-item-cent">
                    <TextField id="descripcionParametro" className="input no-margen-inferior" label="Descripción del parámetro " variant="outlined"
                        value={formParametrosDelsistema.descripcionParametro} required
                        onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, descripcionParametro: target.value})}}
                    />
                    {/* {validaciones.descripcionParametro && (<p className="msgError no-margen-superior">{validaciones.descripcionParametro}</p>)} */}
                </div>
                <div className="columna1 ali-item-cent">
                    <TextField id="valorParametro" className="input no-margen-inferior" label="Valor " variant="outlined"
                        value={formParametrosDelsistema.valorParametro}   required                     
                        onChange={({target})=>{setFormParametrosDelsistema({...formParametrosDelsistema, valorParametro: target.value})}}
                    />
                        {/* {validaciones.valorParametro && ( <p className="msgError no-margen-superior"> {validaciones.valorParametro} </p> )} */}
                </div>
                <Seleccionar id={"selectTipoDeDato"} label={"Tipo de dato *"} optInit={"Seleccione"} options={tiposDeDatos}
                    referencia={refTipoDato} valorSeleccionado={formParametrosDelsistema.selectTipoDeDato}    requerido={true} 
                    handleSelect={(value)=>{setFormParametrosDelsistema({...formParametrosDelsistema, selectTipoDeDato: value})}}
                    />        
                {!!validaciones.selectTipoDeDato && ( <p className="msgError no-margen-superior"> {validaciones.selectTipoDeDato} </p> )}

                <div className="elem-derecha btnIngresar mt-10">
                    <button className="boton" type="submit"> Guardar </button>
                    <button className="boton ml-10" type="reset" onClick={resetCampos}> Nuevo </button>
                </div>
            </form>
        </div>

        {/* Tabla donde se muestran los parámetros del sistema */}
        <div className="margen-superior contenedor">
            <h4>Resultado de la búsqueda</h4>
            <DataTable columns={columns} rows={parametrosDeslSistema} setRegistroSeleccionado={setRegistroSeleccionado}/>
        </div>


        <SnackbarComponent mensajes={mensajes} setMensajes={setMensajes}/>
        <DialogComponent dialog={dialog} setDialog={setDialog}/>
    </div>
  );
});

ParametrosDelSistema.propTypes = {};

export default ParametrosDelSistema;

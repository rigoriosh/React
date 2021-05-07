import React, { memo, useRef, useState } from "react";
//import PropTypes from 'prop-types'
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Seleccionar from "../components/Select";
import DataTable from '../components/DataTable'
import SnackbarComponent from "../components/Snackbar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const ParametrosDelSistema = memo((props) => {
  console.log("ParametrosDelSistema");
  const refTipoDato = useRef();
  const [tipoDeDatoSeleccionado, setTipoDeDatoSeleccionado] = useState("");
  const [errorSelect, setErrorSelect] = useState(null);
  const [mensajes, setMensajes] = useState({open:false, severity:'success', mensaje:''});
  const [registroSeleccionado, setRegistroSeleccionado] = useState({});
  console.log({registroSeleccionado})

  const tiposDeDatos = ["Entero", "Texto"];

  const { register, handleSubmit, formState, reset } = useForm();

  const [parametrosDeslSistema, setParametrosDeslSistema] = useState([]);
  console.log(parametrosDeslSistema);

  const onSubmit = ({ nombreParametro, descripcionParametro, valorParametro}) => {
    
      if (validacionTipoDato(valorParametro) && validacionNombreParametroRepetido(nombreParametro)) {
          console.log(nombreParametro, descripcionParametro, valorParametro, tipoDeDatoSeleccionado);
          setErrorSelect(null)
          //TODO: guardar los parámetros
          setParametrosDeslSistema(
              [
                  ...parametrosDeslSistema,
                  {
                      id: nombreParametro,
                      descripcionParametro,
                      valorParametro,
                      tipoDeDatoSeleccionado
                    }
                ]
            );
          setMensajes({open:true, severity:'success', mensaje:'El nombre parámetro ha sido guardado'});
      }    
      
  };

  const validacionNombreParametroRepetido = (nombreParametro) => {
    const repetido = parametrosDeslSistema.find(e => e.id === nombreParametro)    
    if(repetido){
        setMensajes({open:true, severity:'warning', mensaje:'El nombre del parámetro ya existe'});
        return false;
    } 
    return true;
  }

  const validacionTipoDato = (valorParametro) => {

    if (tipoDeDatoSeleccionado === ''){
        setErrorSelect('El tipo de dato es requerido');        
        return false;    
    } 
    if (isNaN(valorParametro * 1) && tipoDeDatoSeleccionado === 'Texto') return true;
    if (!isNaN(valorParametro * 1) && tipoDeDatoSeleccionado === 'Entero') return true;
    setErrorSelect('El campo valor no coincide con el tipo de dato seleccionado');
  }

  const resetCampos = () => {      
      reset();
      setTipoDeDatoSeleccionado('');
  }
  const columns = [
    { field: "id",                      headerName: "Nombre",       width: 200 },
    { field: "descripcionParametro",    headerName: "Descripción",  width: 200 },
    { field: "valorParametro",          headerName: "Valor",        width: 180 },
    { field: "tipoDeDatoSeleccionado",  headerName: "Tipo de Dato", width: 200 },    
    { field: "actions",                 headerName: "Acciones",      width: 200,
    renderCell: (params) => (
        <strong>   
            
            <EditIcon onClick={()=>{editarParametro(params.row)}}/>                  
            <DeleteForeverIcon onClick={()=>{eliminarParametro(params.row)}}/>
          
        </strong>
      ), },
  ];

  const editarParametro = (parametroAeditar) => {
      console.log({parametroAeditar});
  }

  const eliminarParametro = (parametroAeditar) => {
    console.log({parametroAeditar});
    }

  
  
  return (
    <div>
        <h3 className="no-margen-inferior">
            Administración de parámetros del sistema
        </h3>

            {/* Formulario donde se capturan los datos para crear un nuevo parámetro del sistema */}
        <div className="contenedor contenedor-min">
            <form onSubmit={handleSubmit(onSubmit)} className="w50 card">
            <div className="columna1 ali-item-cent">
                <TextField id="nombreParametro" className="input no-margen-inferior" label="Nombre del parámetro(*)" variant="outlined"
                {...register("nombreParametro", { required: true })}
                />
                {formState.errors.nombreParametro && ( <p className="msgError no-margen-superior"> El nombre del parámetro es requerido. </p> )}
            </div>
            <div className="columna1 ali-item-cent">
                <TextField id="descripcionParametro" className="input no-margen-inferior" label="Descripción del parámetro (*)" variant="outlined"
                {...register("descripcionParametro", { required: true })}
                />
                {formState.errors.descripcionParametro && (
                <p className="msgError no-margen-superior">
                    La descripción del parámetro es requerido.
                </p>
                )}
            </div>
            <div className="columna1 ali-item-cent">
                <TextField id="valorParametro" className="input no-margen-inferior" label="Valor (*)" variant="outlined"
                {...register("valorParametro", { required: true })} />
                {formState.errors.valorParametro && ( <p className="msgError no-margen-superior"> El valor del parámetro es requerido. </p> )}
            </div>
            <Seleccionar id={"selectTipoDeDato"} label={"Tipo de dato (*)"} optInit={"Seleccione"} options={tiposDeDatos}
                referencia={refTipoDato} handleSelect={setTipoDeDatoSeleccionado} valorSeleccionado={tipoDeDatoSeleccionado}            
            />          
            {!!errorSelect && ( <p className="msgError no-margen-superior"> {errorSelect} </p> )}

            <div className="elem-derecha btnIngresar mt-10">
                <button className="boton" type="submit"> Guardar </button>
                <button className="boton ml-10" onClick={resetCampos}> Nuevo </button>
            </div>
            </form>
        </div>

        {/* Tabla donde se muestran los parámetros del sistema */}
        <div className="margen-superior">
            <h4>Resultado de la búsqueda</h4>
            <DataTable columns={columns} rows={parametrosDeslSistema} setRegistroSeleccionado={setRegistroSeleccionado}/>
        </div>


        <SnackbarComponent mensajes={mensajes} setMensajes={setMensajes}/>
        
    </div>
  );
});

ParametrosDelSistema.propTypes = {};

export default ParametrosDelSistema;

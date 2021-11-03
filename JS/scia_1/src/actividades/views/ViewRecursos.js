import React, { useState } from 'react'
import { FcPlus, FcEditImage, FcDeleteDatabase } from "react-icons/fc";
import { BsSearch, /* BsXSquare, */  } from "react-icons/bs";
import { IconContext } from "react-icons";

//import AlarmIcon from '@material-ui/icons/Alarm';

//import { ModalCalendar } from '../componentes/ModalCalendar';
import { DataTable2 } from '../componentes/DataTable2';
//import { DataTable_1 } from '../componentes/DataTable_1';
import { ModalForm1 } from '../componentes/ModalForm1';


const columns = [
    /* { field: 'id', headerName: 'ID', width: 90 }, */
    {
      field: 'recurso',
      headerName: 'Recurso',
      width: 150,
      editable: false,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 120,
      editable: false,
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      //type: 'number',
      width: 130,
      editable: false,
    },
    /* {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    }, */
  ];


export const ViewRecursos = ({updateStateActividades}) => {

    
    const [openModalForm, setOpenModalForm] = useState(false);

    const [filas, setFilas] = useState(
        [
          { id: 1, recurso: 'Ayudante Civil', fecha: '15-7-21',      cantidad: 1 },
          { id: 2, recurso: 'Cadenero',       fecha: '15-7-21',   cantidad: 10 },
          { id: 3, recurso: 'Grua 30T',        fecha: '15-7-21',   cantidad: 500 },
          
        ]
        );

    const registroTareaActividadSeleccionado  = (fila) => {
        console.log('registroTareaActividadSeleccionado => ', fila);
    }
    
    const handleinputsChange = (target) => {
        console.log(target.name, target.value);
    }

    const agregar = () => {
        console.log('agregar');
        setOpenModalForm(true)
    }
    const editar = () => {
        console.log('editar');
    }
    const eliminar = () => {
        console.log('eliminar');
    }
    
    return (
        <div>
            <p style={{marginBottom:'20px'}}>{'Descripción de la actividad'}</p>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><BsSearch/></span>
                    <input onChange={({target})=>handleinputsChange(target)} name="search" type="text" class="form-control" aria-label="Buscar" 
                        aria-describedby="basic-addon1"/>
                </div>
            <div>
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                    <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <FcPlus onClick={()=>agregar()} name="Agregar" className="cursor" title='Agregar' style={estilos.estiloIcono}/>
                        <FcEditImage onClick={()=>editar()} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                        <FcDeleteDatabase onClick={()=>eliminar()} className="cursor" title='Eliminar' style={estilos.estiloIcono}/>
                    </div>
                    {/* <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                        <BsXSquare onClick={()=>cancelar()} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
                    </div> */}
                </IconContext.Provider>
            </div>
            <div style={{overflow: 'scroll'}}>
                <DataTable2 columnas={columns} filas={filas} filaSeleccionada={registroTareaActividadSeleccionado}/>
                {/* <DataTable_1/> */}
            </div>
            <ModalForm1 openModal={openModalForm} setOpenModal={setOpenModalForm}/>
            
        </div>
    )
}


const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
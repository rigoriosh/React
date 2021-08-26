import React, { useState } from 'react'
import { BsSearch, /* BsXSquare, */   } from "react-icons/bs";
import { FcCalendar, FcPlus, FcEditImage, FcDeleteDatabase } from "react-icons/fc";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

//import AlarmIcon from '@material-ui/icons/Alarm';

//import { ModalCalendar } from '../componentes/ModalCalendar';
import { DataTable2 } from '../componentes/DataTable2';
import { ModalFormTareasActividad } from '../componentes/ModalFormTareasActividad';
//import { DataTable_1 } from '../componentes/DataTable_1';

const columns = [
    /* { field: 'id', headerName: 'ID', width: 90 }, */
    {
      field: 'tarea',
      headerName: 'Tarea',
      width: 200,
      editable: false,
    },
    {
      field: 'unidad',
      headerName: 'Unidad',
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

const initRegister = {
    cantidad:0,
    id:'',
    tarea:'',
    unidad:''
}
export const TareasDeActividad = ({updateStateActividades}) => {

    const [filas, setFilas] = useState(
        [
          { id: 1, tarea: 'Puesto en sitio materiales', unidad: 'Kilogramo',      cantidad: 1 },
          { id: 2, tarea: 'Alineación Soportes',       unidad: 'UND',   cantidad: 10 },
          { id: 3, tarea: 'Torqueo',        unidad: 'UND',   cantidad: 500 },
          
        ]
        );
    const [registroTreaActSeleccionado, setRegistroTreaActSeleccionado] = useState(initRegister);
    const [openModal, setOpenModal] = useState(false);
    const handleinputsChange = (target) => {
        console.log(target.name, target.value);
    }

    const btnOprimido = (btnOprimido) => {
        console.log('btnOprimido => ', btnOprimido)
        if (btnOprimido === 'agregar') {
            setOpenModal(true)
        } else {
            
        }

        if (btnOprimido === 'calendar') {
            updateStateActividades('step', 1.1);
        }

        if (btnOprimido !== 'calendar') {
            setRegistroTreaActSeleccionado(initRegister)
        }
    }

    const registroTareaActividadSeleccionado  = (fila) => {
        console.log('registroTareaActividadSeleccionado => ', fila);
        setRegistroTreaActSeleccionado(fila)
    }

    const cerrarModal = () => {
        setOpenModal(false);
        setRegistroTreaActSeleccionado(initRegister);
    }

    console.log(registroTreaActSeleccionado)
    console.log(initRegister)
    return (
        <div style={{marginTop:'10px'}}>
            <p style={{marginBottom:'20px'}}>{'Cuarto de Máquinas / Montaje estructura'}</p>
            <div >
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><BsSearch/></span>
                    <input onChange={({target})=>handleinputsChange(target)} name="search" type="text" class="form-control" 
                    aria-label="Buscar" aria-describedby="basic-addon1"/>
                </div>
                
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                    <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <FcPlus onClick={()=>btnOprimido('agregar')} name="Agregar" className="cursor" title='Agregar' style={estilos.estiloIcono}/>
                        <FcEditImage onClick={()=>btnOprimido('editar')} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                        <FcDeleteDatabase onClick={()=>btnOprimido('eliminar')} className="cursor" title='Eliminar' style={estilos.estiloIcono}/>
                        {(registroTreaActSeleccionado.id !== initRegister.id)
                        ? <FcCalendar onClick={()=>btnOprimido('calendar')} className="cursor" title='Calendario' style={estilos.estiloIcono}/>
                        : <FaRegCalendarAlt className="cursor" title='Calendario' style={estilos.estiloIcono}/>}
                    </div>
                    
                </IconContext.Provider>
            </div>
            <div style={{overflow: 'scroll'}}>
                <DataTable2 columnas={columns} filas={filas} filaSeleccionada={registroTareaActividadSeleccionado}/>
                {/* <DataTable_1/> */}
            </div>
            <ModalFormTareasActividad openModal={openModal} cerrarModal={cerrarModal} registroSeleccionado={registroTreaActSeleccionado}/>
        </div>
    )
}


const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
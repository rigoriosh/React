import React, { useState } from 'react'
import { BsSearch, BsXSquare, BsPlusSquare, BsPencilSquare } from "react-icons/bs";
import { FaEraser, FaSave } from "react-icons/fa";
import { IconContext } from "react-icons";

//import AlarmIcon from '@material-ui/icons/Alarm';

//import { ModalCalendar } from '../componentes/ModalCalendar';
import { DataTable_2 } from '../componentes/DataTable_2';
//import { DataTable_1 } from '../componentes/DataTable_1';
import { ModalForm_1 } from '../componentes/ModalForm_1';



export const ViewRecursos = ({updateStateActividades}) => {

    
    const [openModalForm, setOpenModalForm] = useState(false);

    

    

    
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
            <div style={estilos.fila}>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><BsSearch/></span>
                    <input onChange={({target})=>handleinputsChange(target)} name="search" type="text" class="form-control" aria-label="Buscar" 
                        aria-describedby="basic-addon1"/>
                </div>
                
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                    <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <BsPlusSquare onClick={()=>agregar()} name="Agregar" className="cursor" title='Agregar' style={estilos.estiloIcono}/>
                        <BsPencilSquare onClick={()=>editar()} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                        <FaEraser onClick={()=>eliminar()} className="cursor" title='Eliminar' style={estilos.estiloIcono}/>
                    </div>
                    {/* <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                        <BsXSquare onClick={()=>cancelar()} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
                    </div> */}
                </IconContext.Provider>
            </div>
            <div style={{overflow: 'scroll'}}>
                <DataTable_2/>
                {/* <DataTable_1/> */}
            </div>
            <ModalForm_1 openModal={openModalForm} setOpenModal={setOpenModalForm}/>
            
        </div>
    )
}


const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
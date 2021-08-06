import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
//import Button from 'react-bootstrap/Button'
import { IconContext } from "react-icons";
import { BsXSquare } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import '../actividades.css';

export const ModalFormTareasActividad = ({openModal, cerrarModal, registroSeleccionado }) => {

    const [form, setForm] = useState(registroSeleccionado);
    //const {cantidad, tarea, unidad } = registroSeleccionado;

    const [tarea, setTarea] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [unidad, setUnidad] = useState('');


    const guardar = () => {
        console.log('guardar => ', form);
        console.log(tarea, unidad, cantidad)
    }

    useEffect(() => {
        setTarea(registroSeleccionado.tarea);
        setCantidad(registroSeleccionado.cantidad);
        setUnidad(registroSeleccionado.unidad)
        return () => {}
    }, [registroSeleccionado])

    
    return (
        <Modal show={openModal} onHide={cerrarModal} centered>
            
            <Modal.Body>
                <div className="input-group mb-3">
                    <div style={{width:'113%'}}><p style={{fontWeight:'bold'}}>Tarea</p></div>
                    <textarea onChange={({target})=>setTarea(target.value)} name="tarea" value={tarea} className="form-control" aria-label="With textarea" 
                    placeholder="Descripción de la tarea a ejecutar el capataz y/o el supervisor" style={{height: "100px"}}></textarea>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Unidad de medida</p>
                    <div>
                        <select onChange={({target})=>setUnidad(target.value)} name="unidad" value={unidad}  className="form-select form-select-sm mb-3" aria-label=".form-select-sm ">
                            <option value="">Seleccione ....</option>
                            <option value="Kilogramo">Kilogramo</option>
                            <option value="Metro lineal">Metro lineal</option>
                            <option value="Metro cuadrado">Metro cuadrado</option>
                        </select>
                    </div>
                </div>     
                <div style={estilos.fila} className="input-group mb-3">
                    <div style={{width:'113%'}}><p style={{fontWeight:'bold'}}>Cantidad</p></div>
                    <div className="input-group mb-3">
                        <input onChange={({target})=>setCantidad(target.value)} name="cantidad" value={cantidad} type="number" className="form-control" 
                            placeholder="Ingresa la cantidad" aria-label="amount" aria-describedby="basic-addon1"/>
                    </div>
                </div>          
            </Modal.Body>
            <Modal.Footer>
                <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                        <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                        <BsXSquare onClick={cerrarModal} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
                    </IconContext.Provider>
                </div>
                {/* <Button variant="secondary" onClick={()=>setOpenModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={()=>setOpenModal(false)}>
                    Cuardar
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
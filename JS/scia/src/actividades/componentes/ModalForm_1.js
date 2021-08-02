import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { IconContext } from "react-icons";
import { BsXSquare } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import '../actividades.css';

export const ModalForm_1 = ({openModal, setOpenModal }) => {

    const handleForm = (target) => {
        console.log(target.name, target.value);
    }

    const guardar = () => {
        console.log('guardar');
    }
    
    return (
        <Modal show={openModal} onHide={()=>setOpenModal(false)} centered>
            
            <Modal.Body>
                <div className="input-group mb-3">
                    <div style={{width:'113%'}}><p>Recurso</p></div>
                    <input onChange={({target})=>handleForm(target)} name="recurso" type="text" className="form-control" 
                            placeholder="Recurso" aria-label="recurso" aria-describedby="recurso"/>
                </div>
                <div className="input-group mb-3" style={estilos.fila}>
                    <div style={{width:'113%'}}><p>Fecha</p></div>
                    <input onChange={({target})=>handleForm(target)} name="fecha" type="datetime-local" className="form-control" 
                        aria-label="fecha" aria-describedby="fecha"/>
                </div>      
                <div style={estilos.fila} className="input-group mb-3">
                    <div style={{width:'113%'}}><p>Cantidad</p></div>
                    <div className="input-group mb-3">
                        <input onChange={({target})=>handleForm(target)} name="cantidad" type="number" className="form-control" 
                            placeholder="Ingresa la cantidad" aria-label="amount" aria-describedby="basic-addon1"/>
                    </div>
                </div>          
            </Modal.Body>
            <Modal.Footer>
                <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                        <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                        <BsXSquare onClick={()=>setOpenModal(false)} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
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
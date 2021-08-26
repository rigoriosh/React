import React from 'react'
import Modal from 'react-bootstrap/Modal'
//import Button from 'react-bootstrap/Button'
import { IconContext } from "react-icons";
import { FcApproval, FcCancel } from "react-icons/fc";
import '../actividades.css';

export const ModalForm1 = ({openModal, setOpenModal }) => {

    const handleForm = (target) => {
        console.log(target.name, target.value);
    }

    const guardar = () => {
        console.log('guardar');
    }
    
    return (
        <Modal show={openModal} onHide={()=>setOpenModal(false)} centered>
            <Modal.Header>
                <div style={{textAlign:'center', width:'100%', fontWeight:'bold'}}>
                    <p >{'Nuevo Recurso'}</p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <div style={{width:'113%', fontWeight:'bold'}}><p>Recurso</p></div>
                    <input onChange={({target})=>handleForm(target)} name="recurso" type="text" className="form-control" 
                            placeholder="Recurso" aria-label="recurso" aria-describedby="recurso"/>
                </div>
                <div className="input-group mb-3" style={estilos.fila}>
                    <div style={{width:'113%', fontWeight:'bold'}}><p>Fecha</p></div>
                    <input onChange={({target})=>handleForm(target)} name="fecha" type="datetime-local" className="form-control" 
                        aria-label="fecha" aria-describedby="fecha"/>
                </div>      
                <div style={estilos.fila} className="input-group mb-3">
                    <div style={{width:'113%', fontWeight:'bold'}}><p>Cantidad</p></div>
                    <div className="input-group mb-3">
                        <input onChange={({target})=>handleForm(target)} name="cantidad" type="number" className="form-control" 
                            placeholder="Ingresa la cantidad" aria-label="amount" aria-describedby="basic-addon1"/>
                    </div>
                </div>          
            </Modal.Body>
            <Modal.Footer>
                <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                        <div style={{textAlign:'center', marginRight:'20px'}}>
                            <FcApproval onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                            <p style={{fontSize:'x-small'}}>Guardar</p>
                        </div>
                        <div style={{textAlign:'center'}}>
                            <FcCancel onClick={()=>setOpenModal(false)} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
                            <p style={{fontSize:'x-small'}}>Cancelar</p>
                        </div>
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
    estiloIcono: {marginLeft:'0px', marginRight:'0px'}
}
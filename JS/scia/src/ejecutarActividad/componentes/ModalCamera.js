import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { IconContext } from "react-icons";
import { BsXSquare } from "react-icons/bs";
import { /* FcSupport, */ FcOldTimeCamera/* , FcSearch,FcFullTrash, FcInspection */ } from "react-icons/fc";
import { /* FaEraser, */ FaSave } from "react-icons/fa";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import noImg from '../assets/no-photo-available.png'
import { colores } from '../../componentes/tools/constantes';

export const ModalCamera = ({openModal, setOpenModal, btnSelected}) => {
    const [takePhoto, setTakePhoto] = useState(false);
    const [img, setImg] = useState(noImg);

    const handleTakePhoto = (dataUri) => {
        setImg(dataUri);
        setTakePhoto(false);
    }

    return (
        <Modal show={openModal} onHide={()=>setOpenModal(false)} centered>
            
            <Modal.Body>
                <p style={{fontWeight:'600'}}>Descripción de la actividad a ejecutar</p>
                <div style={{display:'flex'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                        <div style={{display:'flex', flexDirection:'column', }}>
                            <FcOldTimeCamera onClick={()=>setTakePhoto(!takePhoto)} className="cursor" title='takePhoto' style={estilos.estiloIcono} />
                            <FaSave onClick={()=>btnSelected('Guardar')} className="cursor" title='Guardar' style={{...estilos.estiloIcono,color:colores.primario}}/>
                        </div>
                    </IconContext.Provider>
                    <div style={{width:'100%', textAlign:'center', alignSelf:'center'}}>
                        
                        {
                            takePhoto
                            ? <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } />
                            : <img src={img} alt="./assets/" style={{width:'280px'}}/>
                        }

                        
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                        {/* <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/> */}
                        <BsXSquare onClick={()=>setOpenModal(false)} className="cursor" title='Cancelar' style={{...estilos.estiloIcono,color:colores.primario}}/>
                    </IconContext.Provider>
                </div>
                {/* <Button variant="secondary" onClick={()=>setOpenModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={()=>setOpenModal(false)}>
                    Guardar
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
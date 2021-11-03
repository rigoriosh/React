import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { IconContext } from "react-icons";
import { BsXSquare } from "react-icons/bs";
import { /* FcSupport, */ FcOldTimeCamera/* , FcSearch,FcFullTrash, FcInspection */ } from "react-icons/fc";
import { /* FaEraser, */ FaSave } from "react-icons/fa";
import noImg from '../assets/no-photo-available.png'
import { colores } from '../../componentes/tools/constantes';

import '../styles/modalCamera.css'

export const ModalCamera = ({openModal, setOpenModal, btnSelected, handleForm}) => {

    const [img, setImg] = useState(noImg);

    const handleTakePhoto = (target) => {
        let img = target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result);
            handleForm({name:'foto', value:reader.result})
          };
        reader.readAsDataURL(img);
    }


    return (
        <Modal show={openModal} onHide={()=>setOpenModal(false)} centered>
            
            <Modal.Body>
                <p style={{fontWeight:'600', textAlign:'center'}}>{'Descripción de la actividad a ejecutar'}</p>
                <div style={{display:'flex', marginTop:'15px'}}>
                    <div style={{display:'flex', flexDirection:'column', }}>

                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                            <FaSave onClick={()=>btnSelected('Guardar')} className="cursor" title='Guardar' style={{...estilos.estiloIcono,color:colores.primario}}/>
                            <input id="inputFoto" type="file" accept="image" capture="camera" style={{ display: "none" }}
                                        onChange={({target})=>{handleTakePhoto(target)}}/>
                            <label htmlFor="inputFoto">
                                    <FcOldTimeCamera className="cursor" title='takePhoto' style={estilos.estiloIcono} />
                            </label>
                        </IconContext.Provider>
                    </div>
                    <img src={img} alt="./assets/" style={{width:'80%', borderRadius:'20px'}}/>
                            
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                        <BsXSquare onClick={()=>setOpenModal(false)} className="cursor" title='Cancelar' style={{...estilos.estiloIcono,color:colores.primario}}/>
                    </IconContext.Provider>
                </div>
                
            </Modal.Footer>
        </Modal>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}
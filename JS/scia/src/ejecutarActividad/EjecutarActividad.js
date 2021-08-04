import React, { useState } from 'react';
import { IconContext } from "react-icons";
//import { BsSearch, BsXSquare, BsPlusSquare, BsPencilSquare, BsTools, BsClipboardData } from "react-icons/bs";
import { FcSupport, FcOldTimeCamera, FcSearch,FcFullTrash, FcInspection } from "react-icons/fc";
import { colores } from '../componentes/tools/constantes';
import noImg from './assets/no-photo-available.png'
import { ModalCamera } from './componentes/ModalCamera';

export const EjecutarActividad = () => {

    const [openCamera, setOpenCamera] = useState(false);

    const cerrar = () => {
        console.log('Cerrando....')
    }
    const personEquipos = () => {
        console.log('personEquipos....')
    }
    const variables = () => {
        console.log('variables....')
    }
    const handleForm = (target) => {
        console.log(target.name, target.value);
    }

    const btnSelected = (btnSlected) => {
        console.log(btnSlected)
    }

    const camera = ()=>{
        console.log('camera');
        setOpenCamera(true)
    }
    const search = ()=>{
        console.log('search');
    }
    const trash = ()=>{
        console.log('trash');
    }
    return (
        <div>
            <div style={{...estilos.fila, borderBottom:'2px #0000002b solid', marginBottom:'5px', paddingBottom:'5px'}}>
                <h5 style={{width:'100%', textAlign:'center'}}>Ejecutar Actividad</h5>
                <button onClick={cerrar} type="button" className="btn btn-outline-danger btn-sm" >Cerrar</button>
            </div>
            <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'4em' }}>
                <div style={{...estilos.fila, justifyContent:'space-around'}}>
                    <div style={{textAlign:'center'}}>
                        <FcSupport onClick={personEquipos} name="Agregar" className="cursor" title='Personal/Equipos' style={estilos.estiloIcono}/>
                        <p style={{fontWeight:'600'}}>Personal / Eqipos</p>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <FcInspection onClick={variables} className="cursor" title='Variables' style={estilos.estiloIcono}/>
                        <p style={{fontWeight:'600'}}>Variables</p>
                    </div>
                </div>
                
            </IconContext.Provider>
            <div style={{...estilos.fila}}>
                <h3>{'Descripción de la actividad a ejecutar'}</h3>
            </div>
            <div style={{...estilos.fila}}>
                <p>{' Programación: Inicio 21-mar-21 Fin:5-abr-21Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quod eum, temporibus ratione tempore praesentium nihil sunt autem accusantium, soluta ipsam? Laboriosam asperiores animi itaque, ab fugiat consequatur expedita perferendis.'}</p>
            </div>
            <div>
                    <p style={{fontWeight:'bold'}}>Fecha Ejecución</p>
                    <div className="input-group mb-3">
                        <input onChange={({target})=>handleForm(target)} name="scheduledStart" type="datetime-local" className="form-control" aria-label="scheduledStart" aria-describedby="basic-addon1"/>
                    </div>
            </div>
            <div>
                    <p style={{fontWeight:'bold'}}>Cantidad Ejecutada</p>
                    <div className="input-group mb-3">
                        <input onChange={({target})=>handleForm(target)} name="amount" type="number" className="form-control" placeholder="Ingresa una cantidad" aria-label="amount" aria-describedby="basic-addon1"/>
                    </div>
                    <p style={{fontWeight:'bold'}}>Unidad Medida</p>
            </div>
            <div style={{display:'flex'}}>
                    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                        <div style={{display:'flex', flexDirection:'column', }}>
                            <FcOldTimeCamera onClick={camera} className="cursor" title='Editar' style={estilos.estiloIcono} />
                            <FcSearch onClick={search} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                            <FcFullTrash onClick={trash} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                        </div>
                    </IconContext.Provider>
                <div style={{width:'100%', textAlign:'center', alignSelf:'center'}}>
                    <img src={noImg} alt="./assets/" style={{width:'280px'}}/>
                    {/* <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } /> */}
                </div>
            </div>
            <div style={{marginBottom:'10px', textAlign:'center', width:'100%'}}>
                <button onClick={()=>btnSelected('Inicio')} style={estilos.botonEjeAct}>{'Inicio'}</button>
                <button onClick={()=>btnSelected('Ejecucion')} style={estilos.botonEjeAct}>{'Ejecución'}</button>
                <button onClick={()=>btnSelected('Fin')} style={{...estilos.botonEjeAct, width:'50px'}}>{'Fin'}</button>
                <button onClick={()=>btnSelected('Relevante')} style={estilos.botonEjeAct}>{'Relevante'}</button>
                <button onClick={()=>btnSelected('Amarillado')} style={estilos.botonEjeAct}>{'Amarillado'}</button>
            </div>
            <div style={{marginBottom:'10px', textAlign:'center', width:'100%'}}>
                <textarea onChange={({target})=>handleForm(target)} name="observacionesActividad" className="form-control"
                aria-label="With textarea" placeholder="Observaciones en la ejecución de la actividad" style={{height: "100px"}}></textarea>
                <textarea onChange={({target})=>handleForm(target)} name="observacionesConfirRechaActi" className="form-control"
                aria-label="With textarea" placeholder="Observaciones en la confirmación o rechazo de la actividad" 
                style={{height: "100px", marginTop:'10px'}}></textarea>
            </div>
            <div style={{marginBottom:'10px', textAlign:'center', width:'100%'}}>
                <button onClick={()=>btnSelected('Terminar')} style={estilos.botonEjeAct}>{'Terminar'}</button>
                <button onClick={()=>btnSelected('Confirmar')} style={estilos.botonEjeAct}>{'Confirmar'}</button>
                <button onClick={()=>btnSelected('Rechazar')} style={{...estilos.botonEjeAct}}>{'Rechazar'}</button>
                <button onClick={()=>btnSelected('Aprobar')} style={estilos.botonEjeAct}>{'Aprobar'}</button>
            </div>

            <ModalCamera openModal={openCamera} setOpenModal={setOpenCamera} btnSelected={btnSelected}/>
        </div>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px', marginTop:'5px'},
    botonEjeAct:{
        borderRadius: '10px',
        padding:'10px 5px',
        backgroundColor: colores.primario,
        color:'white',
        fontWeight:'bold',
        fontSize:'15px',
        marginLeft:'2px',
        border:'blue'
    },
    estiloIcono: {marginLeft:'0px', marginRight:'0px',}
}
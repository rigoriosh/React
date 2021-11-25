import React, { useContext, useEffect, useState } from 'react'
import { FieldSelect } from '../../../componets/FieldSelect'
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PasodePagDer_Icon from '../../../assets/Iconos/PasodePagDer_Icon.png'
import GestiondeUS_Eliminar_Icon from '../../../assets/Iconos/GestiondeUS_Eliminar_Icon.png'
import GestiondeUS_CrearUs_Icon from '../../../assets/Iconos/GestiondeUS_CrearUs_Icon.png'
import { getInfoGET } from '../../../api'
import { StoreContext } from '../../../App'
import enviroment from '../../../helpers/enviroment'
import { textosInfoWarnig } from '../../../helpers/utils'
import { Transition } from '../../auth/Signin';




export const FirstFormTramitre = ({handleFormChange, tiposTramites, tipoSolicitud, tiposSolicitante, avancePagina,
    formularioTramite, setTitularesDeDerecho, titularesDeDerecho}) => {

        const [openDialog, setOpenDialog] = useState(false);
        const {tipoTramite, motivoSolicitud, tipoSolicitante, } = formularioTramite;

        const [newTitularDerecho, setNewTitularDerecho] = useState({
            nombres:{
                name: 'nombres',
                value:'',
                validacion:'',
            },
            apellidos:{
                name: 'apellidos',
                value:'',
                validacion:'',
            },
            tipoDeDocumento:{
                name: 'tipoDeDocumento',
                value:'',
                validacion:'',
            },
            numeroDeDocumento:{
                name: 'numeroDeDocumento',
                value:'',
                validacion:'',
            }
        })

        const [validaciones, setValidaciones] = useState({campo:'', msgValidacion:''});

        const agregarTitularDeDerecho = () => {
            const clonetitularesDeDerecho = [...titularesDeDerecho];
            console.log(clonetitularesDeDerecho);
            let formularioOk = true;
            const key = Object.keys(newTitularDerecho);
            key.forEach(campo => {
                if (newTitularDerecho[campo].value === "") {
                    newTitularDerecho[campo].validacion = textosInfoWarnig.campoRequerido;
                    formularioOk = false;
                }else{
                    newTitularDerecho[campo].validacion = '';
                }
            });

            if (formularioOk) {
                clonetitularesDeDerecho.push(
                    {
                        numeroDocumento: newTitularDerecho.numeroDeDocumento.value,
                        tipoDocumento: newTitularDerecho.tipoDeDocumento.value,
                        nombre: newTitularDerecho.nombres.value,
                        apellido: newTitularDerecho.apellidos.value,
                    }
                );
                setTitularesDeDerecho(clonetitularesDeDerecho);
            }

        }

    return (
        <div>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">TRÁMITES CATASTRALES</p>
            </div>

            <div style={{margin:'10px 20px'}}>
                <FieldSelect label={'Trámite'} value={tipoTramite.value} options={tiposTramites} 
                    handleOnchange={(target)=>handleFormChange(target)} messageValidate={tipoTramite.validation} name={tipoTramite.name}/>

                <FieldSelect label={'Solicitud'} value={motivoSolicitud.value} options={tipoSolicitud}  styleOwn={{marginTop:'5px'}}
                    handleOnchange={(target)=>handleFormChange(target)} messageValidate={motivoSolicitud.validation} name={motivoSolicitud.name}/>

                <FieldSelect label={'Tipo de solicitante'} value={tipoSolicitante.value} options={tiposSolicitante}  styleOwn={{marginTop:'5px'}}
                    handleOnchange={(target)=>handleFormChange(target)} messageValidate={tipoSolicitante.validation} name={tipoSolicitante.name}/>

            </div>

            <div className="row contenTitulo">
                <div className="decorationTitle bgc2"></div>
                <p className="titulo color2">TITULARES DE DERECHO</p>
            </div>

            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <p className="color2">Agregar titular</p>
                <img onClick={()=>{setOpenDialog(true)}} className="imgWidth" src={GestiondeUS_CrearUs_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
            </div>

            <div className="row contenTitulo">
                <div className="decorationTitle bgc3"></div>
                <p className="titulo color3">OTROS</p>
            </div>

            {/* <div style={{margin:'10px 20px'}}>
                <textarea className="textArea" name="textarea" rows="10" cols="50">Write something here</textarea>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>{avancePagina()}} className="grey2 pointer">Siguiente</p>
                    <img onClick={()=>{avancePagina()}} className="imgWidth" src={PasodePagDer_Icon} alt="" style={{width:'12px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
                </div>
            </div> */}
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Agregar titular de derecho'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div style={{margin:'10px 20px'}}>
                            <div className="row">
                                <FieldTextWidtLabel value={newTitularDerecho.nombres.value} name="nombres" label={'Nombres'} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, nombres: {...newTitularDerecho.nombres,value}})} messageValidate={newTitularDerecho.nombres.validacion}/>
                                <FieldTextWidtLabel  value={newTitularDerecho.apellidos.value} name="apellidos" label={'Apellidos'} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, apellidos: {...newTitularDerecho.apellidos,value}})} messageValidate={newTitularDerecho.apellidos.validacion} styleOwn={{marginLeft:'10px'}}/>
                            </div>
                            <div style={{display:'flex', width:'100%'}}>
                                <FieldSelect label={'Tipo de documento'} value={0} options={[{valor:0, descripcionValor:'CC'}, {valor:0, descripcionValor:'Pasaporte'}]} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, tipoDeDocumento: {...newTitularDerecho.tipoDeDocumento,value}})} messageValidate={newTitularDerecho.tipoDeDocumento.validacion} name={"tipoDocumento"} styleOwn={{width:'auto'}}/>
                                <FieldTextWidtLabel name="numeroDocumento" value={''} label={'Numero de documento'} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, numeroDeDocumento: {...newTitularDerecho.numeroDeDocumento,value}})} messageValidate={newTitularDerecho.numeroDeDocumento.validacion} type='number' maxLength={20} styleOwn={{marginLeft:'10px'}}/>
                                <img onClick={()=>{}} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
                            </div>
                            
                            <div className="row"></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                agregarTitularDeDerecho();
                                setOpenDialog(false);
                            }} className='btnAceptar'>Agregar titular</button>
                            <button onClick={()=>{
                                setOpenDialog(false);
                            }} className='btnAceptar'>Cancelar</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

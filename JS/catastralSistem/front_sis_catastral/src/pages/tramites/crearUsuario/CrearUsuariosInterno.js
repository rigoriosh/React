import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { getInfo, getInfoGET } from '../../../api'
import { StoreContext } from '../../../App'
import { FieldSelect } from '../../../componets/FieldSelect'
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel'
import enviroment from '../../../helpers/enviroment'
import { emailRegex, pwdEncripted, stylesApp, textosInfoWarnig } from '../../../helpers/utils'

import Logo_Asomunicipios_ColorLetranegra from '../../../assets/Iconos/Logo_Asomunicipios_ColorLetranegra.png'
import CrearUsuario_NuevoUS_Icon from '../../../assets/Iconos/CrearUsuario_NuevoUS_Icon.png'
import Salir_Icon from '../../../assets/Iconos/Salir_Icon.png'
import { Transition } from '../../auth/Signin';

export const CrearUsuariosInterno = () => {
    const {store, updateStore} = useContext(StoreContext);
    const initForm = {
        nombre:{
            value:'',
            messageValidate:'',
            label:'Nombres'
        },
        apellido:{
            value:'',
            messageValidate:'',
            label:'Apellido'
        },
        tipoDocumento:{
            // value:'seleccione',
            value:'',
            messageValidate:'',
            label:'Tipo de documento'
        },
        numeroDocumento:{
            value:'',
            messageValidate:'',
            label:'Número de documento'
        },
        email:{
            value:'',
            messageValidate:'',
            label:'email'
        },
        confirmaremail:{
            value:'',
            messageValidate:'',
            label:'Confirmar email'
        },
        pass:{
            value:'',
            messageValidate:'',
            label:'Contraseña'
        },
        confPass:{
            value:'',
            messageValidate:'',
            label:'Confirmar contraseña'
        }
    }
    const navigate = useNavigate();
    const [form, setForm] = useState(initForm);
    const {nombre, apellido, tipoDocumento, numeroDocumento, email, confirmaremail, pass, confPass} = form;
    const [tiposDocumento, setTiposDocumento] = useState([]);

    const [openDialog, setOpenDialog] = useState({open:false, msg :'',tittle:''});

    const getTiposDocumento = async() => {
        const token = '';
        const headers = {token, /* nombreDominio:'TIPO_DOCUMENTO' */};
        const getTiposDocumento = await getInfoGET(headers, enviroment.getTiposDocumento)
        // let getTiposDocumento = {"resultado":{"dominios":[{"descripcionValor":"Cedula de ciudadanía","idValorLista":1,"valor":"CC","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Cédula de extranjería","idValorLista":6,"valor":"CE","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Pasaporte","idValorLista":7,"valor":"PA","nombreLista":"TIPO_DOCUMENTO"}]}}
        if (!getTiposDocumento.resultado) {
            updateStore({
                ...store,
                snackBar:{
                    openSnackBar: true,
                    messageSnackBar:textosInfoWarnig.falloComunicacion,
                    severity: 'error'
                  },
            });
        } else {
            // ajusta tipos de documentos a ser renderizados
            const tiposDocumento = [
                // {
                //     descripcionValor: 'Seleccione ...',
                //     idValorLista: 1,
                //     valor: 'seleccione',
                //     nombreLista: 'seleccione'
                // }
            ];
            getTiposDocumento.resultado.dominios.forEach(dominio => {
                tiposDocumento.push(dominio);
            });
            setTiposDocumento(tiposDocumento);
            updateStore({ ...store, tiposDocumento, });
        }
    }

    const handleFormChange = ({name, value}) => {
        if ((name === 'numeroDocumento' && value.length < 11)
            || (name !== 'numeroDocumento' && name !== 'telefonoContacto' && value.length < 60)
            || (name === 'telefonoContacto' && value.length < 15) 
        ) {
            setForm({...form, [name]:{value, messageValidate:'', label: form[name].label}})
        }
    }

    const validateForm = () => {
        let formOk = true;
        let cloneForm = Object.assign({}, form);
        const keysForm = Object.keys(cloneForm);
        let mensaje = '';

        if (!emailRegex.test(cloneForm.email.value)) {
            cloneForm = {...cloneForm, email:{...cloneForm.email, messageValidate: textosInfoWarnig.formatEmailInvalido}}
            mensaje = textosInfoWarnig.formatEmailInvalido; 
            formOk = false;
        }

        if (!emailRegex.test(cloneForm.confirmaremail.value)) {
            cloneForm = {...cloneForm, confirmaremail:{...cloneForm.confirmaremail, messageValidate: textosInfoWarnig.formatEmailInvalido}}
            mensaje = textosInfoWarnig.formatEmailInvalido; 
            formOk = false;
        }

        if(cloneForm.email.value !== cloneForm.confirmaremail.value){
            cloneForm = {...cloneForm, confirmaremail:{...cloneForm.confirmaremail, messageValidate: textosInfoWarnig.diferentesEmails}}
            mensaje = textosInfoWarnig.diferentesEmails; 
            formOk = false;
        }

        if(cloneForm.pass.value !== cloneForm.confPass.value){
            cloneForm = {...cloneForm, confPass:{...cloneForm.confPass, messageValidate: textosInfoWarnig.diferentesPassWords}}
            mensaje = textosInfoWarnig.diferentesPassWords; 
            formOk = false;
        }

        keysForm.forEach(field => {
            if (cloneForm[field].value === '') {
                cloneForm = {...cloneForm, [field]:{...cloneForm[field], messageValidate: textosInfoWarnig.campoRequerido}}
                mensaje = textosInfoWarnig.camposRequerdios
                formOk = false;
            } else {
                form[field].messageValidate = '';
            }
        });

        if (!formOk) {
            updateStore({
                ...store,
                snackBar:{
                    openSnackBar: true,
                    messageSnackBar: mensaje,
                    severity: 'warning'
                  },
            });
        }
        setForm(cloneForm);

        return formOk;
    }

    const crearUsuario = async() => {
        if (validateForm()) {
            updateStore({ ...store, openBackDrop:true, });
            const token = store.user.token;
            const headers = {token, 'Content-Type': 'application/json'};
            const body = {
                "apellido": form.apellido.value,
                "tipoDocumento": form.tipoDocumento.value,
                "nombreUsuario": form.numeroDocumento.value,
                "numeroDocumento": form.numeroDocumento.value,
                "numeroCelular": "8000000000",
                "contrasena": pwdEncripted(form.pass.value),
                "nombre": form.nombre.value,
                "email": form.email.value,
                "roles": [
                    {
                        "idRol": 1
                    }
                ],
                "tipoUsuario": "I"
            }
            // const body = `nombreUsuario=${form.numeroDocumento.value}&nombre=${form.nombre.value}&apellido=${form.apellido.value}&tipoDocumento=${form.tipoDocumento.value}&numeroDocumento=${form.numeroDocumento.value}&numeroCelular=${form.telefonoContacto.value}&contrasena=${form.pass.value}&email=${form.email.value}&tipoUsuario:"E"&roles:[{"idRol": 2}]`;
            const crearUsuarioInterno = await getInfo(headers, enviroment.crearUsuario, 'POST', JSON.stringify(body))
            // const crearUsuarioInterno = {resultado:{mensaje:'ok creado'}}
            if (!crearUsuarioInterno.resultado) {
                updateStore({
                    ...store,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar: crearUsuarioInterno.error 
                        ? crearUsuarioInterno.error.descripcion
                            ?  crearUsuarioInterno.error.descripcion
                            : crearUsuarioInterno.error
                        : textosInfoWarnig.falloComunicacion,
                        severity: 'error'
                      },
                    openBackDrop:false,
                });
            } else {
                updateStore({ ...store, snackBar:{
                    openSnackBar: true,
                    messageSnackBar:crearUsuarioInterno.resultado.mensaje,
                    severity: 'success'
                }, openBackDrop:false, });
                setOpenDialog({open:true, msg :textosInfoWarnig.creacionUsuario, tittle:''})
            }
        }
    }

    useEffect(() => {
        // get Tipos documentos
        if (store.tiposDocumento.length === 0) {
            getTiposDocumento();
        } else {
            setTiposDocumento(store.tiposDocumento);
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{backgroundColor:'white', width:'60%', padding:'20px 60px', borderRadius:'20px'}}>
            <img src={Logo_Asomunicipios_ColorLetranegra} alt="" srcSet="" style={{width:'200px'}}/>
            <div style={{display:'flex', justifyContent:'center'}}>
                {/* divisor */}<div style={{width:'70%', height:'0.5px', backgroundColor:stylesApp.gray1, margin:'10px'}}></div>
            </div>
            <img onClick={()=>{}} src={CrearUsuario_NuevoUS_Icon} alt="" style={{cursor:'pointer', width:'140px', alignSelf:'center'}}/>
            <FieldTextWidtLabel value={nombre.value} name="nombre" label={nombre.label} handleChange={(target)=>handleFormChange(target)} messageValidate={nombre.messageValidate}/>
            <FieldTextWidtLabel  value={apellido.value} name="apellido" label={apellido.label} handleChange={(target)=>handleFormChange(target)} messageValidate={apellido.messageValidate}/>
            <div style={{display:'flex', width:'100%'}}>
                <FieldSelect label={tipoDocumento.label} value={tipoDocumento.value} options={tiposDocumento} handleOnchange={(target)=>handleFormChange(target)}
                    messageValidate={tipoDocumento.messageValidate} name={"tipoDocumento"}/>
                <FieldTextWidtLabel name="numeroDocumento" value={numeroDocumento.value} label={numeroDocumento.label} handleChange={(target)=>handleFormChange(target)}
                    messageValidate={numeroDocumento.messageValidate} type='number' maxLength={20} styleOwn={{marginLeft:'10px'}}/>
            </div>

            <FieldTextWidtLabel name="email" value={email.value} label={email.label} handleChange={(target)=>handleFormChange(target)}
                messageValidate={email.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>

            <FieldTextWidtLabel name="confirmaremail" value={confirmaremail.value} label={confirmaremail.label} handleChange={(target)=>handleFormChange(target)}
                    messageValidate={confirmaremail.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>
            
            <FieldTextWidtLabel name="pass" value={pass.value} label={pass.label} handleChange={(target)=>handleFormChange(target)}
                    messageValidate={pass.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>

            <FieldTextWidtLabel name="confPass" value={confPass.value} label={confPass.label} handleChange={(target)=>handleFormChange(target)}
                    messageValidate={confPass.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>

            <button onClick={()=>crearUsuario()} className='btnAceptar'>CREAR USUARIO</button>

            {/* <div style={{display:'flex'}} onClick={()=>{navigate("/")}}> */}
            <div style={{display:'flex', justifyContent:'center'}} onClick={()=>{setOpenDialog({open:true, msg :textosInfoWarnig.cancelarRegistro, tittle:''})}}>
                <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Salir</p>
            </div>
            <Dialog
                open={openDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDialog({...openDialog, open:false})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{openDialog.tittle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>{openDialog.msg}</p>
                        {
                            openDialog.msg === textosInfoWarnig.creacionUsuario &&
                            <p style={{textAlign:'center',marginTop:'20px', fontWeight:'bold'}}>{`Usuario: ${numeroDocumento.value}`}</p>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        openDialog.msg === textosInfoWarnig.creacionUsuario
                        ? <button onClick={()=>{
                            setOpenDialog({...openDialog, open:false});
                            setForm(initForm);
                            navigate("/");
                        }} className='btnAceptar'>OK</button>
                        : <div>
                            <button onClick={()=>{
                                setOpenDialog({...openDialog, open:false});
                                setForm(initForm);
                                navigate("/");
                            }} className='btnAceptar'>SI</button>
                            <button onClick={()=>{
                                setOpenDialog({...openDialog, open:false});
                            }} className='btnAceptar'>NO</button>
                        </div>
                    }
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

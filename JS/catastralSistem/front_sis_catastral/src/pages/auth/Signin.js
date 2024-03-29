import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import Logo_Asomunicipios_ColorLetranegra from '../../assets/Iconos/Logo_Asomunicipios_ColorLetranegra.png'
import Salir_Icon from '../../assets/Iconos/Salir_Icon.png'
import Registrese_NuevoUS_Icon from '../../assets/Iconos/Registrese_NuevoUS_Icon.png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import enviroment from '../../helpers/enviroment';
import { getInfo, getInfoGET } from '../../api';
import { StoreContext } from '../../App';
import { emailRegex, pwdEncripted, stylesApp, textosInfoWarnig } from '../../helpers/utils';
import { FieldTextWidtLabel } from '../../componets/FieldTextWidtLabel';
import { FieldSelect } from '../../componets/FieldSelect';
import Contraseña_Login_Icon from '../../assets/Iconos/Contraseña_Login_Icon.png'
import VerContraseña_Login_Icon from '../../assets/Iconos/VerContraseña_Login_Icon.png'
import GestiondeUS_NOHabilitado_Icon from '../../assets/Iconos/GestiondeUS_NOHabilitado_Icon.png'

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const Signin = () => {
    const {store, updateStore} = useContext(StoreContext);
    const navigate = useNavigate();
    const [seePass, setSeePass] = useState(false);

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
        // departamento:{
        //     value:'',
        //     messageValidate:'',
        //     label:'Departamento'
        // },
        // municipio:{
        //     value:'',
        //     messageValidate:'',
        //     label:'Municipio'
        // },
        direccionResidencia:{
            value:'',
            messageValidate:'',
            label:'Dirección de residencia'
        },
        // numeroContacto:{
        //     value:'',
        //     messageValidate:'',
        //     label:'Número de contacto'
        // },
        telefonoContacto:{
            value:'',
            messageValidate:'',
            label:'Número de Teléfono'
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
    const [form, setForm] = useState(initForm);
    const [tiposDocumento, setTiposDocumento] = useState([
        // {
        //     descripcionValor: 'Seleccione...',
        //     idValorLista: 1,
        //     valor: 'seleccione',
        //     nombreLista: 'seleccione'
        // },
        {
            descripcionValor: 'Cedula de ciudadanía',
            idValorLista: 1,
            valor: 'CC',
            nombreLista: 'TIPO_DOCUMENTO'
        },
        {
            descripcionValor: 'Cédula de extranjería',
            idValorLista: 6,
            valor: 'CE',
            nombreLista: 'TIPO_DOCUMENTO'
        },
        {
            descripcionValor: 'Pasaporte',
            idValorLista: 7,
            valor: 'PA',
            nombreLista: 'TIPO_DOCUMENTO'
        },
      ])
    const {nombre, apellido, tipoDocumento, numeroDocumento, /* departamento, municipio, */ direccionResidencia,
        /* numeroContacto, */ telefonoContacto, email, confirmaremail, pass, confPass} = form;
    const [openDialog, setOpenDialog] = useState({open:false, msg :'',tittle:''});
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
    const handleFormChange = ({name, value}) => {
        if ((name === 'numeroDocumento' && value.length < 11)
            || (name !== 'numeroDocumento' && name !== 'telefonoContacto' && value.length < 60)
            || (name === 'telefonoContacto' && value.length < 15) 
        ) {
            setForm({...form, [name]:{value, messageValidate:'', label: form[name].label}})
        }
    }

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
                  }, llama:"L155FSigin"
            });
        } else {
            // ajusta tipos de documentos a ser renderizados
            const tiposDocumento = [
                {
                    descripcionValor: 'Seleccione...',
                    idValorLista: 1,
                    valor: '',
                    nombreLista: 'seleccione'
                }
            ];
            getTiposDocumento.resultado.dominios.forEach(dominio => {
                tiposDocumento.push(dominio);
            });
            setTiposDocumento(tiposDocumento);
            updateStore({ ...store, tiposDocumento, llama:"L177FSigin"});
        }
    }

    const crearUsuario = async() => {
        if (validateForm()) {
            updateStore({ ...store, openBackDrop:true, llama:"L183FSigin"});
            const token = '';
            const headers = {token, 'Content-Type': 'application/json'};
            const body = {
                "nombreUsuario": form.numeroDocumento.value,
                "nombre": form.nombre.value,
                "apellido": form.apellido.value,
                "tipoDocumento": form.tipoDocumento.value,
                "numeroDocumento": form.numeroDocumento.value,
                "numeroCelular": form.telefonoContacto.value,
                "contrasena": pwdEncripted(form.pass.value),
                "email": form.email.value,
                "roles": [
                    {
                        "idRol": 2
                    }
                ],
                "tipoUsuario": "E"
            }
            // const body = `nombreUsuario=${form.numeroDocumento.value}&nombre=${form.nombre.value}&apellido=${form.apellido.value}&tipoDocumento=${form.tipoDocumento.value}&numeroDocumento=${form.numeroDocumento.value}&numeroCelular=${form.telefonoContacto.value}&contrasena=${form.pass.value}&email=${form.email.value}&tipoUsuario:"E"&roles:[{"idRol": 2}]`;
            const crearUsuarioExterno = await getInfo(headers, enviroment.crearUsuario, 'POST', JSON.stringify(body))
            // const crearUsuarioExterno = {resultado:{mensaje:'ok creado'}}
            if (!crearUsuarioExterno.resultado) {
                updateStore({
                    ...store,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar: crearUsuarioExterno.error 
                        ? crearUsuarioExterno.error.descripcion
                            ?  crearUsuarioExterno.error.descripcion
                            : crearUsuarioExterno.error
                        : textosInfoWarnig.falloComunicacion,
                        severity: 'error'
                      },
                    openBackDrop:false, llama:"L206FSigin"
                });
            } else {
                updateStore({ ...store, snackBar:{
                    openSnackBar: true,
                    messageSnackBar:crearUsuarioExterno.resultado.mensaje,
                    severity: 'success'
                }, openBackDrop:false, llama:"L220FSigin" });
                setOpenDialog({open:true, msg :textosInfoWarnig.creacionUsuario, tittle:''})
            }
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
                }, llama:"L273FSigin"
            });
        }
        setForm(cloneForm);


        return formOk;
    }
    return (
        <div className='pagePhader'>
            <div className="modalIngrearUserExt_inLogin" style={{width:'35%'}}>
                <div className='modalLogin sombra' style={{backgroundColor:'white', padding:'20px 20px'}} >
                    <img src={Logo_Asomunicipios_ColorLetranegra} alt="" srcSet="" style={{width:'90px'}}/>
                    {/* divisor */}<div style={{width:'70%', height:'0.5px', backgroundColor:stylesApp.gray1, margin:'10px'}}></div>
                    <img onClick={()=>{}} src={Registrese_NuevoUS_Icon} alt="" style={{cursor:'pointer', width:'120px', alignSelf:'center'}}/>
                    <FieldTextWidtLabel value={nombre.value} name="nombre" label={nombre.label} handleChange={(target)=>handleFormChange(target)} messageValidate={nombre.messageValidate}/>
                    <FieldTextWidtLabel  value={apellido.value} name="apellido" label={apellido.label} handleChange={(target)=>handleFormChange(target)} messageValidate={apellido.messageValidate}/>
                    <div style={{display:'flex', width:'100%'}}>
                        <FieldSelect label={tipoDocumento.label} value={tipoDocumento.value} options={tiposDocumento} handleOnchange={(target)=>handleFormChange(target)}
                            messageValidate={tipoDocumento.messageValidate} name={"tipoDocumento"}/>
                        <FieldTextWidtLabel name="numeroDocumento" value={numeroDocumento.value} label={numeroDocumento.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={numeroDocumento.messageValidate} type='number' maxLength={20} styleOwn={{marginLeft:'10px'}}/>
                    </div>
                    <FieldTextWidtLabel name="direccionResidencia" value={direccionResidencia.value} label={direccionResidencia.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={direccionResidencia.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>

                    <FieldTextWidtLabel name="telefonoContacto" value={telefonoContacto.value} label={telefonoContacto.label} 
                        handleChange={(target)=>{
                            if (target.value.length < 11) handleFormChange(target)
                        }}
                        messageValidate={telefonoContacto.messageValidate} type='number' maxLength={10} styleOwn={{marginLeft:'0px'}}/>
                    
                    <FieldTextWidtLabel name="email" value={email.value} label={email.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={email.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>

                    <FieldTextWidtLabel name="confirmaremail" value={confirmaremail.value} label={confirmaremail.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={confirmaremail.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/>
                    
                    {/* <FieldTextWidtLabel name="pass" value={pass.value} label={pass.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={pass.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/> */}
                         {/* input contraseña */}
                    <div className="fieldText">
                        {/* Icono */} <img src={Contraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        {/* Separador | */}<div style={{backgroundColor:stylesApp.gray1, width:'2px', margin:'1px 5px'}}></div>
                        <input type={seePass ? "text" : 'password'} name="pass" id="contraseña" value={pass.value} onChange={({target})=>handleFormChange(target)} 
                            maxLength='20' placeholder="Contraseña" className='styleInputtext'
                        /><br />
                        {
                            seePass 
                            ? <img onClick={()=>setSeePass(!seePass)} src={GestiondeUS_NOHabilitado_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                            : <img onClick={()=>setSeePass(!seePass)} src={VerContraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        }
                    </div>

                    {/* <FieldTextWidtLabel name="confPass" value={confPass.value} label={confPass.label} handleChange={(target)=>handleFormChange(target)}
                         messageValidate={confPass.messageValidate} type='text' maxLength={50} styleOwn={{marginLeft:'0'}}/> */}
                    
                    <div className="fieldText">
                        {/* Icono */} <img src={Contraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        {/* Separador | */}<div style={{backgroundColor:stylesApp.gray1, width:'2px', margin:'1px 5px'}}></div>
                        <input type={seePass ? "text" : 'password'} name="confPass" id="contraseña" value={confPass.value} onChange={({target})=>handleFormChange(target)} 
                            maxLength='20' placeholder="Contraseña" className='styleInputtext'
                        /><br />
                        {
                            seePass 
                            ? <img onClick={()=>setSeePass(!seePass)} src={GestiondeUS_NOHabilitado_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                            : <img onClick={()=>setSeePass(!seePass)} src={VerContraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        }
                    </div>

                    <button onClick={()=>crearUsuario()} className='btnAceptar'>¡REGISTRARSE AHORA!</button>

                    {/* <div style={{display:'flex'}} onClick={()=>{navigate("/")}}> */}
                    <div style={{display:'flex'}} onClick={()=>{setOpenDialog({open:true, msg :textosInfoWarnig.cancelarRegistro, tittle:''})}}>
                        <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                        <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Salir</p>
                    </div>
                    {/* <button onClick={()=>logIn()}>Aceptar</button><br />
                    <button onClick={()=>{navigate("/")}}>Salir</button> */}
                </div>
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
        
        //         <div style={{display:'flex', width:'50%', justifyContent:'space-around', marginTop:'20px'}}>
        //             <button onClick={()=>crearUsuario()}>Crear</button>
        //             <button onClick={()=>{navigate("/");}}>Cancelar</button>
        //         </div>
        //     </div>
        //     
        // </div>
    )
}

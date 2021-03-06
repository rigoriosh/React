import React, { useContext, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import {  getInfoGET } from '../../api';
import { StoreContext } from '../../App';
import enviroment from '../../helpers/enviroment';
import {  getToken, stylesApp, textosInfoWarnig } from '../../helpers/utils';
// import { Outlet } from 'react-router'
import Logo_Asomunicipios_ColorLetranegra from '../../assets/Iconos/Logo_Asomunicipios_ColorLetranegra.png'
import Ingresar_Login_Icon from '../../assets/Iconos/Ingresar_Login_Icon.png'
import Usuario_Login_Icon from '../../assets/Iconos/Usuario_Login_Icon.png'
import Contraseña_Login_Icon from '../../assets/Iconos/Contraseña_Login_Icon.png'
import GestiondeUS_NOHabilitado_Icon from '../../assets/Iconos/GestiondeUS_NOHabilitado_Icon.png'
import VerContraseña_Login_Icon from '../../assets/Iconos/VerContraseña_Login_Icon.png'
import Salir_Icon from '../../assets/Iconos/Salir_Icon.png'


export const Login = () => {
    let navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario } = store;
    // const [form, setForm] = useState({user:'davids', pwd:'prueba'});
    const [form, setForm] = useState({user:'', pwd:''});
    const {user, pwd=''} = form;
    const [seePass, setSeePass] = useState(false);

    const logIn = async(e) => {
        e.preventDefault();
        updateStore({ ...store, openBackDrop: true });
        let responseGetToken = {} ;
        if(user !== '' && pwd !== '' ){
            try {
                responseGetToken = await getToken(user, pwd);
                if (!responseGetToken.tkn) {
                            updateStore({
                                ...store,
                                snackBar:{
                                    openSnackBar: true,
                                    messageSnackBar: responseGetToken.error.descripcion ? responseGetToken.error.descripcion : textosInfoWarnig.credencialesIncorrectas,
                                    severity: 'error'
                                  },
                                openBackDrop: false,
                            });
                } else {// recibio token ok
                    // realiza Login
                    const headers = {token: responseGetToken.tkn};
                    const responseLogin = await getInfoGET(headers, enviroment.loginUser, 'POST')
                    if (!responseLogin.resultado.usuario) {
                        updateStore({
                            ...store,
                            openBackDrop: false,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: textosInfoWarnig.falloComunicacion,
                                severity: 'warning'
                            },
                        });
                    } else if(responseLogin.resultado.usuario.estado === "I"){
                        updateStore({
                            ...store,
                            openBackDrop: false,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: `El usuario ${responseLogin.resultado.usuario.numeroDocumento}, está deshabilitado para ingresar al sistema, 
                                porfavor comuniquese al correo comunicaciones@asomunicipios.gov.co`,
                                severity: 'warning'
                            },
                        });
                    }else {
                        updateStore({
                            ...store,
                            user:{
                                ...usuario,
                                isLogin: true,
                                user,
                                pwd,
                                token: responseGetToken.tkn,
                                tiempoExpiracion: responseGetToken.tiempoExpiracion,
                                tiempoInicio: new Date(), // inicio Token
                                
                                infoUser: responseLogin.resultado.usuario
                            },
                            openBackDrop: false,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: `Bienvenida(o) ${responseLogin.resultado.usuario.nombre}`,
                                severity: 'success'
                            },
                        });
                        navigate("/");
                    }
                }
            } catch (error) {
                falloLaPeticion();
            }
        }else{
            updateStore({
                ...store,
                snackBar:{
                    openSnackBar: true,
                    messageSnackBar: textosInfoWarnig.camposRequerdios,
                    severity: 'error'
                  },
            });
        }
    }

    const falloLaPeticion = () => {
        updateStore({
            ...store,
            openBackDrop:false,
            snackBar:{ openSnackBar:true, messageSnackBar:textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}
        });
    }

    // eslint-disable-next-line no-unused-vars
    const modoTest = () => {
        updateStore({
            ...store,
            user:{
                ...usuario,
                isLogin: true,
                user,
                pwd,
                token: 'responseGetToken.tkn',
                tiempoExpiracion: 36000000,
                tiempoInicio: new Date(), // inicio Token
                
                infoUser: {
                    usuario:{
                        nombre:'Rigo'
                    },
                    roles:[
                        {
                            permisos: [
                                {
                                    moduloDominio:{
                                        valor:'MADM'
                                    }
                                },
                                {
                                    moduloDominio:{
                                        valor:'MRSC'
                                    }
                                },
                                {
                                    moduloDominio:{
                                        valor:'MDSC'
                                    }
                                },
                                {
                                    moduloDominio:{
                                        valor:'MCSC'
                                    }
                                },
                            ]
                        }
                    ]
                }
            },
            openBackDrop: false,
            snackBar:{
                openSnackBar: true,
                messageSnackBar: `Bienvenido Rigo`,
                severity: 'success'
            },
        });
        navigate("/");
    }

    return (
        <div className='pagePhader'>
            <div className="modalIngrearUserExt_inLogin">
                <form onSubmit={(e)=>logIn(e)} className='modalLogin sombra' style={{backgroundColor:'white', padding:'20px 20px'}} >
                    <img src={Logo_Asomunicipios_ColorLetranegra} alt="" srcSet="" style={{width:'160px'}}/>
                    {/* divisor */}<div style={{width:'100%', height:'0.5px', backgroundColor:stylesApp.gray1, margin:'10px'}}></div>
                    <img src={Ingresar_Login_Icon} alt="" style={{width:'120px', alignSelf:'start'}}/>

                    {/* input usuario */}
                    <div className="fieldText">
                        {/* Icono */} <img src={Usuario_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        {/* Separador | */}<div style={{backgroundColor:stylesApp.gray1, width:'2px', margin:'1px 5px'}}></div>
                        <input type="text" name="usuario" id="usuario" value={user} onChange={({target:{value}})=>{setForm({...form,user:value})}} 
                            className='styleInputtext' placeholder="Usuario" maxLength='30'
                        /><br />
                    </div>

                    {/* input contraseña */}
                    <div className="fieldText">
                        {/* Icono */} <img src={Contraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        {/* Separador | */}<div style={{backgroundColor:stylesApp.gray1, width:'2px', margin:'1px 5px'}}></div>
                        <input type={seePass ? "text" : 'password'} name="contraseña" id="contraseña" value={pwd} onChange={({target:{value}})=>{setForm({...form, pwd:value})}} 
                            maxLength='20' placeholder="Contraseña" className='styleInputtext'
                        /><br />
                        {
                            seePass 
                            ? <img onClick={()=>setSeePass(!seePass)} src={GestiondeUS_NOHabilitado_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                            : <img onClick={()=>setSeePass(!seePass)} src={VerContraseña_Login_Icon} alt="" style={{cursor:'pointer', width:'15px', alignSelf:'center'}}/>
                        }
                    </div>

                    <p onClick={()=>updateStore({
                        ...store,
                        snackBar:{ openSnackBar:true, messageSnackBar:textosInfoWarnig.recuperarPSW, severity:'info', },
                        dialogTool:{
                            open:true,
                            msg :textosInfoWarnig.recuperarPSW,
                            tittle:'Recuperar contraseña',
                            response:false,
                            actions:false,
                            styles:{},
                            textColor:{},
                          },
                    })}
                    style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>
                        ¿Olvido su contraseña?
                    </p>

                    <button type='submit' /* onClick={()=>/* modoTest() *//* logIn() } */ className='btnAceptar'>ACEPTAR</button>

                    <div style={{display:'flex'}} onClick={()=>{navigate("/")}}>
                        <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                        <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Salir</p>
                    </div>
                    {/* <button onClick={()=>{navigate("/")}}>Salir</button> */}
                </form>
            </div>
        </div>
    )
}

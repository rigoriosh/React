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
import { getTokenTest, loginUserTest } from '../../helpers/toTest';


export const Login = () => {
    let navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario, modeTest} = store;
    // const [form, setForm] = useState({user:'davids', pwd:'prueba'});
    const [form, setForm] = useState({user:'', pwd:''});
    const {user, pwd=''} = form;
    const [seePass, setSeePass] = useState(false);

    const logIn = async(e) => {
        e.preventDefault();
        updateStore({ ...store, openBackDrop: true, llama:"L28FLogin" });
        let responseGetToken = {} ;
        if(user !== '' && pwd !== '' ){
            try {
                if (modeTest) {
                    responseGetToken = getTokenTest;
                } else {
                    responseGetToken = await getToken(user, pwd);
                }

                if (!responseGetToken.tkn) {
                            updateStore({
                                ...store,
                                snackBar:{
                                    openSnackBar: true,
                                    messageSnackBar: responseGetToken.error.descripcion ? responseGetToken.error.descripcion : textosInfoWarnig.credencialesIncorrectas,
                                    severity: 'error'
                                  },
                                openBackDrop: false, llama:"L34FLogin"
                            });
                } else {// recibio token ok
                    // realiza Login
                    let responseLogin = {};
                    if (modeTest) {
                        responseLogin = loginUserTest;
                    } else {
                        const headers = {token: responseGetToken.tkn};
                        responseLogin = await getInfoGET(headers, enviroment.loginUser, 'POST')
                    }
                    if (!responseLogin.resultado.usuario) {
                        updateStore({
                            ...store,
                            openBackDrop: false,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: textosInfoWarnig.falloComunicacion,
                                severity: 'warning'
                            }, llama:"L48FLogin"
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
                            llama:"L58FLogin"
                        });
                    }else {
                        updateStore({
                            ...store,
                            tiempoInicioSession: new Date().getTime(), // inicio Session
                            tiempoInicioToken: new Date().getTime(), // inicio Token
                            user:{
                                ...usuario,
                                isLogin: true,
                                user,
                                pwd,
                                token: responseGetToken.tkn,
                                // tiempoExpiracion: 36000,
                                tiempoExpiracion: responseGetToken.tiempoExpiracion,
                                infoUser: responseLogin.resultado.usuario
                            },
                            openBackDrop: false,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: `Bienvenida(o) ${responseLogin.resultado.usuario.nombre}`,
                                severity: 'success'
                            },
                            llama:"L70FLogin"
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
                  llama:"L100FLogin"
            });
        }
    }

    const falloLaPeticion = () => {
        updateStore({
            ...store,
            openBackDrop:false,
            snackBar:{ openSnackBar:true, messageSnackBar:textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L113FLogin"
        });
    }

    // eslint-disable-next-line no-unused-vars
    const modoTest = () => {
        updateStore({
            ...store,
            tiempoInicioSession: new Date().getTime(), // inicio Session
            tiempoInicioToken: new Date().getTime(), // inicio Token
            user:{
                ...usuario,
                isLogin: true,
                user,
                pwd,
                token: 'eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJBc29tdW5pY2lwaW9zIiwic3ViIjoiQWNjZXNzVG9rZW4iLCJhdWQiOiJyaWdvcmlvc2hAZ21haWwuY29tIiwiZXhwIjoxNjc2OTk4OTgwNDUzLCJuYmYiOjE2NzY5OTUzODAsImlhdCI6MTY3Njk5NTM4MCwibmljayI6IjE4MTI5MTY0IiwianRpIjoiOTMwOWMwZDQtMWQyMC00MDIyLTgxM2UtNDk0MTRmYTUwNWYxIn0.AR40HHKMWE_GExXJfckQJi91D4EI0_3nM7hwKCbozT10dPJhzk1DL9lXK9Qqy34e',
                tiempoExpiracion: 36000,
                infoUser: {
                    idUsuario:1,
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
            llama:"L123FLogin"
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
                        llama:"L207FLogin"
                    })}
                    style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>
                        ¿Olvido su contraseña?
                    </p>

                    <button type='submit' className='btnAceptar'>ACEPTAR</button>

                    <div style={{display:'flex'}} onClick={()=>{navigate("/")}}>
                        <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                        <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Salir</p>
                    </div>
                    <button onClick={()=>{navigate("/")}}>Salir</button>
                </form>
            </div>
        </div>
    )
}

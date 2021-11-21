import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import {  getInfoGET } from '../../api';
import { StoreContext } from '../../App';
import enviroment from '../../helpers/enviroment';
import {  getToken, textosInfoWarnig } from '../../helpers/utils';
// import { Outlet } from 'react-router'
import Logo_Asomunicipios_ColorLetranegra from '../../assets/Iconos/Logo_Asomunicipios_ColorLetranegra.png'

export const Login = () => {
    let navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario } = store;
    const [form, setForm] = useState({user:'davids', pwd:'prueba'});
    // const [form, setForm] = useState({user:'1234567891', pwd:'1234rfr'});
    
    const {user, pwd=''} = form;

    useEffect(() => {
        console.log(111111111)
        return () => {}
    }, [])
    const logIn = async() => {
        // console.log('login');
        updateStore({ ...store, openBackDrop: true });
        let responseGetToken = {} ;
        if(user !== '' || pwd !== '' ){
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
                        navigate("/home")
            } else {// recibio token ok
                // realiza Login
                const headers = {token: responseGetToken.tkn};
                const responseLogin = await getInfoGET(headers, enviroment.loginUser, 'POST')
                if (!responseLogin.resultado.usuario) {
                    console.log(responseLogin);
                    debugger
                    updateStore({
                        ...store,
                        openBackDrop: false,
                        snackBar:{
                            openSnackBar: true,
                            messageSnackBar: textosInfoWarnig.falloComunicacion,
                            severity: 'warning'
                        },
                    });
                } else {
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
                            messageSnackBar: `Bienvenido ${responseLogin.resultado.usuario.nombre}`,
                            severity: 'success'
                        },
                    });
                    navigate("/");
                }
            }
            
        }
    }

    return (
        <div className="modalIngrearUserExt_inLogin">
            <div className='modalLogin sombra' style={{backgroundColor:'white', padding:'20px 20px'}}>
                <img src={Logo_Asomunicipios_ColorLetranegra} alt="" srcSet="" style={{width:'160px'}}/>
                {/* divisor */}<div style={{width:'70%', height:'1px', backgroundColor:'rgb(128 128 128 / 50%)', margin:'5px'}}></div>
                
                <input type="text" name="usuario" id="usuario" value={user} onChange={({target:{value}})=>{setForm({...form,user:value})}}/><br />
                <label htmlFor="contraseña">CONTRASEÑA</label><br />
                <input type="text" name="contraseña" id="contraseña" value={pwd} onChange={({target:{value}})=>{setForm({...form, pwd:value})}}/><br /><br />
                <button onClick={()=>logIn()}>Aceptar</button><br />
                <button onClick={()=>{navigate("/")}}>Salir</button>
            </div>
        </div>
    )
}

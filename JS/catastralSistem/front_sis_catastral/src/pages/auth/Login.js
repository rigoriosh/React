import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { doGetToken, getInfo, getInfoGET } from '../../api';
import { StoreContext } from '../../App';
import enviroment from '../../helpers/enviroment';
import { encript, getToken, textosInfoWarnig } from '../../helpers/utils';
// import { Outlet } from 'react-router'

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
                            openBackDrop: false
                        });
                        navigate("/home")
            } else {// recibio token ok
                // realiza Login
                const headers = {token: responseGetToken.tkn};
                const responseLogin = await getInfoGET(headers, enviroment.loginUser, 'POST')
                if (!responseLogin.resultado.usuario) {
                    console.log(responseLogin);
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
                            tiempoInicio: new Date(),
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

    // console.log(form);

    return (
        <div style={{paddingLeft:'40%', height:'100vh'}}>
            {/* <Outlet/> */}
            <h1>Registrarse</h1>
            <label htmlFor="usuario">USUARIO</label><br />
            <input type="text" name="usuario" id="usuario" value={user} onChange={({target:{value}})=>{setForm({...form,user:value})}}/><br />
            <label htmlFor="contraseña">CONTRASEÑA</label><br />
            <input type="text" name="contraseña" id="contraseña" value={pwd} onChange={({target:{value}})=>{setForm({...form, pwd:value})}}/><br /><br />
            <button onClick={()=>logIn()}>Aceptar</button><br />
            <button onClick={()=>{navigate("/")}}>Salir</button>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { doGetToken, getInfo } from '../../api';
import { StoreContext } from '../../App';
import enviroment from '../../helpers/enviroment';
import { encript, textosInfoWarnig } from '../../helpers/utils';
// import { Outlet } from 'react-router'

export const Login = () => {
    let navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario } = store;
    // const [form, setForm] = useState({user:'davids', pwd:'prueba'});
    const [form, setForm] = useState({user:'1234567891', pwd:'1234rfr'});
    
    const {user, pwd=''} = form;

    const logIn = async() => {
        // console.log('login');
        updateStore({
            ...store,
            openBackDrop: true
        });
        if(user !== '' || pwd !== '' ){
            //TODO: realizar peticion al back
            const headers = {data:encript(user, pwd)};
            const responseGetToken = await getInfo(headers, enviroment.getToken, 'POST', {})
            console.log({responseGetToken});
            if (!responseGetToken.tkn) {
                        updateStore({
                            ...store,
                            snackBar:{
                                openSnackBar: true,
                                messageSnackBar: textosInfoWarnig.credencialesIncorrectas,
                                severity: 'error'
                              },
                            user:{
                                ...usuario,
                                isLogin: true,
                                user,
                                token: responseGetToken.token
                            },
                        });
                        navigate("/home")
            } else {
                updateStore({
                    ...store,
                    user:{
                        ...usuario,
                        isLogin: true,
                        user,
                        token: responseGetToken.tkn,
                        tiempoExpiracion: responseGetToken.tiempoExpiracion,
                    },
                });
                navigate("/home");
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

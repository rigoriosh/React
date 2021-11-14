import React, { useContext, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { doGetToken } from '../../api';
import { StoreContext } from '../../App';
import { encript } from '../../helpers/utils';
// import { Outlet } from 'react-router'

export const Login = () => {
    let navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario } = store;
    const [form, setForm] = useState({user:'davids', pwd:'prueba'});
    const {user, pwd=''} = form;

    const logIn = async() => {
        // console.log('login');
        updateStore({
            ...store,
            openBackDrop: true
        });
        if(user !== '' || pwd !== '' ){
            //TODO: realizar peticion al back
            const codedCredentials = encript(user, pwd);
            // console.log(codedCredentials);
            doGetToken(codedCredentials)
            .then(responseLogin => {
                if (!responseLogin.tkn) {
                    updateStore({
                        ...store,
                        snackBar:{
                            openSnackBar: true,
                            messageSnackBar:'Credenciales incorrectas',
                            severity: 'error'
                          },
                        user:{
                            ...usuario,
                            isLogin: true,
                            user,
                            token: responseLogin.token
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
                            token: responseLogin.token
                        },
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    // console.log(form);

    return (
        <div style={{paddingLeft:'40%'}}>
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

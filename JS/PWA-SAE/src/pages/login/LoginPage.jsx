import React, { useContext, useEffect, useState } from 'react'
// import { stylesApp } from '../../helpers/utils'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';
import { StoreContext } from '../../App';

export const LoginPage = () => {
    const { store, setStore, setLogin } = useContext(StoreContext);

    const { enqueueSnackbar } = useSnackbar();
    const [seePass, setSeePass] = useState(false)
    const [form, setForm] = useState({user:'', pwd:''});
    const {user, pwd} = form;
    console.log(user, pwd);
    
    const handleClickShowPassword = () => setSeePass((seePass) => !seePass);

    const logIn = (e) => {
        e.preventDefault();
        console.log("form => ", form);
        let variant = "success";
        if (user=="" || pwd=="") {
            variant = "error" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Recuerda todos los campos son obligatorios',{variant});
        }else{
            setStore({...store, openBackop: true});
            setTimeout(() => {
                const sesion = {isLogin:true, user, userId:'123'}
                sessionStorage.setItem("login",JSON.stringify(sesion))
                setLogin(sesion)
                enqueueSnackbar(`Bienvenido ${user}`,{variant});
            }, 1000);
        }
    }

    const registrarLogIn = (sesion) => {
        setLogin(sesion)
    }

    useEffect(() => {
      console.log("LoginPage");
      const sesion = JSON.parse(sessionStorage.getItem("login"))
      sesion?registrarLogIn(sesion):"";
      return () => {}
    }, [])
    
    return (
        <div className='loginPage pagePhader'>
            <div className="modalIngrearUserExt_inLogin">
                <form onSubmit={(e)=>logIn(e)} className='modalLogin sombra' style={{backgroundColor:'white', padding:'20px 20px', justifyContent: 'center', height:'100%'}} >
                    
                {/*  <div className="fieldText">
                    
                        <input type="text" name="usuario" id="usuario" value={user} onChange={({target:{value}})=>{setForm({...form,user:value})}} 
                            className='styleInputtext' placeholder="Usuario" maxLength='30'
                        />
                        <br />
                    </div> */}

                
                    <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                        <InputLabel htmlFor="usuario">Usuario</InputLabel>
                            <OutlinedInput
                                id="usuario"
                                type={'text'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            >
                                            <PersonIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={({target})=>setForm({...form, user:target.value})}
                                label="Usuario"
                            />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                        {/* <TextField id="outlined-basic" label="Outlined" variant="filled" />
                        <TextField id="outlined-basic" type='password' label="Outlined" variant="filled" /> */}
                        <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
                        <OutlinedInput
                            id="contrasenia"
                            type={seePass ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {seePass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={({target})=>setForm({...form, pwd:target.value})}
                        />
                    </FormControl>

                    <IconButton color="primary" aria-label="login" type='submit'>
                        <LoginIcon />
                    </IconButton>


                    {/* <div className="fieldText">
                        
                        <input type={seePass ? "text" : 'password'} name="contraseña" id="contraseña" value={pwd} 
                            onChange={({target:{value}})=>{setForm({...form, pwd:value})}} 
                            maxLength='20' placeholder="Contraseña" className='styleInputtext'
                        />
                        <br />
                    
                    </div> */}

                    {/* <button type='submit' className='btnAceptar'>ACEPTAR</button> */}

                </form>
            </div>
        </div>
    )
}

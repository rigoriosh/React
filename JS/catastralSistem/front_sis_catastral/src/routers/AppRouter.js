import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

import { StoreContext } from '../App';
import { RequireAuth } from '../auth/RequireAuth';
import { Tramites } from '../pages/tramites/Tramites';
import { AuthRouter } from './AuthRouter';
import { TramitesCatastrales } from './TramitesCatastrales';
import { getToken, initStore, textosInfoWarnig } from '../helpers/utils';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppRouter = () => {
    const { store, updateStore } = useContext(StoreContext);
    let location = useLocation();
    const navigate = useNavigate();
    const [timeSessionTkn, setTimeSessionTkn] = useState();
    const [timeSessionUser, setTimeSessionUser] = useState(15);
    const {
        user:usuario,
        openBackDrop,
        snackBar:{
            openSnackBar,
            messageSnackBar,
            severity
        },
     } = store;
    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'))
        if (store) {
            updateStore(store)
            setTimeSessionTkn(store.user.tiempoExpiracion)
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const {user} = store;
        setTimeout(() => {
            if (user.isLogin) {
                const timeInit = new Date(user.tiempoInicio);
                const tiempoExpiracion = user.tiempoExpiracion;
                const timeFin = new Date();
                const timeDifference = timeFin - timeInit;
                if(timeDifference >= tiempoExpiracion){
                // solicitarNuevoToken
                renewToken(user.user, user.pwd);
                }
                setTimeSessionTkn(timeDifference)
                console.log("change timeSessionTkn", timeDifference)
            }
        }, 3000);
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeSessionTkn])
    
    useEffect(() => {
        console.log(store)
        
        return () => {}
    }, [store])
    
    // const roles = usuario.infoUser.roles;
    useEffect(() => {
        if (usuario.isLogin) {
            updateStore({
                ...store,
                openBackDrop: false,
            })
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])

    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'))
        updateStore(store)
        return () => {
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const closeBackDrop = ()=>{
        updateStore({...store, openBackDrop});
    }

    const closeSnackbar = ()=>{
        updateStore({...store, snackBar:{openSnackBar: false, messageSnackBar:''}});
    }

    const salir = () => {
        updateStore(initStore);
        sessionStorage.clear();
        navigate("/");
    }

    const renewToken = async(user, pwd) => {
        const responseGetToken = await getToken(user, pwd);
        if (!responseGetToken.tkn) {
          updateStore({
            ...store,
            snackBar:{
                openSnackBar: true,
                messageSnackBar: responseGetToken.error.descripcion ? responseGetToken.error.descripcion : textosInfoWarnig.inconvenientesRenovarSesion,
                severity: 'info'
              },
            openBackDrop: false
          });
          salir();
        } else {
          
        }
      }

    return (
        <div className="App" style={{}}>
            {
                usuario.isLogin &&
                    <div style={{display:'flex', height:'25px', alignItems:'center', justifyContent:'end', padding:'0px 20px'}}>
                        <p style={{marginRight:'20px'}}>Bievenido <span style={{fontWeight:'bold'}}>{usuario.infoUser.nombre}</span></p>
                        <button onClick={()=>salir()}>Salir</button>
                    </div>
            }
            <Routes>
                <Route path="*" element={
                    <Tramites>
                        <AuthRouter/>
                    </Tramites>
                }
                />
                {/* <Route path="*" element={<AuthRouter/>}>
                    <Route index element={<Login/>} />
                    <Route path="sigin" element={<Signin/>} />
                </Route> */}
                <Route
                    path="/tramites/*"
                    element={
                    <RequireAuth>
                        <TramitesCatastrales />
                    </RequireAuth>
                    }
                />
                {/* <Route path="/tramites/*" element={<TramitesCatastrales/>} /> */}
                {/* <Route path="*" element={<NoMatch/>} /> */}
            </Routes>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop} onClick={closeBackDrop} transitionDuration={10000}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical:'top', horizontal:'right' }}
                autoHideDuration={6000}
                open={openSnackBar}
                onClose={closeSnackbar}
                TransitionComponent={TransitionUp}
                // message={messageSnackBar}
                key={'aa'}
            >
                <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {messageSnackBar}
                </Alert>
            </Snackbar>
        </div>
    )
}


import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/App.css'


import { StoreContext } from '../App';
import { RequireAuth } from '../auth/RequireAuth';
import { Tramites } from '../pages/tramites/Tramites';
import { AuthRouter } from './AuthRouter';
import { TramitesCatastrales } from './TramitesCatastrales';
import { getToken, initStore, stylesApp, textosInfoWarnig } from '../helpers/utils';
import { VerticalMenu } from '../componets/VerticalMenu';
import { Transition } from '../pages/auth/Signin';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppRouter = ({props}) => {
    const { store, updateStore } = useContext(StoreContext);
    let location = useLocation();
    const navigate = useNavigate();
    const [timeSessionTkn, setTimeSessionTkn] = useState();
    const { user:usuario, openBackDrop, snackBar, timeInitSessionUser, minutesToEachSession, dialogTool={open:false}} = store;
    const { openSnackBar, messageSnackBar, severity} = snackBar;
    

    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'))
        if (store) {
            updateStore({...store})
            setTimeSessionTkn(store.user.tiempoExpiracion);

            
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => { // monitorea tiempo del token
        const {user} = store;
        setTimeout(() => {
            if (user.isLogin) { // calcula el tiempo del token
                const timeInit = new Date(user.tiempoInicio);
                // const timeInitSession = new Date(user.tiempoInicio);
                const tiempoExpiracion = user.tiempoExpiracion;
                const timeFin = new Date();
                const timeDifference = timeFin - timeInit;
                if(timeDifference >= tiempoExpiracion){ // si vencio solicita nuevo token
                // solicitarNuevoToken
                renewToken(user.user, user.pwd);
                }
                setTimeSessionTkn(timeDifference)
                // console.log("change timeSessionTkn", timeDifference)
            }
        }, 600000);
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store, timeSessionTkn])

    useEffect(() => { // monitorea actividad del usuario
        const {user} = store;
        
        const intervalSessionUser = setInterval(() => {
            if (user.isLogin) { // calcula el tiempo del usuario
                const tiempoExpiracion = minutesToEachSession * 60 * 1000;
                const timeFin = new Date();
                const timeDifference = timeFin -  new Date(timeInitSessionUser);
                if(timeDifference >= tiempoExpiracion){ // si vencio solicita nuevo usuario
                    // cierra la sesion
                    salir(textosInfoWarnig.tiempoInactividad);
                }
            }
        }, 60000);
        return () => {
            clearInterval(intervalSessionUser);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store])
    
    useEffect(() => {
        if (usuario.isLogin) {
            updateStore({
                ...store,
                openBackDrop: false
            })
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])

    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'))
        if (store) {
            updateStore({...store, timeInitSessionUser: new Date()})
        }
        return () => {
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const closeBackDrop = ()=>{
        updateStore({...store, openBackDrop: false});
    }

    const closeSnackbar = ()=>{
        updateStore({...store, snackBar:{openSnackBar: false, messageSnackBar:''}});
    }

    const salir = (motivo='') => {
        updateStore({...initStore, snackBar:{
            openSnackBar: motivo !== '',
            messageSnackBar: motivo !== '' ? motivo : '',
            tiempoExpiracion:'',
            severity: "info"/*  | "error" | "warning" | "info" */,
          }});
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
            openBackDrop: false  });
          salir();
        } else {
            updateStore({
                ...store,
                user:{
                    ...usuario,
                    token: responseGetToken.tkn,
                    tiempoExpiracion: responseGetToken.tiempoExpiracion,
                    tiempoInicio: new Date(), // inicio Token
                }
            });
        }
    }

    return (
        <div className="App pagePhader"  style={{}}>
            <div className="panelFrontal">

            {
                usuario.isLogin &&
                    <VerticalMenu salir={salir} usuario={usuario}/>
            }

            <div style={{width:'100%', alignSelf:'center'}} className="******************pendiente******* "> 
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
            </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop} onClick={closeBackDrop} 
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical:'top', horizontal:'right' }}
                autoHideDuration={3500}
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
            <Dialog
                open={dialogTool.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>updateStore({...store, dialogTool:{...dialogTool, open:false}})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{dialogTool.tittle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>{dialogTool.msg}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                   <div>
                        <button onClick={()=>updateStore({...store, dialogTool:{...dialogTool, open:false, response:true}})} className='btnAceptar'>SI</button>
                        <button onClick={()=>updateStore({...store, dialogTool:{...dialogTool, open:false, response:false}})} className='btnAceptar'>NO</button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}


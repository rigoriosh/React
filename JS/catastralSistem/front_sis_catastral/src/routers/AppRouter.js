import React, { useContext, useEffect, } from 'react'
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
import { constantesGlobales, getToken, initStore, textosInfoWarnig } from '../helpers/utils';
import { VerticalMenu } from '../componets/VerticalMenu';
import { Transition } from '../pages/auth/Signin';
import { msgInfo_MC_AEAC, msgInfo_MC_RAC, msgInfo_MO_MPHC, msgInfo_MP_CPP, msgInfo_MQ_INCP, msgInfo_MS_DDP, msgInfo_MS_EAP, msgInfo_MT_IRC, msgInfo_RE_ACN, msgInfo_RE_RAT, msgInfo_RE_RUD, msgInfo_SC_CIC, msgInfo_SC_SCC, msgInfo_SC_SCCE, msgInfo_SC_SCCPP, msgInfo_SC_SCFP, msgInfo_SC_SCNP, msgInfo_SC_SCPPC, msgInfo_SC_SNP, msgInfo_SC_SPCC } from '../pages/tramites/CrearTramite';

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
    
    const { user:usuario, openBackDrop, snackBar, /* timeInitSessionUser, minutesToEachSession, */ dialogTool={open:false}, } = store;
    const { openSnackBar, messageSnackBar, severity} = snackBar;
    

    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'));
        if (store) {
            updateStore({...store})
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* useEffect(() => { // monitorea tiempo del token
        const {user} = store;
        setTimeout(() => {
            if (user.isLogin) { // calcula el tiempo del token
                
            }
        }, 600000);
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store, timeSessionTkn]) */

    
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
          },
          user: initStore.user,
        });
        navigate("/");
        sessionStorage.clear();

    }

    const renewToken = async(user, pwd) => {
        const responseGetToken = await getToken(user, pwd);
        if (!responseGetToken.tkn) {
          updateStore({
            ...store,
            snackBar:{
                openSnackBar: true,
                messageSnackBar: textosInfoWarnig.inconvenientesRenovarSesion,
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
        <div className="App pagePhader"  style={{backgroundPositionX: store.user.isLogin ? '151px': '-5px'}}>
            <div className="panelFrontal">

            {
                usuario.isLogin &&
                    <VerticalMenu salir={salir} renewToken={renewToken} usuario={usuario}/>
            }

            <div style={{width:'100%', alignSelf:'center'}} > 
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
                            <TramitesCatastrales salir={salir}/>
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
                autoHideDuration={5500}
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
                {
                    dialogTool.tittle !== "" &&
                    <DialogTitle sx={dialogTool.styles}>
                        <div style={{display:'flex', justifyContent:'space-between', color:'black', fontWeight:'bold', fontSize:'25px'}}>
                            {dialogTool.tittle} <span className="pointer"
                            onClick={()=>updateStore({...store, dialogTool:{...dialogTool, open:false, response:false}})}>X</span>
                        </div>
                    </DialogTitle>
                }
                <DialogContent sx={dialogTool.styles}>
                    <DialogContentText id="alert-dialog-slide-description" sx={dialogTool.textColor}>
                        {

                               dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MP_CPP ? msgInfo_MP_CPP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MS_EAP ? msgInfo_MS_EAP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MS_DDP ? msgInfo_MS_DDP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MT_IRC ? msgInfo_MT_IRC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MC_AEAC ? msgInfo_MC_AEAC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MC_RAC ? msgInfo_MC_RAC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MQ_INCP ? msgInfo_MQ_INCP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_RE_RUD ? msgInfo_RE_RUD() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_RE_RAT ? msgInfo_RE_RAT() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_RE_ACN ? msgInfo_RE_ACN() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_MO_MPHC ? msgInfo_MO_MPHC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCPPC ? msgInfo_SC_SCPPC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCC ? msgInfo_SC_SCC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCCE ? msgInfo_SC_SCCE() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCFP ? msgInfo_SC_SCFP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCCPP ? msgInfo_SC_SCCPP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SPCC ? msgInfo_SC_SPCC() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SCNP ? msgInfo_SC_SCNP() 
                             : dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_CIC ? msgInfo_SC_CIC()
                             :  dialogTool.msg === constantesGlobales.tipoNotas.msgInfo_SC_SNP ? msgInfo_SC_SNP() 
                             : <p>{dialogTool.msg}</p>

                        }
                    </DialogContentText>
                </DialogContent>
                {
                    dialogTool.actions &&
                    <DialogActions>
                        <div>
                            <button onClick={()=>updateStore({...store, dialogTool:{...dialogTool, open:false, response:true}})} className='btnAceptar'>SI</button>
                            <button onClick={()=>updateStore({...store, dialogTool:{...dialogTool, open:false, response:false}})} className='btnAceptar'>NO</button>
                        </div>
                    </DialogActions>
                }
            </Dialog>
        </div>
    )
}


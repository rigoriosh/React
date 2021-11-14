import React, { useContext, useEffect } from 'react'
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

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppRouter = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const { store, updateStore } = useContext(StoreContext);
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
        sessionStorage.clear();
        navigate("/");
        updateStore({
            user:{isLogin: false, user:'', token:''},
            snackBar:{
                openSnackBar: false,
                messageSnackBar:'',
                severity: "success"/*  | "error" | "warning" | "info" */,
            },
            openBackDrop:false,
    });
    }
    return (
        <div className="App">
            {
                usuario.isLogin &&
                    <div style={{display:'flex', height:'25px', alignItems:'center', justifyContent:'end', padding:'0px 20px'}}>
                        <p style={{marginRight:'20px'}}>Bievenido <span style={{fontWeight:'bold'}}>{usuario.user}</span></p>
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
                open={openBackDrop}
                onClick={closeBackDrop}
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


import React from 'react'

import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { ocultarMensaje } from '../Redux-actions/alertasMensajes_action';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  
const SnackbarComponent = () => {
    console.log('SnackbarComponent');

    const dispatch = useDispatch();
    const {alertas_mensajes_reducer} = useSelector(state => state);
    const {desplegarMensaje, tipoDeMensaje, textoMensaje} = alertas_mensajes_reducer;
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(ocultarMensaje());
    };
    
    return (
           
        <Snackbar open={desplegarMensaje} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={tipoDeMensaje}>
                    {textoMensaje}
                </Alert>
        </Snackbar>
           
       
    )
}


export default SnackbarComponent

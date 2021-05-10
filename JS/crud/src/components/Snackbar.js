import React from 'react'
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  
const SnackbarComponent = ({mensajes, setMensajes}) => {
    //console.log(mensajes);
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMensajes({...mensajes, open:false});
    };
    
    return (
           
        <Snackbar open={mensajes.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={mensajes.severity}>
                    {mensajes.mensaje}
                </Alert>
        </Snackbar>
           
       
    )
}

SnackbarComponent.propTypes = {    
    mensajes: PropTypes.object.isRequired,
    setMensajes: PropTypes.func.isRequired,
}

export default SnackbarComponent

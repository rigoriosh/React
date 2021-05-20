import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { respuestaDialog } from '../Redux-actions/alertasMensajes_action';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogComponent = () => {
    console.log('DialogComponent');

    const dispatch = useDispatch();
    const {alertas_mensajes_reducer} = useSelector(state => state);
    const {desplegarDialog, tituloDelDialog, textoDialog} = alertas_mensajes_reducer;

    const handleClose = (info) => {        
        dispatch(respuestaDialog(info));
      };
    return (
        <Dialog open={desplegarDialog} TransitionComponent={Transition} keepMounted onClose={()=>{handleClose('')}}
            aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description" >
            <DialogTitle id="alert-dialog-slide-title">{tituloDelDialog}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"> {textoDialog} </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleClose(false)}} color="primary">
                    No
                </Button>
                <Button onClick={()=>{handleClose(true)}} color="primary">
                    Si
                </Button>
            </DialogActions>
      </Dialog>
    )
}


export default DialogComponent

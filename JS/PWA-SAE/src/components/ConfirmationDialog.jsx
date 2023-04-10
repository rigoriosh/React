import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const ConfirmationDialog = ({openConfirmationDialog, setOpenConfirmationDialog,
    handleResponseConfirmation, dialogContenText}) => {
    
    
  return (
    <>
      <Dialog
        open={openConfirmationDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setOpenConfirmationDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Mensaje de confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogContenText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleResponseConfirmation(false)}>Cancelar</Button>
          <Button onClick={()=>handleResponseConfirmation(true)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

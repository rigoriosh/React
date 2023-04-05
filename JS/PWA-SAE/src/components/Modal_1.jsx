import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const Modal_1 = ({open, closeModal, data}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    
    return (
        <div>
            
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={closeModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Detalle del proyecto"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* {JSON.stringify(data)} */}
                    </DialogContentText>
                    <div>
                        <p style={{margin:"0px"}}>id:{data.ID_PREDIO}</p>
                        <p style={{margin:"0px"}}>Proyecto:{data.proyecto}</p>
                        <p style={{margin:"0px"}}>ACOMPANANTE:{data.ACOMPANANTE}</p>
                        <p style={{margin:"0px"}}>DESCRIPCION:{data.DESCRIPCION}</p>
                        <p style={{margin:"0px"}}>OBSERVACIONES:{data.OBSERVACIONES}</p>
                        <p style={{margin:"0px"}}>FECHA_CAPTURA:{data.FECHA_CAPTURA}</p>
                        <p style={{margin:"0px"}}>FUNCIONARIO_SAE:{data.FUNCIONARIO_SAE}</p>
                        <p style={{margin:"0px"}}>FIRMA:{data.FIRMA}</p>
                    </div>
                </DialogContent>
                <DialogActions>
                {/* <Button autoFocus onClick={closeModal}>
                    Disagree
                </Button> */}
                <Button onClick={closeModal} autoFocus>
                    Regresar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

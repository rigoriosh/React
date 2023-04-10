import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Fab, TextField, Zoom } from '@mui/material';
import { StyledFab } from '../pages/home/HomePage';



export const Modal_1 = ({open, closeModal, data, geometriaSelected}) => {
    console.log(geometriaSelected);
    const {typeGeometry, id}=geometriaSelected
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
                <DialogTitle id="responsive-dialog-title" className='tituloBtnCenter titulo3' style={
                    {height:'20px', margin:'5px 5px 5px 5px', width:'auto', fontSize:'15px'}
                }>
                    {`Información geometría ${typeGeometry} id ${id}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* {JSON.stringify(data)} */}
                    </DialogContentText>
                    <div style={{fontSize:'20px', marginTop:'10px'}}>
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Id_predio:</span>{data.id}</p>
                        {/* <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Proyecto:</span>{data.proyecto}</p> */}
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Acompañante:</span>{data.ACOMPANANTE}</p>
                        {/* <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Descripción:</span>{data.DESCRIPCION}</p> */}
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Observaciones:</span>{data.OBSERVACIONES}</p>
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Funcionario:</span>{data.FUNCIONARIO}</p>
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Longitud:</span>{data.longitud}</p>
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Fecha:</span>{data.FECHA_CAPTURA}</p>
                        <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Firma:</span>{data.FIRMA}</p>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <StyledFab color="error" aria-label="add" onClick={closeModal} > 
                        <ArrowBackIcon />
                    </StyledFab>                 */}
                    
                    <Fab sx={{ position: 'absolute', bottom: 5, right: 5, }} aria-label={"back"} color={'primary'} onClick={closeModal}>
                        <ArrowBackIcon />
                    </Fab>
                </DialogActions>
            </Dialog>
        </div>
    )
}

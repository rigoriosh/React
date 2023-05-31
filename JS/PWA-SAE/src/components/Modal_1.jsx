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
import { tiposGeometrias } from '../helpers/constantes';



export const Modal_1 = ({open, closeModal, geometriaSelected}) => {
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
                        {
                            geometriaSelected.id &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Id_predio:</span>{geometriaSelected.id}</p>
                        }
                        {/* <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Proyecto:</span>{geometriaSelected.proyecto}</p> */}
                        {
                            geometriaSelected.acompaniante &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Acompañante:</span>{geometriaSelected.acompaniante}</p>
                        }
                        {
                            geometriaSelected.descripcion &&
                                <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Descripción:</span>{geometriaSelected.descripcion}</p>
                        }
                        {
                            geometriaSelected.observaciones &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Observaciones:</span>{geometriaSelected.observaciones}</p>
                        }
                        {
                            geometriaSelected.funcionario &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Funcionario:</span>{geometriaSelected.funcionario}</p>
                        }
                        {
                            (geometriaSelected.typeGeometry == tiposGeometrias.Linea||geometriaSelected.typeGeometry == "Linea") &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Longitud:</span>{geometriaSelected.longitud}</p>
                        }
                        {
                            (geometriaSelected.fecha_captura || geometriaSelected.fechaCreacion) &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Fecha:</span>{new Date(geometriaSelected.fecha_captura?geometriaSelected.fecha_captura:geometriaSelected.fechaCreacion).toLocaleDateString()}</p>
                        }
                        {
                            geometriaSelected.firma &&
                            <p style={{margin:"0px"}}><span style={{fontWeight:'bold', marginRight:'5px'}}>Firma:</span>{geometriaSelected.firma}</p>
                        }
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

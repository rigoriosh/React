import React from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const DialogMsgOk = ({openDialog, setOpenDialog}) => {
    const navigate = useNavigate();
    return (
        <Dialog
                open={openDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDialog({...openDialog, open:false})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{openDialog.tittle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>{openDialog.msg}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        openDialog.tipo === "OK"
                        ? <button onClick={()=>{
                            setOpenDialog({...openDialog, open:false});
                            navigate("/");
                        }} className='btnAceptar'>OK</button>
                        : openDialog.tipo === "SI/NO"
                        ? <div>
                            <button onClick={()=>{
                                setOpenDialog({...openDialog, response:true,  open:false});
                                navigate("/");
                            }} className='btnAceptar'>SI</button>
                            <button onClick={()=>{
                                setOpenDialog({...openDialog, response:false,  open:false});
                            }} className='btnAceptar'>NO</button>
                        </div>
                        : <div><p>Nothing</p></div>
                    }
                    
                </DialogActions>
            </Dialog>
    )
}

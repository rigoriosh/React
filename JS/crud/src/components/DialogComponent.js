import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogComponent = ({dialog, setDialog}) => {
    //console.log({dialog})
    const {open, title, dialogContentText} = dialog;

    const handleClose = (info) => {        
        setDialog({...dialog, open:false, agree: info});
      };
    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={()=>{handleClose('')}} aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description" >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"> {dialogContentText} </DialogContentText>
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

DialogComponent.propTypes = {
    dialog: PropTypes.object.isRequired,
    setDialog: PropTypes.func.isRequired
}

export default DialogComponent

import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import '../css/moduloAdministracion.css'
/* import MenuNavBar from '../components/MenuNavBar'
import Breadcrumb from '../components/Breadcrumb'
import SnackbarComponent from "../components/Snackbar";
import MenuDrawer from '../components/MenuDrawer'
import DialogComponent from "../components/DialogComponent";
import { tiposParametrosSis } from '../constantes/constantesParametrosDelSistema'
import ParametrosDelSistema from './ParametrosDelSistema'
import AdminValoresTipo from './valoresTipos/AdminValoresTipo'
import DesbloquearLiberaciones from './DesbloquearLiberaciones'
import Permisos from './Permisos'
import Roles from './Roles' */

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

const ModuloAdministracion = props => {
    console.log("ModuloAdministracion");
    /* ****** * parametros menuDrawer *****************/
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
      };
    /* ****** * end parametros menuDrawer *************/
    //const optsMenuDrawer = tiposParametrosSis.optsMenuDrawer;    
    
    const [mensajes, setMensajes] = useState({open:false, severity:'success', mensaje:''});
    const [dialog, setDialog] = useState({open: false, title: '', dialogContentText:'', agree: false, parametroAeliminar:{}});
    //const [optMenuSeleccionado, setOptMenuSeleccionado] = useState(optsMenuDrawer[1]); //maneja la vista inicial al desplegar el modulo administración
    //console.log(optMenuSeleccionado)
    return (
        <div className="ModuloAdministracion ">
            {/* <MenuNavBar /> */}
            
            {/* <div className="menu2Admin">
                <div className="btn-menu">
                    <MenuDrawer optSelected={setOptMenuSeleccionado} />
                </div>
                <div className="menu2Admin-breadcrumb">
                    <Breadcrumb />
                </div>
            </div> */}
            {/* <h3 className="no-margen-inferior animate__animated animate__bounce"> {`Administración ${optMenuSeleccionado}`} </h3> */}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
            >
                <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </div>
                
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                
                
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* {
                    optMenuSeleccionado === optsMenuDrawer[0] && <ParametrosDelSistema setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                }
                {
                    (optMenuSeleccionado === optsMenuDrawer[1] || optMenuSeleccionado === optsMenuDrawer[5]) && 
                    <AdminValoresTipo setMensajes={setMensajes} dialog={dialog} setDialog={setDialog} optMenuSeleccionado={optMenuSeleccionado} setOptMenuSeleccionado={setOptMenuSeleccionado}/>
                }
                {
                    optMenuSeleccionado === optsMenuDrawer[2] && <DesbloquearLiberaciones setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                }
                {
                    optMenuSeleccionado === optsMenuDrawer[3] && <Permisos setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                }
                {
                    optMenuSeleccionado === optsMenuDrawer[4] && <Roles setMensajes={setMensajes} dialog={dialog} setDialog={setDialog}/>
                } */}  
            </main>

            {/* <SnackbarComponent mensajes={mensajes} setMensajes={setMensajes}/>
            <DialogComponent dialog={dialog} setDialog={setDialog}/>    */}                               
        </div>
    )
}

ModuloAdministracion.propTypes = {

}

export default ModuloAdministracion

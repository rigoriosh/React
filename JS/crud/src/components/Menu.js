import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles} from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import LabelIcon from '@material-ui/icons/Label';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import clsx from 'clsx';

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    administracion: {
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
      width: theme.spacing(5) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(3) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
     /*  ...theme.mixins.toolbar, */
    },
    content: {
      /* flexGrow: 1, */
      padding: theme.spacing(3),
    },
  }));

const Menu = ({optsMenuDrawer, setOptMenuSeleccionado}) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();    
    
    
    const handleDrawerClose = () => {
        setOpen(!open);        
      };

    return (
        <Drawer
            onClick={()=>{setOpen(!open)}}
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
                {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            {
                open &&
                <List>
                    {optsMenuDrawer.map((opt, index) => (
                        <ListItem button key={opt.nombre}>
                            <ListItemIcon>{<LabelIcon onClick={()=>{setOpen(!open)}}/>}</ListItemIcon>
                            
                            <ListItemText primary={opt.nombre} onClick={()=>{setOptMenuSeleccionado(opt.nombre)}}/>
                        </ListItem>
                    ))}
                </List>
                }                   
        </Drawer>
    )
}

Menu.propTypes = {
    optsMenuDrawer: PropTypes.array.isRequired,
    setOptMenuSeleccionado: PropTypes.func.isRequired
}

export default Menu

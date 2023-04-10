import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../App';
import { menu } from '../../helpers/constantes';

export const NavListDrawer = () => {
    const { store, setStore, salir } = useContext(StoreContext);
    const changeMenu = (option) => {
        setStore({...store, menuSelected:option, subMenuSelected:'', openBackop:true})
    }
    
    return (
        <Box sx={{width:'100%', bgcolor: "whitesmoke"}}>
            <nav>
                <List style={{width:'100%'}}>
                    <ListItem disablePadding onClick={()=>changeMenu(menu.ListarProyectos)}>
                        <ListItemButton divider style={{justifyContent:"space-between"}}>
                            <FormatListNumberedIcon/>
                            <ListItemText primary="Listar Proyectos" style={{marginLeft:'15px'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={()=>changeMenu(menu.CrearProyecto)}>
                        <ListItemButton divider>
                            <AddCircleOutlineIcon/>
                            <ListItemText primary="Crear Proyecto" style={{marginLeft:'15px'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={()=>salir()}>
                        <ListItemButton divider>
                            <LogoutIcon/>
                            <ListItemText primary="Salir" style={{marginLeft:'15px'}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}

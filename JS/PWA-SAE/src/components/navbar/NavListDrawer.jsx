import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../App';
import { menu } from '../../helpers/constantes';

export const NavListDrawer = () => {
    const { store, setStore } = useContext(StoreContext);
    const changeMenu = (option) => {
        setStore({...store, menuSelected:option, openBackop:true})
    }
  return (
    <Box sx={{width:250, bgcolor: "whitesmoke"}}>
        <nav>
            <List>
                <ListItem disablePadding onClick={()=>changeMenu(menu.ListarProyectos)}>
                    <ListItemButton>
                        <InboxIcon/>
                        <ListItemText primary="Listar Proyectos"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={()=>changeMenu(menu.CrearProyecto)}>
                    <ListItemButton>
                        <InboxIcon/>
                        <ListItemText primary="Crear Proyecto"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    </Box>
  )
}

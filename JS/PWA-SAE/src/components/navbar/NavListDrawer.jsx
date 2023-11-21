import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import BungalowIcon from '@mui/icons-material/Bungalow';
import HelpIcon from '@mui/icons-material/Help';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../App';
import { menu } from '../../helpers/constantes';
import Pdf from '../../assets/documents/Geoportal_SAE_I_MUV_AppMovil_1.0_23112023.pdf';


export const NavListDrawer = () => {
    const { store, setStore, salir } = useContext(StoreContext);
    const changeMenu = (option) => {
        console.log("changeMenu => ", option);
        if(option === menu[menu.length-1].nameMenu){
            salir();
        }else if(option === menu[menu.length-2].nameMenu){
            return (
                <div>
                    <iframe src="../../../public/documents/" width="100%" height="500px" />
                </div>
                )
        }else{
            setStore({...store, menuSelected:option, subMenuSelected:'', openBackop:true})
        }
    }

    const getIcon = (icon) => {
        if (icon === menu[0].icon ) {
            return (<FormatListNumberedIcon/>);
        } else if (icon === menu[1].icon ) {
            return (<AddCircleOutlineIcon/>);
        } else if (icon === menu[2].icon ) {
            return (<BungalowIcon/>);
        } else if (icon === menu[3].icon ) {
            return (<div>
                    <HelpIcon/>
                    
                </div>);
        } else if (icon === menu[4].icon ) {
            return (<LogoutIcon/>);
        }
        
    }

    /* const PDFViewer = () => {
        return (
        <div>
        <iframe src=”path_to_pdf_file.pdf” width=”100%” height=”500px” />
        </div>
        );
       }; */
    
    return (
        <Box sx={{width:'100%', bgcolor: "whitesmoke"}}>
            <nav>
                <List style={{width:'100%'}}>
                    {/* {
                        navigator.onLine &&
                        <ListItem disablePadding onClick={()=>changeMenu(menu.ListarProyectos)}>
                            <ListItemButton divider style={{justifyContent:"space-between"}}>
                                <FormatListNumberedIcon/>
                                <ListItemText primary="Listar Proyectos" style={{marginLeft:'15px'}}/>
                            </ListItemButton>
                        </ListItem>
                    }
                    <ListItem disablePadding onClick={()=>changeMenu(menu.CrearProyecto)}>
                        <ListItemButton divider>
                            <AddCircleOutlineIcon/>
                            <ListItemText primary="Crear Proyecto" style={{marginLeft:'15px'}}/>
                        </ListItemButton>
                    </ListItem> */}
                    {/* <ListItem disablePadding onClick={()=>salir()}>
                        <ListItemButton divider>
                            <LogoutIcon/>
                            <ListItemText primary="Salir" style={{marginLeft:'15px'}}/>
                        </ListItemButton>
                    </ListItem> */}
                    {
                        menu.map( (e) => {
                            
                            return (
                                <ListItem key={e.nameMenu} disablePadding onClick={()=>changeMenu(e.nameMenu)}>
                                    {
                                        e.nameMenu == menu[menu.length - 2].nameMenu
                                        ?
                                            <a href = {Pdf} target = "_blank" style={{"display": "flex", "textDecorationLine": "initial", "color": "black", "width": "100%"}}>
                                                <ListItemButton divider style={{justifyContent:"space-between"}} >
                                                        {   getIcon(e.icon) }
                                                        <ListItemText primary={e.nameMenu} style={{marginLeft:'15px'}}/>
                                                </ListItemButton>
                                            </a>
                                        :
                                        <ListItemButton divider style={{justifyContent:"space-between"}} >
                                            {getIcon(e.icon)}
                                            <ListItemText primary={e.nameMenu} style={{marginLeft:'15px'}}/>                                           
                                        </ListItemButton>
                                    }                                       
                                </ListItem>
                            )
                        })

                    }                    
                    
                </List>
            </nav>
        </Box>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { NavListDrawer } from './NavListDrawer'
import { AppBar, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { StoreContext } from '../../App';
import { menu } from '../../helpers/constantes';

export const Navbar = () => {
  const { store, setStore } = useContext(StoreContext);
  const {menuSelected} = store;
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    
    if (menuSelected != menu.Home) {
      setOpenMenu(false)
    }
  
    return () => {}
  }, [menuSelected])
  
  
  return (
    <>
        <AppBar position="static" color='transparent'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=>setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:'center', fontSize:'17px', color:'white' }}>
              Sistema de captura de geometrías
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        <Drawer open={openMenu} anchor='top'  onClose={()=>setOpenMenu(false)}
          variant='temporary'
        >
            <NavListDrawer/>
        </Drawer>
    </>
  )
}

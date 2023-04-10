import { Container, Fab, styled } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StoreContext } from '../../App';
import { ListarProyectos } from '../listProjec/ListarProyectos';
import { CrearProyecto } from '../creatProject/CrearProyecto';
import { menu } from '../../helpers/constantes';


export const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 10,
  left: 0,
  right: 10,
  margin: '0 auto',
});

export const HomePage = () => {

  const { store, setStore } = useContext(StoreContext);
  const {menuSelected, subMenuSelected}=store;
  // alert("Seguir configurando el menu")

  useEffect(() => {
    console.log("HomePage");
    setStore({...store, openBackop: false});  
    return () => {}
  }, [])
  
  return (
    <Container sx={{mt:0, ml:0, p:0/* , backgroundColor:'red' */, /* height:'100%' */}}>
        <Navbar/>
        {
          menuSelected == menu.ListarProyectos
          ? <ListarProyectos/> 
          : menuSelected == menu.CrearProyecto
          ? <CrearProyecto/>
          : <Container sx={{mt:0, ml:1, p:0}}>
            <h2>HOME</h2>
            <p>Sistema de captura de coordenadas</p>
          </Container> //Home
        }
        {
          (subMenuSelected == "" && (menuSelected == menu.CrearProyecto || menuSelected == menu.ListarProyectos)) &&
          <StyledFab color="default" aria-label="add" 
            onClick={()=>setStore({...store, menuSelected: menu.Home, subMenuSelected:""})}
          >
            <HomeIcon />
          </StyledFab>
        }
        {
          (subMenuSelected != "" && (menuSelected == menu.CrearProyecto || menuSelected == menu.ListarProyectos)) &&
          <StyledFab color="warning" aria-label="add" 
            onClick={()=>setStore({...store, subMenuSelected:""})}
          >
            <ArrowBackIcon />
          </StyledFab>
        }
    </Container>
  )
}

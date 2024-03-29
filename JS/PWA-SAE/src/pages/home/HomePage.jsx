import { Container, Fab, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StoreContext } from '../../App';
import { ListarProyectos } from '../listProjec/ListarProyectos';
import { CrearProyecto } from '../creatProject/CrearProyecto';
import { menu, tiposGeometrias } from '../../helpers/constantes';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenSincronize } from '../../components/DialogContenSincronize';
import { useSnackbar } from 'notistack';
import enviroment from '../../helpers/enviroment';
import { insertProjecGeometry } from '../../api/apis';
import { agregarIdProyectoPunLinPol, formarJsonToPersistir, traer_idProyecto } from '../../helpers/utils';


export const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 10,
  left: 0,
  right: 10,
  margin: '0 auto',
});

export const HomePage = () => {

  const { store, setStore, catchGeometries, login } = useContext(StoreContext);
  const {menuSelected, subMenuSelected}=store;
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleResponseConfirmationBackUp = async(response)=>{
    setOpenConfirmationDialog(false);
    
        if (response) {
            //TODO: send data to server
            setStore({...store, openBackop:true})
            const dbLocal = JSON.parse(localStorage.getItem("dbLocal"));
            dbLocal.forEach(async(dataToSend) => {
              debugger
              await insertProjecGeometry(JSON.stringify(dataToSend), enviroment.create);
            });
            const variant = "info" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Datos sincronizados correctamente',{variant});
            setStore({...store, openBackop:false});
            localStorage.clear();    
        }else{
            localStorage.clear();
        }
    }
  const handleResponseConfirmation = async(response)=>{
    setOpenConfirmationDialog(false);
    
    if (response) {
        //TODO: send data to server
        setStore({...store, openBackop:true})
        const dbLocal = JSON.parse(localStorage.getItem("dbLocal"));
        dbLocal.forEach(async({nomProject, puntos, lineas, poligonos}) => {
          debugger
          const ID_PROYECT = await traer_idProyecto(nomProject, login);
          if (ID_PROYECT) {
              const {fixPuntos, fixLineas, fixPoligonos} = agregarIdProyectoPunLinPol(ID_PROYECT, puntos, lineas, poligonos);
              await formarJsonToPersistir(fixPuntos, fixLineas, fixPoligonos);
          } else {
            msgFalloCOmunicacion();
          }
          // await insertProjecGeometry(JSON.stringify(dataToSend), enviroment.create);
        });
        const variant = "info" // variant could be success, error, warning, info, or default
        enqueueSnackbar('Datos sincronizados correctamente',{variant});
        setStore({...store, openBackop:false});
        localStorage.clear();    
    }else{
        localStorage.clear();
    }
  }
  
  const msgFalloCOmunicacion = () => {
    const variant = "warning" // variant could be success, error, warning, info, or default
    setStore({...store, openBackop:false})
    enqueueSnackbar('Problemas con la comunicación, porfavor intentalo mas tarde',{variant});
  }

  useEffect(() => {
    console.log("HomePage");
    setStore({...store, openBackop: false});  
    if (navigator.onLine) {
      if (localStorage.getItem("dbLocal")) {
          console.log("data pendiente por sincronizar");
          setOpenConfirmationDialog(true);
      }
      
    }
    return () => {}
  }, [])
  
  return (
    <Container sx={{mt:0, ml:0, p:0/* , backgroundColor:'red' */, /* height:'100%' */}}>
        <Navbar/>
        {
          menuSelected == menu[0].nameMenu
          ? <ListarProyectos/> 
          : menuSelected == menu[1].nameMenu
          ? <CrearProyecto/>
          : <Container sx={{mt:0, ml:1, p:0}}>
              <h2>INICIO</h2>
              <p>Sistema de captura de coordenadas</p>
            </Container> //Home
        }
        {
          (subMenuSelected == "" && (menuSelected == menu[1].nameMenu || menuSelected == menu[0].nameMenu)) &&
          <StyledFab color="default" aria-label="add" 
            onClick={()=>setStore({...store, menuSelected: menu.Home, subMenuSelected:""})}
          >
            <HomeIcon />
          </StyledFab>
        }
        {
          (subMenuSelected != "" && !catchGeometries && (menuSelected == menu[1].nameMenu || menuSelected == menu[0].nameMenu) || subMenuSelected === tiposGeometrias.Punto) &&
          <StyledFab color="warning" aria-label="add" 
            onClick={()=>setStore({...store, subMenuSelected:""})}
          >
            <ArrowBackIcon />
          </StyledFab>
        }
        <ConfirmationDialog
            title='Atención'
            openConfirmationDialog={openConfirmationDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
            handleResponseConfirmation={handleResponseConfirmation}
            dialogContenText={<DialogContenSincronize />}
        />
    </Container>
  )
}

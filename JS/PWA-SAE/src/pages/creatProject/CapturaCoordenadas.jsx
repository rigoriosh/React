import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';
import Punto from '../../assets/btnsIcons/Punto.png'
import Line from '../../assets/btnsIcons/Linea.png'
import Polygon from '../../assets/btnsIcons/Poligono.png'
import { useSnackbar } from 'notistack';

const initForm = {
  id:'',
  ACOMPANANTE:'',
  OBSERVACIONES:'',
  DESCRIPCION:'',
  FECHA_CAPTURA:'',
  FUNCIONARIO:'',
  FIRMA:'',
  latitud:'',
  longitud:'',
}
const initFormPolygon = {
  id:'',
  ACOMPANANTE:'',
  OBSERVACIONES:'',
  DESCRIPCION:'',
  FECHA_CAPTURA:'',
  FUNCIONARIO:'',
  FIRMA:'',
  id_inicio:'',
  id_final:''  
}
export const CapturaCoordenadas = ({geometriesCreated, setGeometriesCreated, typeGeometry}) => {
  const { store, setStore } = useContext(StoreContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formulario, setFormulario] = useState(typeGeometry==tiposGeometrias.Poligono?initFormPolygon:initForm);
  const { id, ACOMPANANTE, OBSERVACIONES, DESCRIPCION, FUNCIONARIO, FIRMA, id_inicio, id_final, latitud, longitud } = formulario;
  const [catchGeometries, setCatchGeometries] = useState(false)
  const [startTracking, setStartTracking] = useState(false);

  const guardar = () => {
    console.log("guardar => ", formulario);
    const newGeometryCreated = {
      ...formulario,
      id: geometriesCreated.length.toString(),
      // id: generateUUID(),
      FECHA_CAPTURA:new Date().toLocaleDateString(),
      typeGeometry,
      longitud:"pendiente"
    }
    if (Object.keys(newGeometryCreated).filter(k => newGeometryCreated[k] == '').length>0) {
      const variant = "error" // variant could be success, error, warning, info, or default
      enqueueSnackbar('Recuerda todos los campos son obligatorios',{variant});
    } else {
      setGeometriesCreated([...geometriesCreated, newGeometryCreated])
      setStore({...store, subMenuSelected:""})
    }
  }
  const handleFields = ({target})=>{
    setFormulario({...formulario, [target.name]:target.value})
  }
  const limpiar = () => {
    console.log(formulario);
    setFormulario(initForm)
  }
  const capturarCoordenadas = () => {
    console.log("capturarCoordenadas => ", typeGeometry);
    if (typeGeometry == tiposGeometrias.Punto) {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(yesSuccess, noSuccess);
      }else{
        const variant = "info" // variant could be success, error, warning, info, or default
        enqueueSnackbar('Este dispositivo no cuenta con localizador',{variant});
      }
    } else {
      
    }
    setCatchGeometries(true)
    
  }

  const yesSuccess = (position)=>{
    const latitud = position.coords.latitude,
        longitud = position.coords.longitude;
    setFormulario({...formulario,latitud,longitud})
  }

  const noSuccess = (msg)=>{
    console.error(msg)
  }


  const iniciarRecorrido = (start) => {
    if (start) {
      console.log("iniciarRecorrido => ");
      setStartTracking(true)
    }else{
      console.log("terminarRecorrido => ");
      setStartTracking(false);
      setCatchGeometries(false)
    }
    
  }
  return (
    <Box
        component="form"
        sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {  },
        padding: '0px 10px 0px 10px',
        fontSize:'10px',
        // backgroundColor:'orangered',
        // justifyContent:'space-around',
        // height:'100%',
        gridTemplateColumns: { sm: '1fr 1fr' }, gap: 0.1,
        }}
        noValidate
        autoComplete="off"
    >
      {
        ((typeGeometry == tiposGeometrias.Linea || typeGeometry == tiposGeometrias.Poligono) 
        && catchGeometries)
        ?
          <>
            <h3>Mapa</h3>
            {
              !startTracking
              ?
                <Button variant="contained" size="small" onClick={()=>iniciarRecorrido(true)}>
                  {'Iniciar recorrido'}
                </Button>
              :
                <Button variant="contained" size="small" onClick={()=>iniciarRecorrido(false)}>
                  {'Terminar recorrido'}
                </Button>
            }
          </> 
        : 
          <>
            <div className='row labels1' /* style={{width:'100%', position:'absolute', top:'70px'}} */>
              {
                typeGeometry == tiposGeometrias.Punto &&
                  <>
                    <img src={Punto} alt={typeGeometry} style={{cursor:'pointer', width:'50px', alignSelf:'center'}} onClick={()=>controlVistas(typeGeometry)}/>
                    <p>Crear Punto</p>
                  </>
              }
              {
                typeGeometry == tiposGeometrias.Linea &&
                  <>
                    <img src={Line} alt="Punto" style={{cursor:'pointer', width:'50px', alignSelf:'center'}} onClick={()=>controlVistas(typeGeometry)}/>
                    <p>Crear Línea</p>
                  </>
              }
              {
                typeGeometry == tiposGeometrias.Poligono &&
                  <>
                    <img src={Polygon} alt="Punto" style={{cursor:'pointer', width:'50px', alignSelf:'center'}} onClick={()=>controlVistas(typeGeometry)}/>
                    <p>Crear Polígono</p>
                  </>
              }
            </div>
            
            <div>
              {
                typeGeometry == tiposGeometrias.Poligono &&
                <>
                  <TextField id="id_inicio" name='id_inicio' value={id_inicio} label="Id_inicio" variant="outlined" fullWidth size='small' margin='dense' 
                    onChange={handleFields}/>
                  <TextField id="id_final" name='id_final' value={id_final} label="Id_final" variant="outlined" fullWidth size='small' margin='dense' 
                    onChange={handleFields}/>
                </>
              }
              {/* <TextField id="id" name='id' value={id} label="Id_predio" color='success' variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/> */}
              <TextField id="ACOMPANANTE" name='ACOMPANANTE' value={ACOMPANANTE} label="Acompañante" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="OBSERVACIONES" name='OBSERVACIONES' value={OBSERVACIONES} label="Observaciones" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="DESCRIPCION" name='DESCRIPCION' value={DESCRIPCION} label="Descripción" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              {/* <TextField id="FECHA_CAPTURA" name='FECHA_CAPTURA' value={FECHA_CAPTURA} label="Fecha" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/> */}
              <TextField id="FUNCIONARIO" name='FUNCIONARIO' value={FUNCIONARIO} label="Funcionario" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="FIRMA" name='FIRMA' value={FIRMA} label="Firmas" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <div style={{display:'flex'}}>
                <TextField id="latitud" name='latitud' value={latitud} label="Latitud" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
                <TextField id="longitud" name='longitud' value={longitud} label="Longitud" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              </div>
            </div>

            <div className='tac' /* style={{width:'100%', position:'absolute', bottom:'80px'}} */>
              <Button variant="contained" size="small" onClick={capturarCoordenadas}>
                {
                  typeGeometry == tiposGeometrias.Punto
                  ? 'Capturar punto'
                  : typeGeometry == tiposGeometrias.Linea
                  ? 'Capturar línea'
                  : typeGeometry == tiposGeometrias.Poligono
                  ? 'Capturar polígono'
                  : 'Capturar otra geometría'
                }
                
              </Button>
              <div className='row ' style={{justifyContent:'space-between'}}>
              <Button variant="contained" size="small" onClick={guardar}>
                Guardar
              </Button>
              <Button variant="contained" size="small" onClick={limpiar}>
                Limpiar
              </Button>
              </div>
            </div>
          </>
      }
        
    </Box>
  )
}

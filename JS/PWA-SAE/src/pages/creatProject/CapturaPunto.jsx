import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';
import Punto from '../../assets/btnsIcons/Punto.png'
import { useSnackbar } from 'notistack';
import { generateUUID } from '../../helpers/utils';

const initForm = {
  id:'',
  ACOMPANANTE:'',
  OBSERVACIONES:'',
  DESCRIPCION:'',
  FECHA_CAPTURA:'',
  FUNCIONARIO:'',
  FIRMA:'',/* 
  typeGeometry:'',
  nameProject:'' */
}
export const CapturaPunto = ({geometriesCreated, setGeometriesCreated, typeGeometry}) => {
  const { store, setStore } = useContext(StoreContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formulario, setFormulario] = useState(initForm);
  const { id, ACOMPANANTE, OBSERVACIONES, DESCRIPCION, FUNCIONARIO, FIRMA } = formulario;

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
  const capturarPunto = () => {
    console.log("capturarPunto");
    
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
      <div className='row labels1' /* style={{width:'100%', position:'absolute', top:'70px'}} */>
        <img src={Punto} alt="Punto" style={{cursor:'pointer', width:'50px', alignSelf:'center'}} onClick={()=>controlVistas(tiposGeometrias.Punto)}/>
        <p>Crear Punto</p>
      </div>
      
      <div>
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
      </div>

      <div className='tac' /* style={{width:'100%', position:'absolute', bottom:'80px'}} */>
        <Button variant="contained" size="small" onClick={capturarPunto}>
          Capturar punto
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
        
    </Box>
  )
}

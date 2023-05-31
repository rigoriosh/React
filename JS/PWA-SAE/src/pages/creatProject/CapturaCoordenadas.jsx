import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';
import Punto from '../../assets/btnsIcons/Punto.png'
import Line from '../../assets/btnsIcons/Linea.png'
import Polygon from '../../assets/btnsIcons/Poligono.png'
import { useSnackbar } from 'notistack';
import { Map } from '../../components/map/Map';
import { calcularDistanciaEntreDosCoordenadas } from '../../helpers/utils';

const initForm = {
  id:'',
  acompaniante:'',
  id_punto:'',
  id_predio:'',
  observaciones:'',
  descripcion:'',
  fecha_captura:'',
  funcionario:'',
  firma:'',
  latitudPunto:'',
  longitudPunto:'',
}
/* const initFormPolygon = {
  id:'',
  acompaniante:'',
  id_punto:'',
  id_predio:'',
  observaciones:'',
  descripcion:'',
  FECHA_CAPTURA:'',
  funcionario:'',
  firma:'',
  id_inicio:'',
  id_final:'' ,
  puntoInicial:{latitud:'',longitud:''},
  puntoFinal:{latitud:'',longitud:''},
  poligon:[],
  latitudPunto:'',
  longitudPunto:'',
} */
const initFormLine = {
  id:'',
  acompaniante:'',
  id_punto:'',
  id_predio:'',
  observaciones:'',
  descripcion:'',
  fecha_captura:'',
  funcionario:'',
  firma:'',
  // id_inicio:'',
  // id_final:'' ,
  puntoInicial:{latitud:'',longitud:''},
  puntoFinal:{latitud:'',longitud:''},
  latitudPunto:'',
  longitudPunto:'',
}
let interval;
export const CapturaCoordenadas = ({geometriesCreated, setGeometriesCreated, typeGeometry}) => {
  const { store, setStore, catchGeometries, setCatchGeometries } = useContext(StoreContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formulario, setFormulario] = useState(
    typeGeometry==tiposGeometrias.Poligono ? {
      id:'',
      acompaniante:'',
      id_punto:'',
      id_predio:'',
      observaciones:'',
      descripcion:'',
      fecha_captura:'',
      funcionario:'',
      firma:'',
      id_inicio:'',
      id_final:'' ,
      puntoInicial:{latitud:'',longitud:''},
      puntoFinal:{latitud:'',longitud:''},
      poligon:[],
      latitudPunto:'',
      longitudPunto:'',
    } 
    : typeGeometry==tiposGeometrias.Linea ? initFormLine :initForm);
  const { id_punto, id_predio, acompaniante, observaciones, descripcion, funcionario, firma, id_inicio, id_final, latitudPunto,longitudPunto } = formulario;
  // const [catchGeometries, setCatchGeometries] = useState(false)
  const [startTracking, setStartTracking] = useState("");
  // const [catchPoligon, setCatchPoligon] = useState([]);

  const guardar = () => {
    console.log("guardar => ", formulario);
    let calculoLongitud = 0;
    if (typeGeometry == tiposGeometrias.Linea) {
      calculoLongitud = calcularDistanciaEntreDosCoordenadas(
        formulario.puntoInicial.latitud, formulario.puntoInicial.longitud,
        formulario.puntoFinal.latitud,formulario.puntoFinal.longitud
      )
    }
    const newGeometryCreated = {
      ...formulario,
      id: geometriesCreated.length.toString(),
      // id: generateUUID(),
      fecha_captura:new Date().toLocaleDateString(),
      typeGeometry,
      area_m2: 1, //pendiente por determinar forma de calcular
      longitud:calculoLongitud //logitud de la linea
    }
    if (Object.keys(newGeometryCreated).filter(k => (newGeometryCreated[k] == '' && newGeometryCreated[k] != 0)).length) {
      const variant = "error" // variant could be success, error, warning, info, or default
      enqueueSnackbar('Recuerda todos los campos son obligatorios',{variant});
    } else {
      setGeometriesCreated([...geometriesCreated, newGeometryCreated]) // guarda en el array temporal antes de ser enviado al back con las demas geometrias
      setStore({...store, subMenuSelected:""}) // regresa a la vista anterior "Crear proyecto"
      setFormulario({})
      setCatchGeometries(false);
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
    // setFormulario({...formulario, puntoInicial:{latitud:'',longitud:''}, puntoFinal:{latitud:'',longitud:''}});
    setStartTracking("")
    getMyCurrentPosition();
    
  }

  const getMyCurrentPosition = (start) =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((e)=>yesSuccess(e, start), noSuccess);
    }else{
      const variant = "info" // variant could be success, error, warning, info, or default
      enqueueSnackbar('Este dispositivo no cuenta con localizador',{variant});
    }
  }

  const yesSuccess = (position, start)=>{
    console.log("position => ", position);
    const latitud = position.coords.latitude,
          longitud = position.coords.longitude;
    if (start == "startTracking") {
      if (formulario.puntoInicial.latitud == '') {
        setFormulario({...formulario, puntoInicial:{latitud,longitud}});        
      }
      if (typeGeometry==tiposGeometrias.Poligono) {
        getContinusTraking();
      }
    } else if (start == "endTracking") {
      setFormulario({...formulario, puntoFinal:{latitud,longitud}})  
      // setFormulario({...formulario, puntoFinal:{latitud:latitud+0.009,longitud}})  
    } else {
      setFormulario({...formulario,latitudPunto:latitud,longitudPunto:longitud})
    }
          
    setCatchGeometries(true)

  }

  const callbackTraking = (position) => {
    console.log(position);
    // setCatchPoligon([...catchPoligon,[position.coords.latitude+Math.random(),position.coords.longitude]])
    debugger
    let a = formulario.poligon;
    a.push([position.coords.latitude,position.coords.longitude]);
    console.log("a=>",a);
    setFormulario({...formulario,poligon:a})

  }

  const getContinusTraking = ()=>{
    interval = setInterval(() => {
      console.log("tracking...", formulario);
      navigator.geolocation.getCurrentPosition(callbackTraking, noSuccess);
    }, 5000);
  }

  const noSuccess = (msg)=>{
    console.error(msg)
  }

  const iniciarRecorrido = (start) => {
    if (start == "startTracking") {
      console.log("iniciarRecorrido => ", typeGeometry);
      getMyCurrentPosition(start)
    }else if(start == "endTracking"){
      console.log("terminarRecorrido => ", typeGeometry);
      getMyCurrentPosition(start)
      clearInterval(interval)
    }else{
      setCatchGeometries(false)
    }
    setStartTracking(start)
    /* setTimeout(() => {
    }, 4000); */
    
  }
  useEffect(() => {
    console.log("CapturaCoordenadas");
    console.log(formulario);
    setFormulario(
      typeGeometry==tiposGeometrias.Poligono ? {
        id:'',
        acompaniante:'',
        id_punto:'',
        id_predio:'',
        observaciones:'',
        descripcion:'',
        fecha_captura:'',
        funcionario:'',
        firma:'',
        id_inicio:'',
        id_final:'' ,
        puntoInicial:{latitud:'',longitud:''},
        puntoFinal:{latitud:'',longitud:''},
        poligon:[],
        latitudPunto:'',
        longitudPunto:'',
      } 
      : typeGeometry==tiposGeometrias.Linea ? initFormLine :initForm)
    return () => {}
  }, [])
  
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
            <Map currentLocation={{latitudPunto,longitudPunto}} startTracking={startTracking}
              typeGeometry={typeGeometry} formulario={formulario}/>
            {
              startTracking==""
              ?
                <Button variant="contained" size="small" onClick={()=>iniciarRecorrido("startTracking")}>
                  {'Iniciar recorrido'}
                </Button>
              : startTracking=="startTracking"
                ?
                  <Button variant="contained" size="small" onClick={()=>iniciarRecorrido("endTracking")}>
                    {'Terminar recorrido'}
                  </Button>
                :
                  <Button variant="contained" size="small" onClick={()=>iniciarRecorrido("RegresarForm")}>
                    {'Regresar'}
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
                <div style={{display:'flex'}}>
                  <TextField id="id_inicio" name='id_inicio' value={id_inicio} label="Id_inicio" variant="outlined" fullWidth size='small' margin='dense' 
                    onChange={handleFields}/>
                  <TextField id="id_final" name='id_final' value={id_final} label="Id_final" variant="outlined" fullWidth size='small' margin='dense' 
                    onChange={handleFields}/>
                </div>
              }              
              <TextField id="id_punto" name='id_punto' value={id_punto} label="Id Punto" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="id_predio" name='id_predio' value={id_predio} label="Id Predio" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="acompaniante" name='acompaniante' value={acompaniante} label="Acompañante" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="observaciones" name='observaciones' value={observaciones} label="Observaciones" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="descripcion" name='descripcion' value={descripcion} label="Descripción" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              {/* <TextField id="FECHA_CAPTURA" name='FECHA_CAPTURA' value={FECHA_CAPTURA} label="Fecha" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/> */}
              <TextField id="funcionario" name='funcionario' value={funcionario} label="Funcionario" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              <TextField id="firma" name='firma' value={firma} label="Firmas" variant="outlined" fullWidth size='small' margin='dense' 
                onChange={handleFields}/>
              {
                typeGeometry == tiposGeometrias.Punto &&
                <div style={{display:'flex'}}>
                  <TextField id="latitudPunto" name='latitudPunto' value={latitudPunto} label="Latitud" variant="outlined" fullWidth size='small' margin='dense' 
                  onChange={handleFields}/>
                  <TextField id="longitudPunto" name='longitudPunto' value={longitudPunto} label="Longitud" variant="outlined" fullWidth size='small' margin='dense' 
                  onChange={handleFields}/>
                </div>
              }
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

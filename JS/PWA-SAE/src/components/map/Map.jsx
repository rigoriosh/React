import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Circle, CircleMarker, MapContainer, Marker, Polygon, Polyline, Popup, Rectangle, TileLayer, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { tiposGeometrias } from '../../helpers/constantes'

  const polyline = [
    [1.027427, -76.6150912],
    [1.028, -76.6],
    [1.028, -76.8],
  ]
  
  const multiPolyline = [
    [
      [1.029, -76.6],
      [1.029, -76.8],
      [1.0292, -76.8],
    ],
    [
      [1.029, -76],
      [1.029, -0.06],
      [1.0292, -0.06],
    ],
  ]
  
  const polygon = [
    [1.0285, -0.09],
    [1.0292, -76.6],
    [1.0292, -76.8],
  ]
  
  const multiPolygon = [
    [
      [1.028, -76.8],
      [1.028, -0.13],
      [1.0293, -0.13],
    ],
    [
      [1.028, -76],
      [1.028, -0.07],
      [1.0293, -0.07],
    ],
  ]
  
  const rectangle = [
    [1.029, -76.6151],
    [1.030, -76.6151],
  ]
  
  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

export const Map = ({currentLocation, startTracking, typeGeometry, formulario}) => {
    /* const [state, setState] = useState({
      initTraking:startTracking,
      endTraking:false,
    }) */
    const [center, setCenter] = useState([currentLocation.latitudPunto, currentLocation.longitudPunto])
    console.log({center});
    const {latitud:latIni, longitud:longIni}=formulario.puntoInicial;
    const {latitud:latFin, longitud:longFin}=formulario.puntoFinal;
    const {poligon}=formulario;
    
    function MyComponent() {
      const map = useMap()
      console.log('map center:', map.getCenter())
      console.log(map);
      return (
        <h1>ddsf</h1>
      )
    }

    useEffect(() => {
      console.log(currentLocation);
      return () => {}
    }, [])
    
  return (
    <div style={{height:'75vh', backgroundColor:'aqua'}}>
        {/* <Button>+</Button> */}
        <MapContainer center={center} zoom={14} scrollWheelZoom={false}>
          <MyComponent />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              (startTracking=="startTracking"||startTracking=="endTracking") &&
              <>
                {/* <Marker position={[latIni,longIni]}>
                    <Popup>Punto de inicio</Popup>
                </Marker> */}
                  <CircleMarker center={[latIni,longIni]} pathOptions={{ color: 'blue' }} radius={5}>
                    <Popup>Punto de inicio</Popup>
                  </CircleMarker>

              </>
            }
            {
              
              startTracking=="endTracking" &&
              <>
                {/* <Marker position={[latFin,longFin]}>
                    <Popup>Punto final</Popup>
                </Marker> */}
                <CircleMarker center={[latFin,longFin]} pathOptions={{ color: 'blue' }} radius={5}>
                    <Popup>Punto final</Popup>
                </CircleMarker>
                {
                  typeGeometry==tiposGeometrias.Linea &&
                  <Polyline pathOptions={{ color: 'black' }} positions={[[latIni,longIni],[latFin,longFin]]} />
                }
                {
                  typeGeometry==tiposGeometrias.Poligono &&
                  <Polygon pathOptions={{color:'purple'}} positions={poligon} />
                }

              </>
            }
            

            {/* 
            <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
            <CircleMarker center={center} pathOptions={redOptions} radius={110}>
                <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
            <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                permanent Tooltip for Rectangle
              </Tooltip>
            </Rectangle> */}
        </MapContainer>
    </div>
  )
}

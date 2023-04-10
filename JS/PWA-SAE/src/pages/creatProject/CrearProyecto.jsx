import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../App';
import { menu, tiposGeometrias } from '../../helpers/constantes';
import { FormCrearGeom } from './FormCrearGeom';
import { CapturaPunto } from './CapturaPunto';
import { CapturaLinea } from './CapturaLinea';
import { CapturaPoligono } from './CapturaPoligono';
import { CapturaCoordenadas } from './CapturaCoordenadas';

export const CrearProyecto = () => {
  const { store, setStore } = useContext(StoreContext);
  const {menuSelected, subMenuSelected}=store;
  const [geometriesCreated, setGeometriesCreated] = useState([]);
  const [typeGeometry, setTypeGeometrySelected] = useState("")
  const [nomProject, setNomProject] = useState("")  



  useEffect(() => {
    console.log("CrearProyecto", subMenuSelected);
    setStore({...store, openBackop:false})
    return () => {}
  }, [])
  
  return (
    <>
    {
        subMenuSelected == ""
        ? <FormCrearGeom geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}
            nomProject={nomProject} setNomProject={setNomProject}
            typeGeometry={typeGeometry} setTypeGeometrySelected={setTypeGeometrySelected}
          />
        : <CapturaCoordenadas geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}
            typeGeometry={typeGeometry}
          />
      }
      {/* {
        subMenuSelected == ""
        ? <FormCrearGeom geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}
            nomProject={nomProject} setNomProject={setNomProject}
            typeGeometry={typeGeometry} setTypeGeometrySelected={setTypeGeometrySelected}
          />
        :subMenuSelected == tiposGeometrias.Punto
        ? <CapturaPunto geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}
            typeGeometry={typeGeometry}
          />
        :subMenuSelected == tiposGeometrias.Linea
        ? <CapturaLinea geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}/>
        : <CapturaPoligono geometriesCreated={geometriesCreated} setGeometriesCreated={setGeometriesCreated}/>
      } */}
      
    </>
  )
}

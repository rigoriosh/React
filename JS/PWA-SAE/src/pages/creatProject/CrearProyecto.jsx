import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../App';
import { FormCrearGeom } from './FormCrearGeom';
import { CapturaCoordenadas } from './CapturaCoordenadas';

export const CrearProyecto = () => {
  const { store, setStore } = useContext(StoreContext);
  const {subMenuSelected}=store;
  const [geometriesCreated, setGeometriesCreated] = useState([]);
  const [typeGeometry, setTypeGeometrySelected] = useState("")
  const [nomProject, setNomProject] = useState("")  

  /* useEffect(() => {
    if (subMenuSelected) {
      console.log("subMenuSelected => ", subMenuSelected);
      setGeometriesCreated([])
    }
    return () => {}
  }, [subMenuSelected]) */
  


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

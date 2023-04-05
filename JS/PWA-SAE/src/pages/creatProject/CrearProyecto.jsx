import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../App';
import { Box, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { TabsPanel } from '../../components/TabsPanel';
import { menu, tiposGeometrias } from '../../helpers/constantes';
import { FormCrearGeom } from './FormCrearGeom';
import { CapturaPunto } from './CapturaPunto';
import { CapturaLinea } from './CapturaLinea';
import { CapturaPoligono } from './CapturaPoligono';

export const CrearProyecto = () => {
  const { store, setStore } = useContext(StoreContext);
  const {menuSelected, subMenuSelected}=store;
  console.log("store => ", store);

  const changeView = (subMenu) => {
    console.log("subMenu => ", subMenu);
    setStore({...store, menu:{...menu, subMenuSelected:subMenu}})
  }


  useEffect(() => {
    console.log("CrearProyecto", subMenuSelected);
    setStore({...store, openBackop:false})
    return () => {}
  }, [])
  
  return (
    <>
      {
        subMenuSelected == ""
        ? <FormCrearGeom /* changeView={changeView} *//>
        :subMenuSelected == tiposGeometrias.Punto
        ? <CapturaPunto /* changeView={changeView} *//>
        :subMenuSelected == tiposGeometrias.Linea
        ? <CapturaLinea /* changeView={changeView} *//>
        : <CapturaPoligono /* changeView={changeView} *//>
      }
      
    </>
  )
}

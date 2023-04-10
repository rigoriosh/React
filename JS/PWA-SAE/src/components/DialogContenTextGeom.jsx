import React from 'react'

export const DialogContenTextGeom = ({geometriaSelected}) => {
  return (
    <>
        <span style={{fontWeight:'bold', textAlign:'center', width:''}}>{`Esta seguro que quiere eliminar la geometría: `}</span> 
        {geometriaSelected.typeGeometry} <br/>
        <span style={{fontWeight:'bold'}}>{` con id: `}</span> {geometriaSelected.id}
    </>
  )
}

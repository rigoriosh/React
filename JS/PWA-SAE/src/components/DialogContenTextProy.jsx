import React from 'react'

export const DialogContenTextProy = ({projectSelected}) => {
  return (
    <>
        <span style={{fontWeight:'bold', textAlign:'center', width:''}}>{`Esta seguro de eliminar:`}</span> <br/>
        {`Proyecto: `}<span style={{fontWeight:'bold'}}>{projectSelected.proyecto}</span> <br/>
        {` con id: `} <span style={{fontWeight:'bold'}}>{projectSelected.ID_PREDIO}</span>
    </>
  )
}

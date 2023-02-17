import { useState } from "react"
import { AddCategoria, GitGrid } from "./components"


export const GifExpertApp = () => {
    console.log("GifExpertApp")
    const [categorias, setCategorias] = useState([])

    const addCategoria = (newCat) => setCategorias([ ` ${newCat} `, ...categorias])

  return (
    <>
        {/* Titulo */}
        <h1>GifExpertApp</h1>

        {/* Inputs */}
        <AddCategoria addCategoria={addCategoria}/>
        {/* <button onClick={addCategoria}>Agregar</button> */}
        {/* Listado de Gif */}
        <ol>
           {
            categorias.map((category, i) => <GitGrid key={category+i} category={category}/>)
           } 
        </ol>
            {/* Gif Item */}
    </>
  )
}

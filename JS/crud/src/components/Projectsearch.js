import React, { useEffect, useRef, useState } from 'react'
//import PropTypes from 'prop-types'
import Seleccionar from '../helpers/Select'
import DataTable from '../helpers/DataTable'
import {Footer} from './Footer'
import MenuNavBar from './MenuNavBar';

const Projectsearch = props => {
    const refTipoIdentificacion = useRef();
    const tipoIdentificacion = ['cc', 'passport'];
    const [valorSeleccionado, setValorSeleccionado] = useState('')

    const columns = [
        { field: "id", headerName: "Tipo de Identificación", width: 200 },
        { field: "firstName", headerName: "Identificación del constructor", width: 250 },
        { field: "lastName", headerName: "Código del proyecto", width: 180 },
        { field: "age", headerName: "Nombre del proyecto", type: "number", width: 200, },    
      ];
    
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

    // onInit
    useEffect(() => {
        refTipoIdentificacion.current.focus();
        return () => {}
    }, [])
    return (
        <>
                <MenuNavBar />
            <div className="contenedor">
                <h4 className="">Búsqueda del proyecto</h4>

                <form action="" className=" card">
                    <Seleccionar id={'selectTipoIdentificacion'} label={'Tipo de identificación'} optInit={'Seleccione'} options={tipoIdentificacion}
                        referencia={refTipoIdentificacion} handleSelect={setValorSeleccionado} valorSeleccionado={valorSeleccionado}
                    />
                    <div className="columna2 ali-item-cent">
                        <label htmlFor="numID">Número de identificación</label>
                        <input className="input no-margen-inferior" type="text" name="numID" id="numID"  />
                    </div>
                    <div className="columna2 ali-item-cent">
                        <label htmlFor="projName">Nombre del proyecto</label>
                        <input className="input no-margen-inferior" type="text" name="projName" id="projName"  />
                    </div>
                    <div className="elem-derecha btnIngresar mt-10">
                        <button className="boton" type="submit">Buscar</button>
                    </div>
                </form>

                <div className="margen-superior">
                    <h4>Resultado de la búsqueda</h4>
                    <DataTable columns={columns} rows={rows} />
                </div>
                
            </div>
            <Footer />
        </>
    )
}

Projectsearch.propTypes = {

}

export default Projectsearch

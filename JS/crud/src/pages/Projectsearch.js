import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
//import PropTypes from 'prop-types'
import Seleccionar from '../components/Select'
import DataTable from '../components/DataTable'
import MenuNavBar from '../components/MenuNavBar';

import '../css/projectSearch.css'

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
    }, []);

    const { register, handleSubmit, formState, } = useForm();

    const onSubmit = (form) => {        
        console.log(form);
    }
    return (
        <div className="Projectsearch">
            <MenuNavBar />
            <div className="contenedor contenedor-min">
                <h4 className="">Búsqueda del proyecto</h4>

                <form onSubmit={handleSubmit(onSubmit)} className="w50 card">
                    <Seleccionar id={'selectTipoIdentificacion'} label={'Tipo de identificación'} optInit={'Seleccione'} options={tipoIdentificacion}
                        referencia={refTipoIdentificacion} handleSelect={setValorSeleccionado} valorSeleccionado={valorSeleccionado}
                    />
                    <div className="columna1 ali-item-cent">
                        {/* <label htmlFor="numID">Número de identificación</label>
                        <input className="input no-margen-inferior" type="text" name="numID" id="numID"  /> */}
                        <TextField id="numID" label="Número de identificación" variant="outlined"
                            {...register('numID')} className="input no-margen-inferior"
                        />
                    </div>
                    <div className="columna1 ali-item-cent">
                        {/* <label htmlFor="projName">Nombre del proyecto</label>
                        <input className="input no-margen-inferior" type="text" name="projName" id="projName"  /> */}
                        <TextField id="projName" label="Nombre del proyecto" variant="outlined"
                            {...register('projName')} className="input no-margen-inferior"
                        />
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
            {/* <Footer /> */}
        </div>
    )
}

Projectsearch.propTypes = {

}

export default Projectsearch

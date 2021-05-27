import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
//import PropTypes from 'prop-types'

import '../css/projectSearch.css'
import Seleccionar from '../components/Select'
import DataTable from '../components/DataTable'
//import MenuNavBar from '../components/MenuNavBar';

import { useDispatch } from 'react-redux';
import { setProyecto } from '../Redux-actions/proyecto_actions';
import { setHijoBreadCrumb, /* setPadreBreadCrumb */ } from '../Redux-actions/breadcrumb_action';
import { rutasModulos } from '../Tools/rutas';

const Projectsearch = ({history}) => {
    const refTipoIdentificacion = useRef();
    
    const dispatch = useDispatch();
    const tipoIdentificacion = ['cc', 'passport'];
    const [valorSeleccionado, setValorSeleccionado] = useState('');
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
    console.log(proyectoSeleccionado)
    const columns = [
        { field: "id", headerName: "Tipo de Identificación", width: 200 },
        { field: "identificacionConstructor", headerName: "Identificación del constructor", width: 250 },
        { field: "codigoConstructor", headerName: "Código del proyecto", width: 180 },
        { field: "nombreProyecto", headerName: "Nombre del proyecto", width: 600, },    
      ];
    
    const rows = [
    { id: 1, codigoConstructor: 'Snow', identificacionConstructor: 35, nombreProyecto: 'Jon'},
    { id: 2, codigoConstructor: 'Lannister', identificacionConstructor: 42, nombreProyecto: 'Cersei'},
    { id: 3, codigoConstructor: 'Lannister', identificacionConstructor: 45, nombreProyecto: 'Jaime'},
    { id: 4, codigoConstructor: 'Stark', identificacionConstructor: 16, nombreProyecto: 'Arya'},
    { id: 5, codigoConstructor: 'Targaryen', identificacionConstructor: null, nombreProyecto: 'Daenerys'},
    { id: 6, codigoConstructor: 'Melisandre', identificacionConstructor: 150, nombreProyecto:  'Thiago'},
    { id: 7, codigoConstructor: 'Clifford', identificacionConstructor: 44, nombreProyecto:  'Ferrara'},
    { id: 8, codigoConstructor: 'Frances', identificacionConstructor: 36, nombreProyecto:  'Rossini'},
    { id: 9, codigoConstructor: 'Roxie', identificacionConstructor: 65, nombreProyecto:  'Harvey'},
    { id: 10, codigoConstructor: 'Snow', identificacionConstructor: 35, nombreProyecto: 'Jon'},
    { id: 11, codigoConstructor: 'Snow', identificacionConstructor: 35, nombreProyecto: 'Jon'},
    { id: 12, codigoConstructor: 'Lannister', identificacionConstructor: 42, nombreProyecto: 'Cersei'},
    { id: 13, codigoConstructor: 'Lannister', identificacionConstructor: 45, nombreProyecto: 'Jaime'},
    { id: 14, codigoConstructor: 'Stark', identificacionConstructor: 16, nombreProyecto: 'Arya'},
    { id: 15, codigoConstructor: 'Targaryen', identificacionConstructor: null, nombreProyecto: 'Daenerys'},
    { id: 16, codigoConstructor: 'Melisandre', identificacionConstructor: 150, nombreProyecto:  'Thiago'},
    { id: 17, codigoConstructor: 'Clifford', identificacionConstructor: 44, nombreProyecto:  'Ferrara'},
    { id: 18, codigoConstructor: 'Frances', identificacionConstructor: 36, nombreProyecto:  'Rossini'},
    { id: 19, codigoConstructor: 'Roxie', identificacionConstructor: 65, nombreProyecto:  'Harvey'},
    { id: 20, codigoConstructor: 'Snow', identificacionConstructor: 35, nombreProyecto: 'Jon'},
    { id: 21, codigoConstructor: 'Snow', identificacionConstructor: 35, nombreProyecto: 'Jon'},
    { id: 22, codigoConstructor: 'Lannister', identificacionConstructor: 42, nombreProyecto: 'Cersei'},
    { id: 23, codigoConstructor: 'Lannister', identificacionConstructor: 45, nombreProyecto: 'Jaime'},
    { id: 24, codigoConstructor: 'Stark', identificacionConstructor: 16, nombreProyecto: 'Arya'},
    { id: 25, codigoConstructor: 'Targaryen', identificacionConstructor: null, nombreProyecto: 'Daenerys'},
    { id: 26, codigoConstructor: 'Melisandre', identificacionConstructor: 150, nombreProyecto:  'Thiago'},
    { id: 27, codigoConstructor: 'Clifford', identificacionConstructor: 44, nombreProyecto:  'Ferrara'},
    { id: 28, codigoConstructor: 'Frances', identificacionConstructor: 36, nombreProyecto:  'Rossini'},
    { id: 29, codigoConstructor: 'Roxie', identificacionConstructor: 65, nombreProyecto:  'Harvey'},
    ];

    // onInit
    useEffect(() => {
        refTipoIdentificacion.current.focus();
        return () => {}
    }, []);

    const { register, handleSubmit, /* formState, */ } = useForm();

    const onSubmit = (form) => {        
        console.log(form);
    }

    useEffect(() => {
        if(!!proyectoSeleccionado){
            dispatch(setProyecto(proyectoSeleccionado));
            dispatch(setHijoBreadCrumb(rutasModulos[2]));
            console.log('/inicio'+rutasModulos[2].ruta)
            history.push('/Inicio');
            console.log(1111);
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proyectoSeleccionado])




    return (
        <div className="Projectsearch">
            {/* <MenuNavBar history={history}/> */}
            <div className="contenedor contenedor-min">{/* Vista ProjectSearch */}
                {/* <h4 className="">Búsqueda del proyecto</h4> */}

                <form onSubmit={handleSubmit(onSubmit)} className="w50 card">
                    <Seleccionar id={'selectTipoIdentificacion'} label={'Tipo de identificación'} optInit={'Seleccione'} options={tipoIdentificacion}
                        referencia={refTipoIdentificacion} handleSelect={setValorSeleccionado} valorSeleccionado={valorSeleccionado}
                        requerido={false}
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

                <div className="margen-superior mb60px">
                    <h4>Resultado de la búsqueda</h4>
                    <DataTable columns={columns} rows={rows} setRegistroSeleccionado={setProyectoSeleccionado}/>
                </div>
                
            </div>
            
        </div>
    )
}

Projectsearch.propTypes = {

}

export default Projectsearch

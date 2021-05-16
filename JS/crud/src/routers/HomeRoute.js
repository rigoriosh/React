import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import MenuNavBar from '../components/MenuNavBar';
//import Projectsearch from '../pages/Projectsearch';
import { AdministracionRoute } from './AdministracionRoute';
import { ProrratasRoute } from './ProrratasRoute';
import { ReportesRoute } from './ReportesRoute';
import Menu from '../components/Menu';
import { optsMenuDrawer } from '../constantes/rutas';

export const HomeRoute = ({history, location}) => {
    console.log('HomeRoute')

    const {rutaPadre, rutaHijo} = useSelector(state => state.breadCrumb_reducer);
    console.log({rutaPadre, rutaHijo});
    
    const [optMenuSeleccionado, setOptMenuSeleccionado] = useState(optsMenuDrawer[2]); //maneja la vista inicial al desplegar el modulo administración
    

    useEffect(() => {
        //const {ruta} = optsMenuDrawer.find(e => e.nombre === optMenuSeleccionado);
        //history.pus            
        return () => { }
    }, [optMenuSeleccionado])
    return (
        <>
            {/* <MenuNavBar history={history}/> */}

            <div className="ml-10">
                <Menu optsMenuDrawer={optsMenuDrawer} setOptMenuSeleccionado={setOptMenuSeleccionado}/>
                <main className='contenedor'>                
                    {/* <Breadcrumb /> */}
                    <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">{rutaHijo?.label || rutaPadre.label}</h3>                   
                        <Switch>                            
                            <Route  path="/inicio/prorratas" component={ProrratasRoute}/>                
                            <Route  path="/inicio/reportes" component={ReportesRoute}/>
                            <Route  path="/inicio/administracion" component={AdministracionRoute}/>
                            <Redirect to="/inicio/prorratas" />
                        </Switch>                    
                </main>
            </div>
            
            
        </>
    )
}

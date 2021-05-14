import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import MenuNavBar from '../components/MenuNavBar';
import Projectsearch from '../pages/Projectsearch';
import { AdministracionRoute } from './AdministracionRoute';
import { ProrratasRoute } from './ProrratasRoute';
import { ReportesRoute } from './ReportesRoute';
import Menu from '../components/Menu';
import { tiposParametrosSis } from '../constantes/constantesParametrosDelSistema';

export const HomeRoute = ({history, location}) => {
    console.log('HomeRoute')

    const {rutaPadre, rutaHijo} = useSelector(state => state.breadCrumb_reducer);
    console.log({rutaPadre, rutaHijo});
    const optsMenuDrawer = tiposParametrosSis.optsMenuDrawer;
    const [optMenuSeleccionado, setOptMenuSeleccionado] = useState(optsMenuDrawer[1]); //maneja la vista inicial al desplegar el modulo administración
    
    return (
        <>
            <MenuNavBar history={history}/>

            <div className="ml-10">
                <Menu optsMenuDrawer={optsMenuDrawer} setOptMenuSeleccionado={setOptMenuSeleccionado}/>
                <main className='contenedor'>                
                   
                        <Switch>                            
                            <Route  path="/inicio/prorratas" component={ProrratasRoute}/>                
                            <Route  path="/inicio/reportes" component={ReportesRoute}/>
                            <Route  path="/inicio/administracion" component={AdministracionRoute}/>
                            <Redirect to="/inicio/administracion" />
                        </Switch>
                    

                    <Breadcrumb />
                    <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">{rutaHijo?.label || rutaPadre.label}</h3>
                </main>
            </div>
            
            
        </>
    )
}

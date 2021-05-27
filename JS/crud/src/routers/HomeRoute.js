import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";


import { AdministracionRoute } from './AdministracionRoute';
import { ProrratasRoute } from './ProrratasRoute';
import { ReportesRoute } from './ReportesRoute';
import Menu from '../components/Menu';

export const HomeRoute = () => {
    console.log('HomeRoute')
   
    

    return (
        <>
        
                
                <div className="ml-10 ">
                    <Menu className="homeRoute-Menu"/>
                
                <main className='contenedor ' style={{height: '600vh'}}>  
                
                    
                    
                    <Switch>                            
                        <Route  path="/Inicio/Prorratas" component={ProrratasRoute}/>                
                        <Route  path="/Inicio/Reportes" component={ReportesRoute}/>
                        <Route  path="/Inicio/Administracion" component={AdministracionRoute}/>
                        <Redirect to="/Inicio/Prorratas" />
                    </Switch>                    
                </main>
            </div>
            
            
            
        </>
    )
}

import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";


import { AdministracionRoute } from './AdministracionRoute';
import { ProrratasRoute } from './ProrratasRoute';
import { ReportesRoute } from './ReportesRoute';
import Menu from '../components/Menu';

export const HomeRoute = ({history, location}) => {
    console.log('HomeRoute')
   
    

    return (
        <>
        
            <div className="ml-10">

                <Menu />

                <main className='contenedor'>  
                
                    
                    
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

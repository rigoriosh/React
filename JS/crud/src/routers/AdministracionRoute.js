import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import ParametrosDelSistema from '../pages/administracion/ParametrosDelSistema';

export const AdministracionRoute = () => {
    console.log('AdministracionRoute')
    return (
        <Switch>                            
            <Route  path="/inicio/administracion/parametrossistema" component={ParametrosDelSistema}/>                
            
            <Redirect to="/inicio/administracion/parametrossistema" />
        </Switch>
    )
}

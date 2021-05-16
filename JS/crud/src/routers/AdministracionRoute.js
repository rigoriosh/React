import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import DesbloquearLiberaciones from '../pages/administracion/DesbloquearLiberaciones';
import Permisos from '../pages/administracion/Permisos';
//import ParametrosDelSistema from '../pages/administracion/ParametrosDelSistema';
import Roles from '../pages/administracion/Roles';

export const AdministracionRoute = () => {
    console.log('AdministracionRoute')
    return (
        <div>
            AdministracionRoute
            <Switch>                            
                <Route  path="/inicio/administracion/DesbloquearLiberaciones" component={DesbloquearLiberaciones}/>                
                <Route  path="/inicio/administracion/Permisos" component={Permisos}/>
                <Route  path="/inicio/administracion/Roles" component={Roles}/>
                
                <Redirect to="/inicio/administracion/DesbloquearLiberaciones" />
            </Switch>
        </div>
    )
}

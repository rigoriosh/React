import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import DesbloquearLiberaciones from '../pages/administracion/DesbloquearLiberaciones';
import ParametrosDelSistema from '../pages/administracion/ParametrosDelSistema';
import AdminValoresTipo from '../pages/administracion/valoresTipos/AdminValoresTipo';
import Permisos from '../pages/administracion/Permisos';
import Roles from '../pages/administracion/Roles';

export const AdministracionRoute = () => {
    console.log('AdministracionRoute')
    return (
        <div>
            AdministracionRoute
            <Switch>                            
                <Route  path="/inicio/administracion/ParametrosDelSistema" component={ParametrosDelSistema}/>
                <Route  path="/inicio/administracion/ValoresTipo" component={AdminValoresTipo}/>
                <Route  path="/inicio/administracion/DesbloquearLiberaciones" component={DesbloquearLiberaciones}/>                
                <Route  path="/inicio/administracion/Permisos" component={Permisos}/>
                <Route  path="/inicio/administracion/Roles" component={Roles}/>
                
                <Redirect to="/inicio/administracion/ParametrosDelSistema" />
            </Switch>
        </div>
    )
}

import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import DesbloquearLiberaciones from '../pages/administracion/DesbloquearLiberaciones';
import ParametrosDelSistema from '../pages/administracion/ParametrosDelSistema';
//import ValoresTipo from '../pages/administracion/valoresTipos/ValoresTipo';
import Permisos from '../pages/administracion/Permisos';
import Roles from '../pages/administracion/Roles';

export const AdministracionRoute = () => {
    console.log('AdministracionRoute')
    return (
        <div>
            AdministracionRoute
            <Switch>                            
                <Route  path="/inicio/administracion/ParametrosDelSistema" component={ParametrosDelSistema}/>
                {/* <Route  path="/inicio/administracion/ValoresTipo" component={ValoresTipo}/> */}
                <Route  path="/inicio/administracion/DesbloquearLiberaciones" component={DesbloquearLiberaciones}/>                
                <Route  path="/inicio/administracion/Permisos" component={Permisos}/>
                <Route  path="/inicio/administracion/Roles" component={Roles}/>
                
                <Redirect to="/inicio/administracion/ParametrosDelSistema" />
            </Switch>
        </div>
    )
}

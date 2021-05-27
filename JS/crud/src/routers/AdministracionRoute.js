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
        <div className="">
            AdministracionRoute
            <Switch>                            
                <Route  path="/Inicio/Administracion/ParametrosDelSistema" component={ParametrosDelSistema}/>
                <Route  path="/Inicio/Administracion/ValoresTipo" component={AdminValoresTipo}/>
                <Route  path="/Inicio/Administracion/DesbloquearLiberaciones" component={DesbloquearLiberaciones}/>                
                <Route  path="/Inicio/Administracion/Permisos" component={Permisos}/>
                <Route  path="/Inicio/Administracion/Roles" component={Roles}/>                
                <Redirect to="/Inicio/Administracion/ParametrosDelSistema" />
            </Switch>
        </div>
    )
}

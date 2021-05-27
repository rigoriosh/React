import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { ControlCartas } from '../pages/reportes/ControlCartas';
import { ExtractoDeCredito } from '../pages/reportes/ExtractoDeCredito';
import { Liberaciones } from '../pages/reportes/Liberaciones';
import { LiberacionesPorSuficienteGarantia } from '../pages/reportes/LiberacionesPorSuficienteGarantia';
import { PolizasTRC } from '../pages/reportes/PolizasTRC';
import { Subrogaciones } from '../pages/reportes/Subrogaciones';

export const ReportesRoute = () => {
    return (
        <div>
            ReportesRoute
            <Switch>                            
                <Route  path="/Inicio/Reportes/ControlCartas" component={ControlCartas}/>                
                <Route  path="/Inicio/Reportes/ExtractoDeCredito" component={ExtractoDeCredito}/>
                <Route  path="/Inicio/Reportes/Liberaciones" component={Liberaciones}/>
                <Route  path="/Inicio/Reportes/LiberacionesPorSuficienteGarantia" component={LiberacionesPorSuficienteGarantia}/>
                <Route  path="/Inicio/Reportes/PolizasTRC" component={PolizasTRC}/>
                <Route  path="/Inicio/Reportes/Subrogaciones" component={Subrogaciones}/>
                <Redirect to="/Inicio/Reportes/ControlCartas" />
            </Switch>
        </div>
    )
}

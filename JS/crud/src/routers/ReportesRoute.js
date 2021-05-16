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
                <Route  path="/inicio/reportes/ControlCartas" component={ControlCartas}/>                
                <Route  path="/inicio/reportes/ExtractoDeCredito" component={ExtractoDeCredito}/>
                <Route  path="/inicio/reportes/Liberaciones" component={Liberaciones}/>
                <Route  path="/inicio/reportes/LiberacionesPorSuficienteGarantia" component={LiberacionesPorSuficienteGarantia}/>
                <Route  path="/inicio/reportes/PolizasTRC" component={PolizasTRC}/>
                <Route  path="/inicio/reportes/Subrogaciones" component={Subrogaciones}/>

                <Redirect to="/inicio/reportes/ControlCartas" />
            </Switch>
        </div>
    )
}

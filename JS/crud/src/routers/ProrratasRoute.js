import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { CargueCuadroDeAreas } from '../pages/prorratas/CargueCuadroDeAreas';
import { CrearSeleccion } from '../pages/prorratas/CrearSeleccion';
import { CuadroDeProrratas } from '../pages/prorratas/CuadroDeProrratas';
import { HistoricoDePagos } from '../pages/prorratas/HistoricoDePagos';
import { LiberarInmueble } from '../pages/prorratas/LiberarInmueble';
import { LiberarPorSuficienteGarantia } from '../pages/prorratas/LiberarPorSuficienteGarantia';
import { Subrrogaciones } from '../pages/prorratas/Subrrogaciones';
import { VerificarRPH } from '../pages/prorratas/VerificarRPH';


export const ProrratasRoute = () => {
    console.log('ProrratasRoute')
    return (
        <div>            
            ProrratasRoutefff
            <Switch>                            
                <Route  path="/inicio/prorratas/CargueCuadroDeAreas" component={CargueCuadroDeAreas}/>
                <Route  path="/inicio/prorratas/VerificarRPH" component={VerificarRPH}/>
                <Route  path="/inicio/prorratas/CuadroDeProrratas" component={CuadroDeProrratas}/>                
                <Route  path="/inicio/prorratas/LiberarInmueble" component={LiberarInmueble}/>
                <Route  path="/inicio/prorratas/LiberarPorSuficienteGarantia" component={LiberarPorSuficienteGarantia}/>
                <Route  path="/inicio/prorratas/Subrrogaciones" component={Subrrogaciones}/>
                <Route  path="/inicio/prorratas/HistoricoDePagos" component={HistoricoDePagos}/>
                <Route  path="/inicio/prorratas/CrearSeleccion" component={CrearSeleccion}/>

                <Redirect to="/inicio/prorratas/CuadroDeProrratas" />
            </Switch>
        </div>
    )
}

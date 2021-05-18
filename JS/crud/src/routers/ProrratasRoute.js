import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { AdicionarValoresAprobacionCartas, AtarCreditos, CargueCuadroDeAreas, CrearDesistimiento,
    CrearSeleccion, CuadroDeProrratas, HistoricoDePagos, LiberarInmueble, LiberarPorSuficienteGarantia,
    Subrrogaciones, RegistrarAprobarCartasCompromiso, VerificarRPH } from "../pages/prorratas/index";
    

export const ProrratasRoute = () => {
    console.log('ProrratasRoute')
    return (
        <div>            
            ProrratasRoutefff
            <Switch>                            
                <Route  path="/inicio/prorratas/AdicionarValoresAprobacionCartas" component={AdicionarValoresAprobacionCartas}/>
                <Route  path="/inicio/prorratas/AtarCreditos"                     component={AtarCreditos}/>
                <Route  path="/inicio/prorratas/CargueCuadroDeAreas"              component={CargueCuadroDeAreas}/>
                <Route  path="/inicio/prorratas/CrearDesistimiento"               component={CrearDesistimiento}/>
                <Route  path="/inicio/prorratas/CrearSeleccion"                   component={CrearSeleccion}/>
                <Route  path="/inicio/prorratas/CuadroDeProrratas"                component={CuadroDeProrratas}/>                
                <Route  path="/inicio/prorratas/HistoricoDePagos"                 component={HistoricoDePagos}/>
                <Route  path="/inicio/prorratas/LiberarInmueble"                  component={LiberarInmueble}/>
                <Route  path="/inicio/prorratas/LiberarPorSuficienteGarantia"     component={LiberarPorSuficienteGarantia}/>
                <Route  path="/inicio/prorratas/Subrrogaciones"                   component={Subrrogaciones}/>
                <Route  path="/inicio/prorratas/RegistrarAprobarCartasCompromiso" component={RegistrarAprobarCartasCompromiso}/>
                <Route  path="/inicio/prorratas/VerificarRPH"                     component={VerificarRPH}/>

                <Redirect to="/inicio/prorratas/CuadroDeProrratas" />
            </Switch>
        </div>
    )
}

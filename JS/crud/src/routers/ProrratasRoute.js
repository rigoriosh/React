import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { AdicionarValoresAprobacionCartas, AtarCreditos, CargueCuadroDeAreas, CrearDesistimiento,
    CrearSeleccion, CuadroDeProrratas, HistoricoDePagos, LiberarInmueble, LiberarPorSuficienteGarantia,
    Subrrogaciones, RegistrarAprobarCartasCompromiso, VerificarRPH } from "../pages/prorratas/index";
    

export const ProrratasRoute = () => {
    console.log('ProrratasRoute')
    return (
        <div>            
            {/* ProrratasRoutefff */}
            <Switch>                            
                <Route  path="/Inicio/Prorratas/AdicionarValoresAprobacionCartas" component={AdicionarValoresAprobacionCartas}/>
                <Route  path="/Inicio/Prorratas/AtarCreditos"                     component={AtarCreditos}/>
                <Route  path="/Inicio/Prorratas/CargueCuadroDeAreas"              component={CargueCuadroDeAreas}/>
                <Route  path="/Inicio/Prorratas/CrearDesistimiento"               component={CrearDesistimiento}/>
                <Route  path="/Inicio/Prorratas/CrearSeleccion"                   component={CrearSeleccion}/>
                <Route  path="/Inicio/Prorratas/CuadroDeProrratas"                component={CuadroDeProrratas}/>                
                <Route  path="/Inicio/Prorratas/HistoricoDePagos"                 component={HistoricoDePagos}/>
                <Route  path="/Inicio/Prorratas/LiberarInmueble"                  component={LiberarInmueble}/>
                <Route  path="/Inicio/Prorratas/LiberarPorSuficienteGarantia"     component={LiberarPorSuficienteGarantia}/>
                <Route  path="/Inicio/Prorratas/Subrrogaciones"                   component={Subrrogaciones}/>
                <Route  path="/Inicio/Prorratas/RegistrarAprobarCartasCompromiso" component={RegistrarAprobarCartasCompromiso}/>
                <Route  path="/Inicio/Prorratas/VerificarRPH"                     component={VerificarRPH}/>

                <Redirect to="/Inicio/Prorratas/CuadroDeProrratas" />
            </Switch>
        </div>
    )
}

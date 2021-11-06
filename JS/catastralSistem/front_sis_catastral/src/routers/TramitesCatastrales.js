import React from 'react'
import { Routes, Route } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { ConsultarTramite } from '../pages/tramites/ConsultarTramite';
import { CrearTramite } from '../pages/tramites/CrearTramite';

export const TramitesCatastrales = () => {
    return (
        <div>
            <h5>TramitesCatastrales</h5>
            <Routes>
                <Route path="crear" element={<CrearTramite/>} />
                <Route path="consultar" element={<ConsultarTramite/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>
        </div>
    )
}

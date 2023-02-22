import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { NoMatch } from '../../../componets/NoMatch';
import { pathsRoutes } from '../../../helpers/utils';
import { CrearTramiteCopy } from '../CrearTramite-v01';
import { ConsultarTramite } from './ConsultarTramite';

export const ConsultaTramiteRoute = () => {

    let location = useLocation();

    if (location.pathname === pathsRoutes.consultaTramite) {
        return (
            <ConsultarTramite tipoTramite="Consulta"/>
        )
    }


    return (
        <Routes>
            <Route path="consulta" element={<CrearTramiteCopy/>} />
            <Route path="*" element={<NoMatch/>} />
        </Routes>
    )
}

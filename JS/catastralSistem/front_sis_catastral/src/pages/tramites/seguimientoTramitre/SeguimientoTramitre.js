import { Route, Routes, useLocation } from 'react-router-dom';
import { NoMatch } from '../../../componets/NoMatch';
import { pathsRoutes } from '../../../helpers/utils';
import { ConsultarTramite } from '../consultarTramites/ConsultarTramite'
import { CrearTramiteCopy } from '../CrearTramite-v01';

export const SeguimientoTramitre = (/* {setOpenBackDrop} */) => {

    let location = useLocation();

    if (location.pathname === pathsRoutes.seguimientoTramite) {
        return (
            <ConsultarTramite tipoTramite="Seguimiento" /* setOpenBackDrop={setOpenBackDrop} *//>
        )
    }

    return (
        <Routes>
            <Route path="detalle" element={<CrearTramiteCopy/>} />
            <Route path="*" element={<NoMatch/>} />
        </Routes>
    )
}

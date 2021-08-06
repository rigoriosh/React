import React, { useState } from 'react'
import { TareasDeActividad } from './TareasDeActividad';

export const ActividadRecursos = () => {
    const [titleActividadRecursos, setTitleActividadRecursos] = useState('Cuarto de Máquinas / Montaje estructura');
    return (
        <div>
            <p style={{marginBottom:'20px'}}>{titleActividadRecursos}</p>
            <TareasDeActividad/>
        </div>
    )
}

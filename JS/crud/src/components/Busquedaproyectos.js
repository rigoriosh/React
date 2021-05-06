import React from 'react'
import Select from '../helpers/Select'

export const Busquedaproyectos = () => {
    const tipoIdentificacion = ['cc', 'passport'];
    return (
        <div>
            Búsqueda del proyecto
            <form action="">
                <Select id={'selectTipoIdentificacion'} label={'Tipo de identificación'} optInit={'Seleccione'} options={tipoIdentificacion}/>
                <label htmlFor=""></label>
                <input className="input no-margen-inferior" type="password" name="passUser" id="passUser"  />
                
            </form>
        </div>
    )
}

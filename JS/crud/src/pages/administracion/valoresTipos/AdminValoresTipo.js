import React, { useEffect, useState } from 'react'
import { tiposParametrosSis } from '../../constantes/constantesParametrosDelSistema';
import ValoresTipo from './ValoresTipo'
import VerEditarTipos from './VerEditarTipos';
//import PropTypes from 'prop-types'

const AdminValoresTipo = ({setMensajes, dialog, setDialog, optMenuSeleccionado, setOptMenuSeleccionado}) => {
    console.log('AdminValoresTipo')

    const [registroSeleccionado, setRegistroSeleccionado] = useState('');

    useEffect(() => { // camptura el registro seleccionado        
        if(registroSeleccionado !== '') setOptMenuSeleccionado(tiposParametrosSis.optsMenuDrawer[5])        
        return () => {}
    }, [registroSeleccionado])

    return (
        <>
            {
                (optMenuSeleccionado === tiposParametrosSis.optsMenuDrawer[1])
                ? <ValoresTipo setMensajes={setMensajes} dialog={dialog} setDialog={setDialog} setRegistroSeleccionado={setRegistroSeleccionado}/>
                : <VerEditarTipos setMensajes={setMensajes} dialog={dialog} setDialog={setDialog} registroSeleccionado={registroSeleccionado} setRegistroSeleccionado={setRegistroSeleccionado}/>
            }
        </>
    )
}

AdminValoresTipo.propTypes = {

}

export default AdminValoresTipo

import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import ValoresTipo from './ValoresTipo'
import VerEditarTipos from './VerEditarTipos';
//import PropTypes from 'prop-types'

const AdminValoresTipo = (/* {setMensajes, dialog, setDialog, optMenuSeleccionado, setOptMenuSeleccionado} */) => {
    console.log('AdminValoresTipo')

    const [registroSeleccionado, setRegistroSeleccionado] = useState('');

    useEffect(() => { // camptura el registro seleccionado        
        if(registroSeleccionado !== ''){
            console.log(registroSeleccionado)
            //setOptMenuSeleccionado(tiposParametrosSis.optsMenuDrawer[5])        
        }
        return () => {}
    }, [registroSeleccionado])

    return (
        <>
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Administración de valores tipo</h3>
            <Switch>                                            
                <Route  path="/inicio/administracion/ValoresTipo/:EditarValoresTipo" component={VerEditarTipos}/>
                <Route  path="/inicio/administracion/ValoresTipo" component={ValoresTipo}/>
                
                <Redirect to="/inicio/administracion/ValoresTipo" />
            </Switch>    
                {/* <ValoresTipo setRegistroSeleccionado={setRegistroSeleccionado}/>
                <VerEditarTipos registroSeleccionado={registroSeleccionado} setRegistroSeleccionado={setRegistroSeleccionado}/> */}
            
        </>
    )
}

AdminValoresTipo.propTypes = {

}

export default AdminValoresTipo

import { types } from "../Tools/types"


export const mostrarMensaje = (tipoDeMensaje, textoMensaje) => {

    return (dispath) => {
        dispath(finalizarMostrarMensaje({ tipoDeMensaje, textoMensaje }));
        setTimeout(() => {
            dispath(resetAlertasMensajes());
        }, 3000);
    }
}

export const finalizarMostrarMensaje = (payload) => ({
    type: types.mostrarMensaje,
    payload
})

export const mostrarDialog = (tituloDelDialog, textoDialog) => ({
    type: types.mostrarDialog,
    payload: { tituloDelDialog, textoDialog }
})

export const respuestaDialog = (respuesta) => {
    return (dispatch) => {
        dispatch(finalizarRespuestaDialog(respuesta));
        setTimeout(() => {
            dispatch(finalizarRespuestaDialog(false));
        }, 3000);
    }
}

export const finalizarRespuestaDialog = (payload) => ({
    type: types.respuestaDialog,
    payload
})

export const resetAlertasMensajes = () => ({ type: types.resetAlertasMensajes });

export const ocultarMensaje = () => ({ type: types.ocultarMensaje });
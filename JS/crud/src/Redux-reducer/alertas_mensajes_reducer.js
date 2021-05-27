import { types } from "../Tools/dominios";

const initialState = {
    desplegarMensaje: false,
    tipoDeMensaje: 'success',
    textoMensaje: '',

    respuestaDialog: false,
    desplegarDialog: false,
    tituloDelDialog: '',
    textoDialog: '',
}

export const alertas_mensajes_reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.mostrarMensaje:
            return {
                ...state,
                desplegarMensaje: true,
                tipoDeMensaje: action.payload.tipoDeMensaje,
                textoMensaje: action.payload.textoMensaje,
            }

        case types.ocultarMensaje:
            return {
                ...state,
                desplegarMensaje: false
            }

        case types.mostrarDialog:
            return {
                ...state,
                desplegarDialog: true,
                tituloDelDialog: action.payload.tituloDelDialog,
                textoDialog: action.payload.textoDialog,
            }

        case types.respuestaDialog:
            return {
                ...state,
                desplegarDialog: false,
                respuestaDialog: action.payload
            }

        case types.resetAlertasMensajes:
            return initialState

        default:
            return state;
    }
}
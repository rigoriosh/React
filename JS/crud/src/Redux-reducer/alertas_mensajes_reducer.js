import { types } from "../Tools/types";

const initialState = {
    desplegarMensaje: false,
    tipoDeMensaje: 'success',
    textoMensaje: '',

    desplegarDialog: false,
    tituloDelDialog: '',
    textoDialog: '',
}

export const proyecto_reducer = (state = initialState, action) => {

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
        
        case types.ocultarDialog:
            return {
                ...state,
                desplegarDialog: false
            }

        case types.resetAlertasMensajes:
            return initialState

        default:
            return state;
    }
}
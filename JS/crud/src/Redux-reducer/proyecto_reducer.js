import { types } from "../Tools/types";

const initialState = {
    id: '',
    identificacionConstructor: '',
    codigoConstructor: '',
    nombreProyecto: '',
    nit: '',
    constructora: '',
    saldoFechaCorte: '',
    saldoTotal: ''
}

export const proyecto_reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.setProyecto:
            return {
                ...state,
                ...action.payload
            }

        case types.quitarProyecto:
            return initialState

        default:
            return state;
    }
}
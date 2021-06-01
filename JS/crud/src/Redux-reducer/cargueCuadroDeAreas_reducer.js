import { types } from "../Tools/dominios";

const initialState = {
    cols: [],
    rows: [],
    nombreArchivo: '',
    cantidadRegistros: 0
};

export const cargueCuadroDeAreas_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.setCargueCuadroDeAreas:
            return payload
        case types.updateCargueCuadroDeAreas:
            return {
                ...state,
                rows: payload
            }
        case types.resetCargueCuadroDeAreas:
            return initialState
        default:
            return state;
    }
}
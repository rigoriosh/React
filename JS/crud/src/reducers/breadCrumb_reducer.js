import { rutasModulos } from "../constantes/generales";
import { types } from "../constantes/types";


const initialState = {
    rutaPadre: rutasModulos[0],
    rutaHijo: {},
    rutaNieto: {},
}

export const breadCrumb_reducer = (state = initialState, action) => {
    switch (action.type) {

        case types.setPadreBreadCrumb:
            return {
                ...state,
                rutaPadre: action.payload
            }

        case types.setHijoBreadCrumb:
            return {
                ...state,
                rutaHijo: action.payload
            }

        case types.resetBreadCrumb:
            return initialState

        default:
            return state;
    }
}
import { rutasModulos } from "../Tools/rutas";
import { types } from "../Tools/types";


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
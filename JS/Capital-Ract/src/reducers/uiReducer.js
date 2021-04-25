import { tipos } from "../types/tipos";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case tipos.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case tipos.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case tipos.uiStartLoading:
            return {
                ...state,
                loading: action.payload
            }
        case tipos.uiFinishLoading:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

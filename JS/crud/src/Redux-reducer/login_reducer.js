import { types } from "../Tools/types";

const initialState = {
    id: '',
    nombreUsuario: ''
}

export const login_reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.login:
            return {
                id: action.payload.id,
                nombre: action.payload.nombre
            }

        case types.logout:
            return initialState

        default:
            return state;
    }
}
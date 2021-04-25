import { tipos } from "../types/tipos";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case tipos.login:
            return{
                uid: action.payload.uid,
                name: action.payload.name,
                rol: action.payload.rol
            }
        case tipos.logout:
            return{}
        default:
            return state;
    }
}
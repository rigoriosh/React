import { tipos } from "../types/tipos";

export const authReducer = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case tipos.login:
            //console.log(333333333)
            localStorage.setItem('user', JSON.stringify(action.payload));
            return{
                uid: action.payload.uid,
                name: action.payload.name,
                rol: action.payload.rol
            }
        case tipos.logout:
            localStorage.clear();
            return{}
        default:
            return state;
    }
}
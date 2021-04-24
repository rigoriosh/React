
import { types } from '../types/types';

const initialState = {}
/* 
    {
        uid: 'ejemIdjdjdjdjdjd54554454dfdfhh@ddf',
        name: 'rigo'
    }
 */

/* el reducer siempre debe enviar algo diferente a undefined, en este eje esta devolviendo un obj */
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login: //estos types son los disparadores
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            }
        case types.logout:
            return initialState
        default:
            return state;
    }
}

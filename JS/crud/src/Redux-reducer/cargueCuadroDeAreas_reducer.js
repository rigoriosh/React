import { types } from "../Tools/dominios";

const initialState = [];

export const cargueCuadroDeAreas_reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setCargueCuadroDeAreas:
            return action.payload
        case types.resetCargueCuadroDeAreas:
            return []
        default:
            return state;
    }
}
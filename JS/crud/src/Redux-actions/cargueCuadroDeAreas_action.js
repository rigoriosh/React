import { types } from "../Tools/dominios";

export const setCargueCuadroDeAreas = (data) => ({
    type: types.setCargueCuadroDeAreas,
    payload: data
})

export const resetCargueCuadroDeAreas = (data) => ({
    type: types.resetCargueCuadroDeAreas
})
import { types } from "../Tools/dominios";

export const setCargueCuadroDeAreas = (data) => ({
    type: types.setCargueCuadroDeAreas,
    payload: data
})

export const updateCargueCuadroDeAreas = (data) => ({
    type: types.updateCargueCuadroDeAreas,
    payload: data
})

export const resetCargueCuadroDeAreas = () => ({
    type: types.resetCargueCuadroDeAreas
})
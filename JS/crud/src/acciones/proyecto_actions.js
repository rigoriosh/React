import { types } from "../constantes/types";

export const setProyecto = (payload) => ({
    type: types.setProyecto,
    payload
});

export const quitarProyecto = () => ({
    type: types.quitarProyecto
});
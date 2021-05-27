import { types } from "../Tools/dominios";

export const setProyecto = (proyecto) => ({
    type: types.setProyecto,
    payload: proyecto
});

export const quitarProyecto = () => ({
    type: types.quitarProyecto
});
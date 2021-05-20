import { types } from "../Tools/types";

export const setProyecto = (proyecto) => ({
    type: types.setProyecto,
    payload: proyecto
});

export const quitarProyecto = () => ({
    type: types.quitarProyecto
});
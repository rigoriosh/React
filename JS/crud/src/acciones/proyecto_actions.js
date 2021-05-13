import { types } from "../constantes/types";

export const setProyecto = (id, nombreProyecto) => ({
    type: types.setProyecto,
    payload: { id, nombreProyecto }
});

export const quitarProyecto = () => ({
    type: types.quitarProyecto
});
import { types } from "../Tools/types";
import { resetBreadCrumb } from "./breadcrumb_action";
import { quitarProyecto } from "./proyecto_actions";



export const startLogin = (nombreUsuario, passw) => {
    return (dispath) => {

        // TODO: realizar login con el backend

        const idUser = new Date().getTime();
        localStorage.setItem('userLogin', JSON.stringify({ id: idUser, nombreUsuario }));

        dispath(login(idUser, nombreUsuario));
    }
}

export const login = (id, nombre) => ({
    type: types.login,
    payload: {
        id,
        nombre
    }
})

export const limpiarReducers = () => {
    return (dispath) => {
        dispath(resetBreadCrumb());
        dispath(quitarProyecto());
        dispath(salir());
    }
}

export const salir = () => ({
    type: types.logout
})
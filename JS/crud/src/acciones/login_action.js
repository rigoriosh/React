import { types } from "../constantes/types";



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

export const salir = () => ({
    type: types.logout
})
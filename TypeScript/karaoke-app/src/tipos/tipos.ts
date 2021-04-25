export const tiposHome = {
    auth: 'auth',
    admin: 'admin',
    home: 'home'
}

export const tiposAdmin = {
    homeAdmin: 'homeAdmin',
    addProduct: 'addProduct',
    roles: 'roles'
}

export const tiposAuth = {
    claseAuth: 'containerAuth',
    claseRegister: 'containerAuth sign-up-mode'
}

export type tipovistaAdProduct = {
    homeProducts: string,
    drinks: string,
    coffes: string,
    foods: string,
    newProduct: string,
}


export type tipoCategorias = {
    idCategoria: string;
    nombreCategoria: string;
    tipos: {
        idTipo: string;
        nombreTipo: string;
    }[]
}[]

export interface FormData {idCategoria: string, idTipo: string, nombre: string, cantidad: number, descripcion: string,
    precio: number, foto: string, color: string};
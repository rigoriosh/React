// Pruebas en local
const api = 'http://localhost:8080/api-ssc/'; // local
// const api = ''; // produccion
const enviroment = {
    getToken: `${api}seguridad/getToken`,
    loginUser: `${api}seguridad/loginUser`,

    crearUsuarioExterno: `${api}usuario/createUser`,
    getUsers: `${api}usuario/getUsers`,
    disableUser: `${api}usuario/disableUser/`,
    deleteUser: `${api}usuario/deleteUser/`,

    getTiposDocumento: `${api}valorLista/getTiposDocumento`,
    
}


export default enviroment;
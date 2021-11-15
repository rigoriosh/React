// Pruebas en local
const api = 'http://localhost:8080/api-ssc/'; // local
// const api = ''; // produccion
const enviroment = {
    getToken: `${api}seguridad/getToken`,
    crearUsuarioExterno: `${api}usuario/createUser`,
    getTiposDocumento: `${api}valorLista/getTiposDocumento`,
}


export default enviroment;
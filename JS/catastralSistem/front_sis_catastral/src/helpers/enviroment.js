// Pruebas en local
// const api = 'http://localhost:3000/'; // local json Server
const api = 'http://localhost:8080/api-ssc/'; // local
// const api = 'http://198.199.80.174:8080/api-ssc/'; // produccion
// const api = process.env.REACT_APP_API_URL;
const enviroment = {
    // getToken:               `${api}getToken`,
    getToken:               `${api}seguridad/getToken`,
    loginUser:              `${api}seguridad/loginUser`,
    crearUsuario:           `${api}usuario/createUser`,
    getUsers:               `${api}usuario/getUsers`,
    disableUser:            `${api}usuario/disableUser/`,
    deleteUser:             `${api}usuario/deleteUser/`,
    getTiposDocumento:      `${api}valorLista/getTiposDocumento`,
    getCodigosDane:         `${api}valorLista/getCodigosDane`,
    getTiposTramite:        `${api}solicitudes/getTiposTramite`,
    getTiposSolicitud:      `${api}solicitudes/getTiposSolicitud`,
    getTiposSuelo:          `${api}solicitudes/getTiposSuelo`,
    getMunicipiosCatatumbo: `${api}solicitudes/getMunicipiosCatatumbo`,
    createSolicitud:        `${api}solicitudes/createSolicitud`,
    getMotivoSolicitud:     `${api}solicitudes/getMotivoSolicitud`,
    getObjetoPeticion:      `${api}solicitudes/getObjetoPeticion`,
    getObjetoRectifica:     `${api}solicitudes/getObjetoRectifica`,
    getTipoSolicitudIns:    `${api}solicitudes/getTipoSolicitudIns`,
    getConsideraMejora:     `${api}solicitudes/getConsideraMejora`,
    getDiferenciaMayor:     `${api}solicitudes/getDiferenciaMayor`,
    getRevisionBusca:       `${api}solicitudes/getRevisionBusca`,
    getSolicitudesUsuario:  `${api}solicitudes/getSolicitudesUsuario`,
    // getSolicitudesUsuario:  `${api}solicitudes/getSolicitudesUsuarioPaginado`,
    getDetalleSolicitud:    `${api}solicitudes/getDetalleSolicitud`,
    getEstadosSolicitud:    `${api}solicitudes/getEstadosSolicitud`,
    updateEstadoSolicitud:  `${api}solicitudes/updateEstadoSolicitud`,
    getArchivoSolicitud:    `${api}solicitudes/getArchivoSolicitud`,
    getSolicitudId:         `${api}solicitudes/getSolicitudId`
    
}


export default enviroment;
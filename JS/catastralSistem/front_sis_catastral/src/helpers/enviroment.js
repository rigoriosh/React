// Pruebas en local
const api = 'http://localhost:8080/api-ssc/'; // local
// const api = ''; // produccion
const enviroment = {
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
    getDetalleSolicitud:    `${api}solicitudes/getDetalleSolicitud`,
    getEstadosSolicitud:    `${api}solicitudes/getEstadosSolicitud`,
    updateEstadoSolicitud:  `${api}solicitudes/updateEstadoSolicitud`,
    getArchivoSolicitud:    `${api}solicitudes/getArchivoSolicitud`,
    
}


export default enviroment;
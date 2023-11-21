// Pruebas en local
// const api = 'http://localhost:3000/api-ssc/'; // local json Server
const api = 'http://localhost:8080/api/'; // local
// const api = 'http://198.199.80.174:8080/api-ssc/'; // produccion
// const api = process.env.REACT_APP_API_URL;
// const auth = 'http://localhost:59678/api/Login/?user=user123&pass=pass123&type=Standar';
// const auth = 'http://localhost:59678/api/Login/?user=lozada123&pass=lozada123&type=Standar';
const enviroment = {
    findById:                   `${api}/`,
    findProyectsByIdUser:       `${api}proyecto/obtenerproyectosxUsuario/`,
    findAll:                    `${api}proyecto/obtenertodoslosproyectos`,
    create:                     `${api}proyecto/insertarProyectoGeometrias`,
    delete:                     `${api}proyecto/deleteProyecto/`,
    // obtenerGeometriasProyecto:  `${api}deleteProyecto`,
    deletePunto:                `${api}punto/`,
    FindByIdProyecto:           `${api}punto/proyecto/`,
    findByIdProyectoLinea:      `${api}linea/proyecto/`,
    DeleteLinea:                `${api}linea/`,
    findByIdProyectoPoligono:   `${api}poligono/proyecto/`,
    DeletePoligono:             `${api}poligono/`,
    insertarProyecto:           `${api}proyecto/insertarProyecto`,
    obtenerproyectosxUsuario:   `${api}proyecto/obtenerproyectosxUsuario/`,
    getIdUsuario:               `http://localhost:59678/api/Login/?`
    

}
export default enviroment;


const sae_edicion_1 = 'https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/';
export const urlGetPuntosLineasPoligonos =[
    sae_edicion_1 + "MapServer/0",
    sae_edicion_1 + "MapServer/1",
    sae_edicion_1 + "MapServer/2"
];

export const urlPost_AddFeatures_PuntosLineasPoligonos = {
    punto: sae_edicion_1 + "FeatureServer/0/addFeatures",
    linea: sae_edicion_1 + "FeatureServer/1/addFeatures",
    poligono: sae_edicion_1 + "FeatureServer/2/addFeatures"
}


export const urlPost_deleteFeatures_PuntosLineasPoligonos = {
    punto: sae_edicion_1 + "FeatureServer/0/deleteFeatures",
    linea: sae_edicion_1 + "FeatureServer/1/deleteFeatures",
    poligono: sae_edicion_1 + "FeatureServer/2/deleteFeatures"
  }

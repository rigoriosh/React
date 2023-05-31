// Pruebas en local
// const api = 'http://localhost:3000/api-ssc/'; // local json Server
const api = 'http://localhost:8080/api/'; // local
// const api = 'http://198.199.80.174:8080/api-ssc/'; // produccion
// const api = process.env.REACT_APP_API_URL;
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
    
    
    

}

const urlGetPuntosLineasPoligonos =[
    "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/0",
    "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/1",
    "https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/MapServer/2"
];

const urlPost_AddFeatures_PuntosLineasPoligonos = {
    punto:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/0/addFeatures",
    linea:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/1/addFeatures",
    poligono:"https://sae.igac.gov.co/arcgis/rest/services/SAE/EDICION1/FeatureServer/2/addFeatures"
}


export default enviroment;
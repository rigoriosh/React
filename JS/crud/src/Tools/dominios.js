export const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    setProyecto: '[proyecto] agregar Proyecto',
    quitarProyecto: '[proyecto] quitar proyecto',

    setPadreBreadCrumb: '[breadCrumb] modificar breadCrumb padre',
    setHijoBreadCrumb: '[breadCrumb] modificar breadCrumb hijo',
    resetBreadCrumb: '[breadCrumb] ruta por defecto breadcrumb',

    mostrarMensaje: '[alertas_mensajes] mostrarMensaje',
    ocultarMensaje: '[alertas_mensajes] ocultarMensaje',
    mostrarDialog: '[alertas_mensajes] mostrarDialog',
    respuestaDialog: '[alertas_mensajes] respuestaDialog',
    resetAlertasMensajes: '[alertas_mensajes] resetAlertasMensajes',

    setCargueCuadroDeAreas: '[cargue cuadro de areas]  almacena listado de inmuebles traidos desde el archivo excel',
    resetCargueCuadroDeAreas: '[cargue cuadro de areas]  quita el listado de inmuebles traidos desde el archivo excel',
}

export const tiposCrud = {
    guardar: 'Guardar',
    editar: 'Editar',
    eliminar: 'Eliminar',
}

export const tiposDeDatos = ["Entero", "Texto", "Flotante", "Fecha"];

export const tiposDeInmuebles = ['ALMACEN', 'BODEGA', 'CONSULTORIO', 'GARAJE', 'LOTE', 'AREA PRIVADA 2', 'PENTHOUSE', 'CINEMA', 'CAJERO', 'NO APLICA',
    'APARTASOL', 'APARTAMENTO', 'EDIFICIO', 'MEZANINE', 'PISO', 'TORRE', 'URBANIZACIÓN', 'BURBUJA', 'ANCLA', 'CASA', 'DEPOSITO', 'LOCAL', 'MANZANA'
];

export const tiposEstadoInmuebles = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO'
};

export const estadoLiberacion = {
    LIBERADO: 'LIBERADO',
    NOLIBERADO: 'NO_LIBERADO'
}
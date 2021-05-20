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
}

export const tiposCrud = {
    guardar: 'Guardar',
    editar: 'Editar',
    eliminar: 'Eliminar',
}

export const tiposDeDatos = ["Entero", "Texto", "Flotante", "Fecha"];
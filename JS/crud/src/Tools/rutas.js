/* export const tiposComunes = {
    guardar: 'Guardar',
    editar: 'Editar',
    eliminar: 'Eliminar',
} */

//export const tiposDeDatos = ["Entero", "Texto", "Flotante", "Fecha"];

export const optsMenuAdministracion = [{
        nombre: 'Parámetros del sistema',
        ruta: '/ParametrosDelSistema'
    },
    {
        nombre: 'Valores tipo',
        ruta: '/ValoresTipo'
    },
    {
        nombre: 'Desbloquear liberaciones',
        ruta: '/DesbloquearLiberaciones'
    },
    {
        nombre: 'Permisos',
        ruta: '/Permisos'
    },
    {
        nombre: 'Roles',
        ruta: '/Roles'
    }
];

export const optsProrratas = [{
        nombre: 'Cargue cuadro de áreas',
        ruta: '/CargueCuadroDeAreas'
    }, {
        nombre: 'Verificar RPH',
        ruta: '/VerificarRPH'
    },
    {
        nombre: 'Cuadro de prorratas',
        ruta: '/CuadroDeProrratas'
    },
    {
        nombre: 'Liberar inmueble',
        ruta: '/LiberarInmueble'
    },
    {
        nombre: 'Liberar por suficiente garantia',
        ruta: '/LiberarPorSuficienteGarantia'
    },
    {
        nombre: 'Subrrogaciones',
        ruta: '/Subrrogaciones'
    },
    {
        nombre: 'Historico de pagos',
        ruta: '/HistoricoDePagos'
    },
    {
        nombre: 'Crear seleccion',
        ruta: '/CrearSeleccion'
    },
    {
        nombre: 'Registrar y aprobar cartas de compromiso',
        ruta: '/RegistrarAprobarCartasCompromiso'
    },
    {
        nombre: 'Atar créditos',
        ruta: '/AtarCreditos'
    },
    {
        nombre: 'Crear desistimiento',
        ruta: '/CrearDesistimiento'
    },
    {
        nombre: 'Adicionar valores aprobación cartas',
        ruta: '/AdicionarValoresAprobacionCartas'
    },
    /* {
        nombre: 'Migración de datos',
        ruta: '/MigracionDatos'
    }, */
];

export const optsreportes = [{
        nombre: 'Control cartas',
        ruta: '/ControlCartas',
    },
    {
        nombre: 'Extracto de credito',
        ruta: '/ExtractoDeCredito',
    },
    {
        nombre: 'Liberaciones',
        ruta: '/Liberaciones',
    },
    {
        nombre: 'Liberaciones por suficiente garantia',
        ruta: '/LiberacionesPorSuficienteGarantia',
    },
    {
        nombre: 'Polizas TRC',
        ruta: '/PolizasTRC',
    },
    {
        nombre: 'Subrogaciones',
        ruta: '/Subrogaciones',
    },
];

export const rutasModulos = [{ // se emplea para el breadcrumb
        ruta: '/Inicio',
        label: 'Busqueda de Proyecto'
    },
    {
        ruta: '/Administracion',
        label: 'Administración',
        optsMenu: optsMenuAdministracion
    },
    {
        ruta: '/Prorratas',
        label: 'Prorratas',
        optsMenu: optsProrratas
    },
    {
        ruta: '/Reportes',
        label: 'Reportes',
        optsMenu: optsreportes
    }

];
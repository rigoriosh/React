/* export const tiposComunes = {
    guardar: 'Guardar',
    editar: 'Editar',
    eliminar: 'Eliminar',
} */

//export const tiposDeDatos = ["Entero", "Texto", "Flotante", "Fecha"];

export const optsMenuDrawer = [{
        nombre: 'Parámetros del sistema',
        ruta: '/parametrosdelsitema'
    },
    {
        nombre: 'Valores tipo',
        ruta: ''
    },
    {
        nombre: 'Desbloquear liberaciones',
        ruta: ''
    },
    {
        nombre: 'Permisos',
        ruta: ''
    },
    {
        nombre: 'Roles',
        ruta: ''
    }
];

export const rutasModulos = [{ // se emplea para el breadcrumb
        ruta: '/inicio',
        label: 'Busqueda de Proyecto'
    },
    {
        ruta: '/administracion',
        label: 'Administración',
        optsMenuDrawer
    },
    {
        ruta: '/prorratas',
        label: 'Prorratas'
    },
    {
        ruta: '/reportes',
        label: 'Reportes'
    }

];
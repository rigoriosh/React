import { doGetToken,  } from "../api";

export const initStore = {
  timeInitSessionUser: new Date(), // inicio session
  user:{
      isLogin:false,
      token:'',
      user:'',
      pwd:'',
    },
  openBackDrop:false,
  snackBar:{
    openSnackBar: false,
    messageSnackBar:'',
    tiempoExpiracion:'',
    severity: "success"/*  | "error" | "warning" | "info" */,
  },
  tiposDocumento:[],
  dialogTool:{
    open:false,
    msg :'',
    tittle:'',
    response:false,
    actions:true,
    styles:{},
    textColor:{},
  },

};

export const pathsRoutes = {
  gestionarUsuario: "/tramites/gestionarUsuario",
  tramites: '/tramites'
}

export const textosInfoWarnig = {
  falloComunicacion:'Estamos presentando inconvenientes en la comunicación, porfavor intentalo mas tarde, gracias',
  credencialesIncorrectas:'Credenciales incorrectas',
  inconvenientesRenovarSesion: 'Se presentaron inconvenientes para renovar su sesión, debe registrarse nuevamente, gracias ',
  camposRequerdios:'Recuerda que todos los campos son obligatorios',
  campoRequerido:'Este campo es requerido',
  formatEmailInvalido:'Ingrese un correo electrónico válido',
  creacionUsuario:'El usuario ha sido creado exitosamente.',
  cancelarRegistro: '¿Séguro que desea cancelar el registro?',
  elimnarUsuario: '¿Séguro que desea eliminar el usuario?',
  elimnarPredio: '¿Séguro que desea eliminar el predio?',
  tiempoInactividad: '!Su sesión a finalizado por inactividad',
  diferentesEmails: 'Los correos electrónicos no coinciden',
  diferentesPassWords: 'Las contraseñas no coinciden',
  sinPredios: '! Recuerda que se debe relacionar mínimo un inmueble ¡',
  tramiteExito:'Su trámite ha sido realizado exitosamente.',
  cambioEstadoTramiteOk:'El cambio de estado ha sido realizado exitosamente.',
  tamanioCampo:`!El campo 'Ficha catastral o número predial' debe ser de 20 o 30 carácteres ¡`,
  recuperarPSW: 'Por favor comuniquese al correo comunicaciones@asomunicipios.gov.co, solicitando recuperación de contraseña y envie copia del documento de identidad',
  zipRar: '! Recuerda que los archivos, deben estar dentro de una carpeta comprimida con extensión .zip ¡',
}

export const constantesGlobales = {
  tipoNotas:{
    msgInfo_MP_CPP:'msgInfo_MP_CPP',
    msgInfo_MS_EAP:'msgInfo_MS_EAP',
    msgInfo_MS_DDP:'msgInfo_MS_DDP',
    msgInfo_MT_IRC:'msgInfo_MT_IRC',
    msgInfo_MC_AEAC:'msgInfo_MC_AEAC',
    msgInfo_MC_RAC:'msgInfo_MC_RAC',
    msgInfo_MQ_INCP:'msgInfo_MQ_INCP',
    msgInfo_RE_RUD:'msgInfo_RE_RUD',
    msgInfo_RE_RAT:'msgInfo_RE_RAT',
    msgInfo_RE_ACN:'msgInfo_RE_ACN',
    msgInfo_MO_MPHC:'msgInfo_MO_MPHC',
    msgInfo_SC_SCPPC:'msgInfo_SC_SCPPC',
    msgInfo_SC_SCC:'msgInfo_SC_SCC',
    msgInfo_SC_SCCE:'msgInfo_SC_SCCE',
    msgInfo_SC_SCFP:'msgInfo_SC_SCFP',
    msgInfo_SC_SCCPP:'msgInfo_SC_SCCPP',
    msgInfo_SC_SPCC:'msgInfo_SC_SPCC',
    msgInfo_SC_SCNP:'msgInfo_SC_SCNP',
    msgInfo_SC_CIC:'msgInfo_SC_CIC',
    msgInfo_SC_SNP:'msgInfo_SC_SNP',
  },
}

function utf8_encode (argString) { // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/utf8_encode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: sowberry
    // improved by: Jack
    // improved by: Yves Sucaet
    // improved by: kirilloid
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Ulrich
    // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: kirilloid
    //   example 1: utf8_encode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === 'undefined') {
      return ''
    }
    // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const string = (argString + '')
    let utftext = ''
    let start
    let end
    let stringl = 0
    start = end = 0
    stringl = string.length
    for (let n = 0; n < stringl; n++) {
      let c1 = string.charCodeAt(n)
      let enc = null
      if (c1 < 128) {
        end++
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode(
          (c1 >> 6) | 192, (c1 & 63) | 128
        )
      } else if ((c1 & 0xF800) !== 0xD800) {
        enc = String.fromCharCode(
          (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
      } else {
        // surrogate pairs
        if ((c1 & 0xFC00) !== 0xD800) {
          throw new RangeError('Unmatched trail surrogate at ' + n)
        }
        const c2 = string.charCodeAt(++n)
        if ((c2 & 0xFC00) !== 0xDC00) {
          throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
        }
        c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
        enc = String.fromCharCode(
          (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.slice(start, end)
        }
        utftext += enc
        start = end = n + 1
      }
    }
    if (end > start) {
      utftext += string.slice(start, stringl)
    }
    return utftext
  }

export const encript = (user, pwd) => {
    const pswBase64 = pwdEncripted(pwd);
    const payload = {
        user: user,
        pwd: pswBase64
    }
    let payLoadBase64 = btoa(utf8_encode(JSON.stringify(payload)))
    payLoadBase64 = btoa(utf8_encode(payLoadBase64))
    return payLoadBase64
}

export const pwdEncripted = (pwd) => {
  return btoa(utf8_encode(pwd));
}

export const permits = [
  {
    valor: "MADM",
    descripcionValor: "Módulo Administrador de Usuarios"
  },
  {
    valor: "MRSC",
    descripcionValor: "Modulo de Revisión de Solicitudes"
  },
  {
    valor: "MDSC",
    descripcionValor: "Módulo de creación solicitudes catastrales"
  },
  {
    valor: "MCSC",
    descripcionValor: "Modulo de Consulta de Solicitudes"
  }
]

export const getToken = async(user, pwd) => {
  const headers = {data:encript(user, pwd)};
  const responseGetToken = await doGetToken(headers);
  return responseGetToken;
}

export const stylesApp = {
  gray1: 'rgb(128 128 128 / 50%)'
}

export const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;

export const checkPermits = (permits, store1) => {
  const roles = store1.user.infoUser.roles;
  const Permisos = [];
  roles.forEach(rol => rol.permisos.forEach(permiso => Permisos.push(permiso)));
  const isOk = Permisos.filter(p => p.moduloDominio.valor === permits);
  return isOk.length > 0
  // const isOk = roles.filter(e => )
}

export const tiposDocumentoToTest = [
  /* {
      descripcionValor: 'Seleccione...',
      idValorLista: 0,
      valor: 'Seleccione...',
      nombreLista: 'seleccione'
  }, */
  {
      descripcionValor: 'Cedula de ciudadanía',
      idValorLista: 1,
      valor: 'CC',
      nombreLista: 'TIPO_DOCUMENTO'
  },
  {
      descripcionValor: 'Cédula de extranjería',
      idValorLista: 6,
      valor: 'CE',
      nombreLista: 'TIPO_DOCUMENTO'
  },
  {
      descripcionValor: 'Pasaporte',
      idValorLista: 7,
      valor: 'PA',
      nombreLista: 'TIPO_DOCUMENTO'
  },
];

export const regExp10Num2dec = new RegExp(/^(\d{1,10})(\.\d{1,2})?$/);
export const regExp10Num = new RegExp(/^(\d{1,10})$/);

export const SiNoOptions = [
  {
    valor:'',
    descripcionValor:'Seleccione...'
  },
  {
    valor:'S',
    descripcionValor:'Si'
  },
  {
    valor:'N',
    descripcionValor:'No'
  },
]

export const ProyectoUrbanistico = [
  {
    valor:'',
    descripcionValor:'Seleccione...'
  },
  {
    valor:'S',
    descripcionValor:'Si'
  },
  {
    valor:'N',
    descripcionValor:'No'
  },
]


export const dataTestDetalleTramite = {"resultado":{"solicitud":{"anioEscritura":"","areaConstruccion":null,"titularesPredio":[{"tipoDocumento":"CC","idTitular":177,"apellido":"BBBBB","numeroDocumento":"1111111111","idSolicitud":147,"nombre":"AAAAA"}],"estadosSolicitud":[{"estado":"Radicado","observaciones":"Creación de la solicitud","idSolicitud":147,"fechaEstado":1638878626851,"idEstadoSolicitud":101}],"diferenciaMayoEsta":"","areaTerreno":null,"objetoRectificacion":"","prediosAsociados":[{"matriculaInmobiliaria":"DDFGGGDGFGFGFDGFGFDG","idPredioAsociado":80,"numeroPredial":"FC1111111544524521452145454521","idSolicitud":147},{"matriculaInmobiliaria":"40214050","idPredioAsociado":81,"numeroPredial":"ficga1234CatasSDFSDF6GHJ656767","idSolicitud":147}],"municipioPredio":"LA PLAYA","idSolicitud":147,"municipioNotaria":"","avaluoTerreno":null,"notariaOtorgante":"","tipoInscripcion":"","nombreTramite":"Modificaciones","claseSuelo":"Urbano","noEscrituraPublica":"","tipoSolicitante":"Propietario","tipoTramite":"Modificaciones","motivoSolicitud":"Modificaciones en Propiedad Horizontal/Condominio","consideraMejora":"","revisionBusca":"","autoestimacionAvaluo":null,"objetoPeticion":"","razonSolicitud":"Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lectus nibhFGFGGFGFGFGFGFGFGGFGG FGFGGG F","idSolicitante":{"numeroCelular":"","image":"","estado":"","idUsuario":21,"roles":[],"nombreUsuario":"","nombre":"","tipoDocumento":"","ultimaFechaLogin":null,"apellido":"","fechaCreacion":1638737526987,"contrasena":"","tipoUsuario":"E","numeroDocumento":"","email":"df@sdf.sdf"},"propiedadHorizontal":"S","proyectoUrbanistico":" ","numeroRadicado":"RASOGC-147-7-12-2021","avaluoConstruccion":null}}}
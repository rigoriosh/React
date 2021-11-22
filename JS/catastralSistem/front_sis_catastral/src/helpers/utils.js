import { doGetToken } from "../api";

export const initStore = {
  timeInitSessionUser: new Date(), // inicio session
  minutesToEachSession: 10,
  user:{
      isLogin:false,
      token:'',
      user:'',
      pwd:''
    },
  openBackDrop:false,
  snackBar:{
    openSnackBar: false,
    messageSnackBar:'',
    tiempoExpiracion:'',
    severity: "success"/*  | "error" | "warning" | "info" */,
  },
  tiposDocumento:[],
};

export const pathsRoutes = {
  gestionarUsuario: "/tramites/gestionarUsuario",
  tramites: '/tramites'
}

export const textosInfoWarnig = {
  falloComunicacion:'Estamos presentando inconvenientes en la comunicación, porfavor intentalo mas tarde',
  credencialesIncorrectas:'Credenciales incorrectas',
  inconvenientesRenovarSesion: 'Se presentaron inconvenientes para renovar su sesión, debe registrarse nuevamente, gracias ',
  camposRequerdios:'Recuerda que todos los campos son obligatorios',
  campoRequerido:'Este campo es requerido',
  formatEmailInvalido:'Ingrese un email válido',
  creacionUsuario:'El usuario ha sido creado exitosamente.',
  cancelarRegistro: '¿Seguro que desea cancelar el registro?'
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

export const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
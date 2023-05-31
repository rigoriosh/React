// import { doGetToken,  } from "../api";

export const initStore = {
  modeTest:false,
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
  tiempoInactividad: '!Su sesión a finalizado por inactividad',
  diferentesEmails: 'Los correos electrónicos no coinciden',
  diferentesPassWords: 'Las contraseñas no coinciden',
  recuperarPSW: 'Por favor comuniquese al correo xxxxx@xxx.xx, solicitando recuperación de contraseña y envie copia del documento de identidad',
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


export const setTextPagTables = () => {
  const AAA = document.getElementsByClassName("MuiTablePagination-selectLabel")
  AAA.item(0).innerText = "Registros por página";
}


export const formarPath = (location, pathSelected) =>{   
  let go="";
  const arrayLocation = location.pathname.split("/");
  let pathEndFinded=false
  arrayLocation.forEach(e => {
      if(!pathEndFinded){
           if(e !== pathSelected){
             e !=="" ? go+=`/${e}` : go+=``;
           }else{
             e!==""?go+=`/${e}`:go+=``;
             pathEndFinded=true
           }

      }    
  })
  // console.log(go);
  return go;
}

export const  generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const gradosARadianes = (grados) => {
  return grados * Math.PI / 180;
};

export const calcularDistanciaEntreDosCoordenadas = (lat1, lon1, lat2, lon2) => {
  // Convertir todas las coordenadas a radianes
  lat1 = gradosARadianes(lat1);
  lon1 = gradosARadianes(lon1);
  lat2 = gradosARadianes(lat2);
  lon2 = gradosARadianes(lon2);
  // Aplicar fórmula
  const RADIO_TIERRA_EN_KILOMETROS = 6371;
  let diferenciaEntreLongitudes = (lon2 - lon1);
  let diferenciaEntreLatitudes = (lat2 - lat1);
  let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_EN_KILOMETROS * c;
};

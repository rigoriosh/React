export const getTokenTest = {
  tkn: "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJBc29tdW5pY2lwaW9zIiwic3ViIjoiQWNjZXNzVG9rZW4iLCJhdWQiOiJyaWdvcmlvc2hAZ21haWwuY29tIiwiZXhwIjoxNjc2OTk4OTgwNDUzLCJuYmYiOjE2NzY5OTUzODAsImlhdCI6MTY3Njk5NTM4MCwibmljayI6IjE4MTI5MTY0IiwianRpIjoiOTMwOWMwZDQtMWQyMC00MDIyLTgxM2UtNDk0MTRmYTUwNWYxIn0.AR40HHKMWE_GExXJfckQJi91D4EI0_3nM7hwKCbozT10dPJhzk1DL9lXK9Qqy34e",
  tiempoExpiracion: 3600000,
};
export const loginUserTest = {
  resultado: {
    usuario: {
      numeroCelular: "1234567891",
      image: "/path/to/imagen",
      estado: "A",
      idUsuario: 1,
      roles: [
        {
          idRol: 1,
          estado: "A",
          nombreRol: "Administrador",
          fechaCreacion: 1636300566000,
          permisos: [
            {
              insertar: true,
              eliminar: false,
              actualizar: true,
              idPermiso: 1,
              consultar: true,
              moduloDominio: {
                descripcionValor: "Módulo Administrador de Usuarios",
                idValorLista: 2,
                valor: "MADM",
                nombreLista: "MODULO",
                valorPadre: null,
              },
            },
            {
              insertar: true,
              eliminar: false,
              actualizar: true,
              idPermiso: 2,
              consultar: true,
              moduloDominio: {
                descripcionValor: "Modulo de Revisión de Solicitudes",
                idValorLista: 4,
                valor: "MRSC",
                nombreLista: "MODULO",
                valorPadre: null,
              },
            },
          ],
        },
      ],
      nombreUsuario: "davids",
      nombre: "David Steven",
      tipoDocumento: "CC",
      ultimaFechaLogin: 1604701850000,
      apellido: "Torres Figueroa",
      fechaCreacion: 1604701850000,
      contrasena: "",
      tipoUsuario: "I",
      numeroDocumento: "1587411224",
      email: "davids182009@gmail.com",
    },
  },
};
export const getTiposDocumentoTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Cedula de ciudadanía",
        idValorLista: 1,
        valor: "CC",
        nombreLista: "TIPO_DOCUMENTO",
      },
      {
        descripcionValor: "Cédula de extranjería",
        idValorLista: 6,
        valor: "CE",
        nombreLista: "TIPO_DOCUMENTO",
      },
      {
        descripcionValor: "Pasaporte",
        idValorLista: 7,
        valor: "PA",
        nombreLista: "TIPO_DOCUMENTO",
      },
    ],
  },
};
export const getTiposTramiteTest = {
  resultado: {
    tiposTramite: [
      {
        descripcionValor: "Modificaciones",
        idValorLista: 20,
        valor: "MO",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Solicitudes / Certificados",
        idValorLista: 21,
        valor: "SC",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Mutación de Primera",
        idValorLista: 14,
        valor: "MP",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Mutación de Segunda",
        idValorLista: 15,
        valor: "MS",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Mutación de Tercera",
        idValorLista: 16,
        valor: "MT",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Mutación de Cuarta",
        idValorLista: 17,
        valor: "MC",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Mutación de Quinta",
        idValorLista: 18,
        valor: "MQ",
        nombreLista: "TIPO_TRAMITE",
      },
      {
        descripcionValor: "Rectificaciones",
        idValorLista: 19,
        valor: "RE",
        nombreLista: "TIPO_TRAMITE",
      },
    ],
    tiposSolicitantes: [
      {
        descripcionValor: "Propietario",
        idValorLista: 8,
        valor: "PR",
        nombreLista: "TIPO_SOLICITANTE",
      },
      {
        descripcionValor: "Representante Legal",
        idValorLista: 9,
        valor: "RL",
        nombreLista: "TIPO_SOLICITANTE",
      },
      {
        descripcionValor: "Apoderado General",
        idValorLista: 10,
        valor: "AG",
        nombreLista: "TIPO_SOLICITANTE",
      },
      {
        descripcionValor: "Poseedor",
        idValorLista: 11,
        valor: "PO",
        nombreLista: "TIPO_SOLICITANTE",
      },
      {
        descripcionValor: "Otro",
        idValorLista: 12,
        valor: "OT",
        nombreLista: "TIPO_SOLICITANTE",
      },
      {
        descripcionValor: "Tramitador",
        idValorLista: 13,
        valor: "TRA",
        nombreLista: "TIPO_SOLICITANTE",
      },
    ],
  },
};
export const getTiposSueloTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Urbano",
        idValorLista: 42,
        valor: "UR",
        nombreLista: "CLASE_SUELO",
      },
      {
        descripcionValor: "Rural",
        idValorLista: 43,
        valor: "RU",
        nombreLista: "CLASE_SUELO",
      },
    ],
  },
};
export const getMunicipiosCatatumboTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "RIO DE ORO",
        idValorLista: 62,
        valor: "20614",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "ABREGO",
        idValorLista: 63,
        valor: "54003",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "CACHIRA",
        idValorLista: 64,
        valor: "54128",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "CONVENCION",
        idValorLista: 65,
        valor: "54206",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "EL CARMEN",
        idValorLista: 66,
        valor: "54245",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "EL TARRA",
        idValorLista: 67,
        valor: "54250",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "HACARI",
        idValorLista: 68,
        valor: "54344",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "LA ESPERANZA",
        idValorLista: 69,
        valor: "54385",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "LA PLAYA",
        idValorLista: 70,
        valor: "54398",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "OCAÑA",
        idValorLista: 71,
        valor: "54498",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "SAN CALIXTO",
        idValorLista: 72,
        valor: "54670",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "SARDINATA",
        idValorLista: 73,
        valor: "54720",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "TEORAMA",
        idValorLista: 74,
        valor: "54800",
        nombreLista: "MCATATUMBO",
      },
      {
        descripcionValor: "VILLA CARO",
        idValorLista: 75,
        valor: "54871",
        nombreLista: "MCATATUMBO",
      },
    ],
  },
};

export const getObjetoPeticionTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Cambio Destino Económico",
        idValorLista: 45,
        valor: "CDE",
        nombreLista: "OBJETO_PETICION",
      },
      {
        descripcionValor: "Construcción",
        idValorLista: 46,
        valor: "COS",
        nombreLista: "OBJETO_PETICION",
      },
      {
        descripcionValor: "Demolición",
        idValorLista: 47,
        valor: "DEM",
        nombreLista: "OBJETO_PETICION",
      },
      {
        descripcionValor: "Incorporación",
        idValorLista: 44,
        valor: "INCOR",
        nombreLista: "OBJETO_PETICION",
      },
    ],
  },
};
export const getConsideraMejoraTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Si",
        idValorLista: 1201,
        valor: "Si",
        nombreLista: "CONSIDERA_MEJORA",
      },
      {
        descripcionValor: "No",
        idValorLista: 1202,
        valor: "No",
        nombreLista: "CONSIDERA_MEJORA",
      },
      {
        descripcionValor: "Igual",
        idValorLista: 1203,
        valor: "Igual",
        nombreLista: "CONSIDERA_MEJORA",
      },
    ],
  },
};
export const getDiferenciaMayorTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Terreno",
        idValorLista: 1196,
        valor: "T",
        nombreLista: "DIFERENCIA_MAYOR",
      },
      {
        descripcionValor: "Construcción",
        idValorLista: 1197,
        valor: "C",
        nombreLista: "DIFERENCIA_MAYOR",
      },
      {
        descripcionValor: "Ambos",
        idValorLista: 1198,
        valor: "A",
        nombreLista: "DIFERENCIA_MAYOR",
      },
    ],
  },
};
export const getRevisionBuscaTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Disminuir",
        idValorLista: 1200,
        valor: "DI",
        nombreLista: "REVISION_BUSCA",
      },
      {
        descripcionValor: "Incrementar",
        idValorLista: 1199,
        valor: "INCRE",
        nombreLista: "REVISION_BUSCA",
      },
    ],
  },
};
export const getTipoSolicitudInsTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Inscripción Predio",
        idValorLista: 48,
        valor: "INP",
        nombreLista: "TIPO_SOLICITUD_INS",
      },
      {
        descripcionValor: "Inscripción Mejora",
        idValorLista: 49,
        valor: "INM",
        nombreLista: "TIPO_SOLICITUD_INS",
      },
    ],
  },
};
export const getObjetoRectificaTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Fines Notariales Varios",
        idValorLista: 55,
        valor: "FNV",
        nombreLista: "OBJETO_RECTIFICA",
      },
      {
        descripcionValor: "Liquidación Comunidad",
        idValorLista: 56,
        valor: "LQC",
        nombreLista: "OBJETO_RECTIFICA",
      },
    ],
  },
};
export const getTiposSolicitudTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Englobe o Agregación de un predio",
        idValorLista: 23,
        valor: "EAP",
        nombreLista: "NOMBRE_TRAMITE",
        valorPadre: "MS",
      },
      {
        descripcionValor: "Desenglobe o Desagregación de un predio",
        idValorLista: 24,
        valor: "DDP",
        nombreLista: "NOMBRE_TRAMITE",
        valorPadre: "MS",
      },
    ],
  },
};
// ?idUsuario=1&idSolicitud=179
export const getTramitePorId = {
  resultado: {
    paginacion: { totalRegistros: 1, paginaActual: 0, totalPaginas: 1 },
    solicitudes: [
      {
        estado: "Asignado",
        nombreTramite: "Modificaciones en Propiedad Horizontal/Condominio",
        idSolicitud: 179,
        numeroRadicado: "RASOGC-179-16-2-2023",
        tipoTramite: "Modificaciones",
      },
    ],
  },
};
export const paginadoTest = {
  resultado: {
    paginacion: {
      paginaActual: 0,
      totalPaginas: 10,
      totalRegistros: 117,
    },
    solicitudes: [
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 7,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 8,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 9,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 10,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 18,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 19,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 20,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 22,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 23,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
      {
        estado: "Radicado",
        nombreTramite: "Solicitud Certificado Catastral",
        idSolicitud: 24,
        tipoTramite: "Solicitudes / Certificados",
        numeroRadicado: "123456789",
      },
    ],
  },
};
export const getSolicitudId_179 = {
  resultado: {
    solicitud: {
      anioEscritura: null,
      areaConstruccion: null,
      titularesPredio: [
        {
          tipoDocumento: "CC",
          idTitular: 203,
          apellido: "Perez",
          numeroDocumento: "1313313",
          idSolicitud: 179,
          nombre: "Ana gggg",
        },
      ],
      estadosSolicitud: [
        {
          estado: "Radicado",
          observaciones: "Creación de la solicitud",
          idSolicitud: 179,
          fechaEstado: 1676594453719,
          idEstadoSolicitud: 163,
        },
        {
          estado: "Asignado",
          observaciones: "testiando",
          idSolicitud: 179,
          fechaEstado: 1676668888034,
          idEstadoSolicitud: 164,
        },
        {
          estado: "Asignado",
          observaciones: "hfhfghfgh",
          idSolicitud: 179,
          fechaEstado: 1676748988444,
          idEstadoSolicitud: 165,
        },
        {
          estado: "En Ejecución",
          observaciones: "dddd",
          idSolicitud: 179,
          fechaEstado: 1676749085104,
          idEstadoSolicitud: 166,
        },
        {
          estado: "Asignado",
          observaciones: "sssssss",
          idSolicitud: 179,
          fechaEstado: 1676749172527,
          idEstadoSolicitud: 167,
        },
        {
          estado: "En Ejecución",
          observaciones: "wwwwwww",
          idSolicitud: 179,
          fechaEstado: 1676749540119,
          idEstadoSolicitud: 168,
        },
        {
          estado: "Asignado",
          observaciones: "a juan",
          idSolicitud: 179,
          fechaEstado: 1676750415365,
          idEstadoSolicitud: 169,
        },
        {
          estado: "Asignado",
          observaciones: "rrrrrrr",
          idSolicitud: 179,
          fechaEstado: 1676904255140,
          idEstadoSolicitud: 170,
        },
        {
          estado: "Asignado",
          observaciones: "tttttttt",
          idSolicitud: 179,
          fechaEstado: 1676904550555,
          idEstadoSolicitud: 171,
        },
        {
          estado: "Asignado",
          observaciones: "aaaaa",
          idSolicitud: 179,
          fechaEstado: 1676906215055,
          idEstadoSolicitud: 172,
        },
        {
          estado: "Asignado",
          observaciones: "ggggg",
          idSolicitud: 179,
          fechaEstado: 1676909568997,
          idEstadoSolicitud: 176,
        },
        {
          estado: "Asignado",
          observaciones: "ffffff",
          idSolicitud: 179,
          fechaEstado: 1676909862658,
          idEstadoSolicitud: 178,
        },
        {
          estado: "Asignado",
          observaciones: "fsfffsfd",
          idSolicitud: 179,
          fechaEstado: 1676921152684,
          idEstadoSolicitud: 188,
        },
        {
          estado: "Asignado",
          observaciones: "hfhfhfefd",
          idSolicitud: 179,
          fechaEstado: 1676927029283,
          idEstadoSolicitud: 190,
        },
        {
          estado: "Asignado",
          observaciones: "adaadasd",
          idSolicitud: 179,
          fechaEstado: 1676934045615,
          idEstadoSolicitud: 192,
        },
        {
          estado: "Asignado",
          observaciones: "adaadasd",
          idSolicitud: 179,
          fechaEstado: 1676934048775,
          idEstadoSolicitud: 193,
        },
        {
          estado: "Asignado",
          observaciones: "dasdadadad",
          idSolicitud: 179,
          fechaEstado: 1676934220009,
          idEstadoSolicitud: 194,
        },
        {
          estado: "Asignado",
          observaciones: "dasdadadad",
          idSolicitud: 179,
          fechaEstado: 1676934223065,
          idEstadoSolicitud: 195,
        },
        {
          estado: "Asignado",
          observaciones: "sdfsdffsdf",
          idSolicitud: 179,
          fechaEstado: 1676934269237,
          idEstadoSolicitud: 196,
        },
        {
          estado: "Asignado",
          observaciones: "sdfsdffsdf",
          idSolicitud: 179,
          fechaEstado: 1676934272292,
          idEstadoSolicitud: 197,
        },
        {
          estado: "En Ejecución",
          observaciones: "hjjhkghjk",
          idSolicitud: 179,
          fechaEstado: 1676934375875,
          idEstadoSolicitud: 198,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934506149,
          idEstadoSolicitud: 199,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934509387,
          idEstadoSolicitud: 200,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934512493,
          idEstadoSolicitud: 201,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934515565,
          idEstadoSolicitud: 202,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934518633,
          idEstadoSolicitud: 203,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934521746,
          idEstadoSolicitud: 204,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934524739,
          idEstadoSolicitud: 205,
        },
        {
          estado: "Asignado",
          observaciones: "khjkhkhkhk",
          idSolicitud: 179,
          fechaEstado: 1676934527822,
          idEstadoSolicitud: 206,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934660776,
          idEstadoSolicitud: 207,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934663903,
          idEstadoSolicitud: 208,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934666967,
          idEstadoSolicitud: 209,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934669859,
          idEstadoSolicitud: 210,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934672731,
          idEstadoSolicitud: 211,
        },
        {
          estado: "Asignado",
          observaciones: "rtrtd",
          idSolicitud: 179,
          fechaEstado: 1676934675727,
          idEstadoSolicitud: 212,
        },
        {
          estado: "Asignado",
          observaciones: "ghjgjgj",
          idSolicitud: 179,
          fechaEstado: 1676934809035,
          idEstadoSolicitud: 213,
        },
        {
          estado: "Generado",
          observaciones: "ffgjgfjfg",
          idSolicitud: 179,
          fechaEstado: 1676934904820,
          idEstadoSolicitud: 214,
        },
        {
          estado: "Asignado",
          observaciones: "jghjfjhjgj",
          idSolicitud: 179,
          fechaEstado: 1676987315817,
          idEstadoSolicitud: 216,
        },
        {
          estado: "Asignado",
          observaciones: "yhjjgj",
          idSolicitud: 179,
          fechaEstado: 1676987378497,
          idEstadoSolicitud: 217,
        },
        {
          estado: "Asignado",
          observaciones: "ddfgdgdg",
          idSolicitud: 179,
          fechaEstado: 1676987465083,
          idEstadoSolicitud: 218,
        },
        {
          estado: "Asignado",
          observaciones: "asdsadadadaddadreerrerrrrr",
          idSolicitud: 179,
          fechaEstado: 1676995197123,
          idEstadoSolicitud: 221,
        },
      ],
      diferenciaMayoEsta: null,
      areaTerreno: null,
      objetoRectificacion: null,
      prediosAsociados: [
        {
          matriculaInmobiliaria: "M11111111",
          idPredioAsociado: 98,
          numeroPredial: "64564666466466666445",
          idSolicitud: 179,
        },
      ],
      municipioPredio: "LA PLAYA",
      idSolicitud: 179,
      municipioNotaria: null,
      avaluoTerreno: null,
      notariaOtorgante: null,
      tipoInscripcion: null,
      nombreTramite: "Modificaciones en Propiedad Horizontal/Condominio",
      claseSuelo: "Urbano",
      noEscrituraPublica: null,
      tipoSolicitante: "Propietario",
      tipoTramite: "Modificaciones",
      motivoSolicitud: "Modificaciones en Propiedad Horizontal/Condominio",
      consideraMejora: null,
      revisionBusca: null,
      autoestimacionAvaluo: null,
      objetoPeticion: null,
      razonSolicitud: "xcvxvvxvxv",
      idSolicitante: {
        numeroCelular: "",
        image: "",
        estado: "",
        idUsuario: 17,
        roles: [],
        nombreUsuario: "",
        nombre: "",
        tipoDocumento: "",
        ultimaFechaLogin: null,
        apellido: "",
        fechaCreacion: 1637182730223,
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "",
        email: "rigoriosh@gmail.com",
      },
      propiedadHorizontal: "S",
      proyectoUrbanistico: null,
      numeroRadicado: "RASOGC-179-16-2-2023",
      avaluoConstruccion: null,
    },
  },
};
export const getSolicitudId_User_179 = {
  resultado: {
    paginacion: { totalRegistros: 1, paginaActual: 0, totalPaginas: 1 },
    solicitudes: [
      {
        estado: "Generado",
        nombreTramite: "Modificaciones en Propiedad Horizontal/Condominio",
        idSolicitud: 179,
        numeroRadicado: "RASOGC-179-16-2-2023",
        tipoTramite: "Modificaciones",
      },
    ],
  },
};
export const getEstadosSolicitudTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "Radicado",
        idValorLista: 57,
        valor: "ES1",
        nombreLista: "ESTADO_SOLICITUD",
      },
      {
        descripcionValor: "Asignado",
        idValorLista: 58,
        valor: "ES2",
        nombreLista: "ESTADO_SOLICITUD",
      },
      {
        descripcionValor: "En Ejecución",
        idValorLista: 59,
        valor: "ES3",
        nombreLista: "ESTADO_SOLICITUD",
      },
      {
        descripcionValor: "Generado",
        idValorLista: 1204,
        valor: "ES4",
        nombreLista: "ESTADO_SOLICITUD",
      },
      {
        descripcionValor: "Si Rechazo",
        idValorLista: 1205,
        valor: "ES5",
        nombreLista: "ESTADO_SOLICITUD",
      },
      {
        descripcionValor: "Finalizado",
        idValorLista: 1206,
        valor: "ES6",
        nombreLista: "ESTADO_SOLICITUD",
      },
    ],
  },
};
export const updateEstadoSolicitudTest = {
  resultado: { mensaje: "Se actualizo correctamente la solicitud" },
};
export const getUsersTest = {
  resultado: {
    users: [
      {
        numeroCelular: "3101111111",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 21,
        nombreUsuario: "123456",
        nombre: "Ana",
        tipoDocumento: "CC",
        apellido: "Diaz",
        fechaCreacion: "2021-12-05 15:52:06.987",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "123456",
        email: "df@sdf.sdf",
      },
      {
        numeroCelular: "3105454546",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 12,
        nombreUsuario: "1234567891",
        nombre: "Rigo",
        tipoDocumento: "CC",
        apellido: "Rios",
        fechaCreacion: "2021-11-15 06:47:48.025",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "1234567891",
        email: "dfdgfgdgfdg@sfdf.com",
      },
      {
        numeroCelular: "3106334692",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 27,
        nombreUsuario: "1022343061",
        nombre: "Juan Carlos",
        tipoDocumento: "CC",
        apellido: "Melo",
        fechaCreacion: "2021-12-09 14:04:48.59",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "1022343061",
        email: "civil.melo@gmail.com",
      },
      {
        numeroCelular: "3106888888",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 29,
        nombreUsuario: "55555",
        nombre: "bbbbbb",
        tipoDocumento: "CC",
        apellido: "ccccccc",
        fechaCreacion: "2021-12-14 13:04:03.111",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "55555",
        email: "dfdf@sdsd.com",
      },
      {
        numeroCelular: "3215654789",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 22,
        nombreUsuario: "12345",
        nombre: "Luis",
        tipoDocumento: "CC",
        apellido: "Luises",
        fechaCreacion: "2021-12-06 15:48:12.71",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "12345",
        email: "dtorres@dejsoftware.com",
      },
      {
        numeroCelular: "8000000000",
        image: "/uploads/user_default.svg",
        estado: "A",
        roles: [
          {
            idRol: 1,
            estado: "A",
            nombreRol: "Administrador",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 30,
        nombreUsuario: "1111111",
        nombre: "aaa",
        tipoDocumento: "CC",
        apellido: "aaa",
        fechaCreacion: "2023-02-10 20:03:01.152",
        contrasena: "",
        tipoUsuario: "I",
        numeroDocumento: "1111111",
        email: "aaa@aa.aaa",
      },
      {
        numeroCelular: "3106777777",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 17,
        nombreUsuario: "18129164",
        nombre: "Rigoberto",
        tipoDocumento: "CC",
        apellido: "Rios Hueso",
        fechaCreacion: "2021-11-17 15:58:50.223",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "18129164",
        email: "rigoriosh@gmail.com",
      },
      {
        numeroCelular: "1234567891",
        image: "/path/to/imagen",
        estado: "A",
        roles: [
          {
            idRol: 1,
            estado: "A",
            nombreRol: "Administrador",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 1,
        nombreUsuario: "davids",
        nombre: "David Steven",
        ultimaFechaLogin: "2020-11-06 17:30:50.0",
        tipoDocumento: "CC",
        apellido: "Torres Figueroa",
        fechaCreacion: "2020-11-06 17:30:50.0",
        contrasena: "",
        tipoUsuario: "I",
        numeroDocumento: "1587411224",
        email: "davids182009@gmail.com",
      },
      {
        numeroCelular: "8000000",
        image: "/uploads/user_default.svg",
        estado: "A",
        roles: [
          {
            idRol: 1,
            estado: "A",
            nombreRol: "Administrador",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 7,
        nombreUsuario: "admin",
        nombre: "nombre usuario",
        tipoDocumento: "CC",
        apellido: "apellido usuario",
        fechaCreacion: "2021-11-10 21:45:47.518",
        contrasena: "",
        tipoUsuario: "I",
        numeroDocumento: "1234554221",
        email: "prueba@asomunicipios.com",
      },
      {
        numeroCelular: "3106777777",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 16,
        nombreUsuario: "78787878",
        nombre: "Rigoberto",
        tipoDocumento: "CC",
        apellido: "Rios Hueso",
        fechaCreacion: "2021-11-15 11:50:14.931",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "78787878",
        email: "rigoriosh@gmail.com",
      },
      {
        numeroCelular: "1234567891",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 19,
        nombreUsuario: "123456789",
        nombre: "Thiago",
        tipoDocumento: "CE",
        apellido: "Rios",
        fechaCreacion: "2021-11-24 15:46:27.518",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "123456789",
        email: "rigoriosh@gmail.com",
      },
      {
        numeroCelular: "8000000",
        estado: "A",
        roles: [
          {
            idRol: 2,
            estado: "A",
            nombreRol: "Usuario_Externo",
            fechaCreacion: "2021-11-07 10:56:06.0",
          },
        ],
        idUsuario: 8,
        nombreUsuario: "externo nuevo",
        nombre: "test nombre",
        tipoDocumento: "CC",
        apellido: "test apellido",
        fechaCreacion: "2021-11-14 12:34:10.653",
        contrasena: "",
        tipoUsuario: "E",
        numeroDocumento: "1285988664",
        email: "prueba@asomunicipios.com",
      },
    ],
  },
};
export const getMotivoSolicitudTest = {
  resultado: {
    dominios: [
      {
        descripcionValor: "No Declarada",
        idValorLista: 50,
        valor: "ND",
        nombreLista: "MOTIVO_SOLICITUD",
      },
      {
        descripcionValor: "Omitida En Formación O Actualización Catastral",
        idValorLista: 51,
        valor: "OFAC",
        nombreLista: "MOTIVO_SOLICITUD",
      },
      {
        descripcionValor: "Actualización De Linderos",
        idValorLista: 52,
        valor: "ACTLI",
        nombreLista: "MOTIVO_SOLICITUD",
      },
      {
        descripcionValor: "Rectificación De Área Por Imprecisa Determinación",
        idValorLista: 53,
        valor: "REAID",
        nombreLista: "MOTIVO_SOLICITUD",
      },
      {
        descripcionValor:
          "Rectificación De Linderos Por Acuerdo Entre Las Partes",
        idValorLista: 54,
        valor: "RELA",
        nombreLista: "MOTIVO_SOLICITUD",
      },
    ],
  },
};
// mutacion de quita
export const payloadCreateTramite = {
  "anioEscritura": "2020",
  "areaConstruccion": null,
  "areaTerreno": null,
  "autoestimacionAvaluo": null,
  "avaluoConstruccion": null,
  "avaluoTerreno": null,
  "claseSuelo": "RU",
  "consideraMejora": null,
  "diferenciaMayoEsta": null,
  "idSolicitante": {
    "idUsuario": 17
  },
  "motivoSolicitud": "INCP",
  "municipioNotaria": "05055",
  "municipioPredio": "20614",
  "noEscrituraPublica": "65454564654564646546",
  "nombreTramite": "INCP",
  "notariaOtorgante": "35",
  "numeroRadicado": "123456789",
  "objetoPeticion": null,
  "objetoRectificacion": null,
  "prediosAsociados": [
    {
      "numeroPredial": "31323121313213213212",
      "matriculaInmobiliaria": "fggfgg"
    }
  ],
  "propiedadHorizontal": null,
  "proyectoUrbanistico": null,
  "razonSolicitud": "sfsfsfsdfsdf",
  "revisionBusca": null,
  "tipoInscripcion": "INP",
  "tipoSolicitante": "PR",
  "tipoTramite": "MQ",
  "titularesPredio": [
    {
      "nombre": "ana",
      "apellido": "perez",
      "tipoDocumento": "CC",
      "numeroDocumento": "321465798"
    }
  ]
}

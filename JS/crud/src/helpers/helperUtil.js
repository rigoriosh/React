const moment = require('moment');

export const getDiaMesAnio = () => {
    return moment().format("LLLL"); // eje: martes, 4 de mayo de 2021 21:20
}

export const nombreRepetido = (coleccion, nuevoRegistro, campoDiscriminador) => {
    console.log("nombreRepetido")
    if (!coleccion || coleccion.length === 0) return false
    const registroRepetido = coleccion.find(e => e[campoDiscriminador].toUpperCase() === nuevoRegistro[campoDiscriminador].toUpperCase());
    return registroRepetido ? true : false;
}

export const esFlotante = (dato) => {

    const datoIn = dato * 1
    if (isNaN(datoIn)) return false

    dato = dato.toString();
    let esFloat = false
    dato.split('').forEach(e => {
        if (e === '.') {
            esFloat = true;
        }
    })

    if (esFloat) return true

    return false
}

export const esEntero = (dato) => {

    const datoIn = dato * 1
    if (isNaN(datoIn)) return false

    dato = dato.toString();
    let esFloat = true
    dato.split('').forEach(e => {
        if (e === '.') {
            esFloat = false;
        }
    })

    if (esFloat) return true

    return false
}

const getRandIndex = (maxLength) => (Math.floor(Math.random() * maxLength));
export const verOtraImagen = () => { // genera imagen para el captcha
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d');
    let captch = Math.random().toString(36).substring(2, 8);

    ctx.font = '30px Georgia';
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = 'orange';
    const maxLength = captch.length;
    const index1 = getRandIndex(maxLength);
    //const index2 = getRandIndex(maxLength);

    captch = captch.substring(0, index1 - 1) + captch[index1].toUpperCase() + captch.substring(index1 + 1, maxLength);
    //captch = captch.substring(0, index2 - 1) + captch[index2].toUpperCase() + captch.substring(index2 + 1, maxLength);
    const data = captch;

    captch = captch.split("").join('  ')
    ctx.fillText(captch, 40, 40);

    return data;
    //refCaptchat.current.focus()
}


//nombreParametro
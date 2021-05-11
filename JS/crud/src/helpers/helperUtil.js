export const nombreRepetido = (coleccion, nuevoRegistro, campoDiscriminador) => {
    console.log("nombreRepetido")
    if (!coleccion || coleccion.length === 0) return false
    const registroRepetido = coleccion.find(e => e[campoDiscriminador].toUpperCase() === nuevoRegistro[campoDiscriminador].toUpperCase());
    return registroRepetido ? true : false;
}

export const nombreRepetidoValoresTipo = (coleccion, nuevoRegistro, campoDiscriminador) => {
    console.log("nombreRepetido")
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


//nombreParametro
import React from 'react'

export const ConsultarTramite = () => {
    return (
        <div>
            <h1>ConsultarSolicitud</h1>
        </div>
    )
}

// // {"user":"davids", "pwd": "cHJ1ZWJh"}
// encodeOne = btoa("cHJ1ZWJh"); //encripto solo el pwd
// // resultado de lo anterior => 'Y0hKMVpXSmg='

// encodeOne = encodeTwo = btoa({"user":"davids", "pwd": encodeOne}); //encripto todo el pwd ya encriptado
// // resultado de lo anterior => 'W29iamVjdCBPYmplY3Rd='

// encodeThree = btoa(encodeTwo); //encripto el resultado del paso anterior
// // resultado de lo anterior => 'VzI5aWFtVmpkQ0JQWW1wbFkzUmQ='
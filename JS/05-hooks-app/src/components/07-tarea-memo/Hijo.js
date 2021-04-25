import React from 'react'

export const Hijo = React.memo((datosEntrada) => {
    //console.log(datosEntrada)

    const { numero, incrementar} = datosEntrada;
    //console.log('  Me volví a generar :(  ');

    return (
        <button
            className="btn btn-primary mr-3"
            onClick={ () => incrementar( numero ) }
        >
            { numero }
        </button>
    )
})

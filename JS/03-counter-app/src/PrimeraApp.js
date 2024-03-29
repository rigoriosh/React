import React from 'react';
import PropTypes from 'prop-types'

const PrimeraApp = ({saludo, otra='valor por defecto', ejNum, ejem2})=>{
    const funTest = ()=>"testing";
    const obj = {
        valor1: "saludando",
        valor2: 465
    }
    
    return (
        <>  
            <h5>{funTest()}</h5>
            <code>{JSON.stringify(obj)}</code>
            <h1>{saludo}</h1>
            <p>{otra}</p>
            <p>{ejNum}</p>
            <p>{ejem2}</p>
        </>
    )
}

PrimeraApp.propTypes={
    ejem2: PropTypes.string.isRequired,//valida q la propiedad ejem2 sea de tipo string y no null
    ejNum: PropTypes.number//valida q la propiedad sea de tipo numero
}

PrimeraApp.defaultProps={//define los valores por defecto de las propiedades
    saludo: 'otra forma de definir valores por defecto',
    
}

export default PrimeraApp;
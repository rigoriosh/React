import React, {useState} from 'react';
import PropTypes from 'prop-types'


const CounterApp =({value})=>{
    const [counter, setCounter] = useState(value)//inicia la variable counter en 0, lo angerior es el hook
    const ad = (e)=>{        
        //setCounter(counter + 1)
        setCounter((counter)=> counter+ 1)//lo mismo q la linea anterior
    }
    const reset = (e)=> setCounter((counter)=> value)
    const rest = (e) => setCounter((counter)=> counter- 1)
    const state = useState('Goku');
    console.log(state)
    const [nombre, setNombre] = state
    console.log(nombre, setNombre) 
    return(
        <>
            <h1>CounterApp</h1>
            <h2> { counter } </h2>
            <button onClick={ad}>+1</button>
            <button onClick={reset}>Reset</button>
            <button onClick={rest}>-1</button>
        </>
    )
}


CounterApp.prototype={
    value: PropTypes.number
}

export default CounterApp






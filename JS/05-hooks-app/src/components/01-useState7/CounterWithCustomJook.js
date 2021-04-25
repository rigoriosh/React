import React from 'react'
import { useCounter } from '../../hooks/useCounter'

export const CounterWithCustomJook = ({counter2}) => {

    //console.log(counter2);

    const {stateCounter, accion, reset} = useCounter(counter2)

    return (
        <>
            <h3>Counter with Hook custome {stateCounter}</h3>   
            <hr/>

            <button className="btn btn-primary" onClick={()=>accion('sumar')}>+ 1</button>
            <button className="btn btn-success" onClick={()=>accion('rest')}>- 1</button>
            <button className="btn btn-success" onClick={reset}>Reset</button>
        </>
    )
}

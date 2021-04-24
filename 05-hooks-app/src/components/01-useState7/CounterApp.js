
import React, { useState } from 'react'
import './counter.css';
import { CounterWithCustomJook } from './CounterWithCustomJook';


export const CounterApp = () => {

    const [counter, setcounter] = useState(
        {
            counter1: 99,
            counter2: 20,
            counter3: 30
        }
    );

    const {counter1, counter2} = counter;
    

    return (
        <>
            <h1>Counter {counter1}</h1>
            <h1>Counter {counter2}</h1>
            <hr/>

            <button className="btn btn-primary" onClick={() => {
                setcounter(
                    {
                       ...counter,
                       counter2: counter2 + 1 
                    });
               }}
               >++1</button>
               <CounterWithCustomJook counter2 = {counter2}/>
        </>
    )
}

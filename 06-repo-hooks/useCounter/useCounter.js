import { useState } from "react"

 
 export const useCounter = (initialState = 10) => {
 
    const [contador, setCounter] = useState(initialState);

    const accion = (a) =>{
        if(a === 'sumar'){
            setCounter(contador + 1)}
        else if(a === 'rest'){
            setCounter(contador - 1);
        }
    }

    const reset = () => {
        setCounter(initialState);
    }

    return{
        contador,
        accion,
        reset
    }

 }
 
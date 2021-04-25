import React, { useState, useRef } from 'react'

const FocusApp = () => {
    const [text, setText] = useState("");
    const inputRef = useRef();
    const inputRefCheck = useRef();

    alert('quede en 12.38 min')

    const handleFocus = () => {

        const input = inputRef.current;
        console.log(input.value);
        input.focus();

        
        input.value = "Valor mutado"; // mala practica, no se debe hacer


        /* const check = inputRefCheck.current;
        check.focus(); */

        // const input = document.getElementById("input");
        // console.log(input.value);
        // input.value = "Texto mutado";
        // input.focus();
    }
    
    return (
        <div>
            <input 
                ref={inputRef}
                // id="input"
                type="text"
                value={text}
                onChange={({target}) => setText(target.value)}
            />
            <button onClick={handleFocus}>
                Focus
            </button>
            <br/>
            <label htmlFor="aa"></label>
            <input type="number" name="aa" id="aa" ref={inputRefCheck}/>
        </div>
    )
}

export default FocusApp
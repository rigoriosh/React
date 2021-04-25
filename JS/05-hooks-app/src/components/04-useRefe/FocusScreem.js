import React, { useRef } from 'react'

export const FocusScreem = () => {

    const inputRef = useRef()

    const handleClick = () => {
        inputRef.current.select();
    }



    return (
        <>
            <h3>Focus Screem</h3>   
            <input ref={inputRef} className="form-control mb-5" placeholder="Your name"/>

            <button className="btn btn-dark" onClick={handleClick}>Focus</button>







            <div className="linea" ></div>        
        </>
    )
}

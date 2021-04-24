import React, { useState } from 'react'
import { MultipleCustomHooks } from '../03-examples/MultipleCustomHooks'

export const RealExampleRef = () => {
    const [show, setshow] = useState(false)




    return (
        <>
        <h3>RealExampleRef</h3>
        <hr/>
        <button className="btn btn-outline-dark mt-3"
        onClick={()=>{setshow(!show)}}>Show/Hide</button>
        {show && <MultipleCustomHooks/> }

        



        <div className="linea" ></div>
        </>
    )
}

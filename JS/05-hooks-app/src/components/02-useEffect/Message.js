import React, {useEffect, useState} from 'react'

export const Message = () => {

    const [Coords, setCoords] = useState({x:0, y: 0})

    const {x, y} = Coords;

    //console.log('Hi Message')

    useEffect(() => {
        //console.log('componente montado');
        const mouseMove = (e) => {            
            const coord = {x: e.x, y: e.y};            
            //console.log(coord)
            setCoords(coord)
        }
         window.addEventListener('mousemove', mouseMove)
        
        return () => {
            //console.log('componentes desmontado');
            window.removeEventListener('mousemove', capturaMouse.mouseMove)
        }
    }, [])

    function capturaMouse(){

        
    }

    return (
        <>
            <h3>You are fine!</h3>
            <h4>x : {x}</h4>
            <h4>y : {y}</h4>
        </>
    )
}



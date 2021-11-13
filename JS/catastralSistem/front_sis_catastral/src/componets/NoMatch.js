import React from 'react'
import { Link } from 'react-router-dom'

export const NoMatch = () => {
    return (
        <div style={{paddingLeft:'40%'}}>
            <h2>Ruta invalida!</h2>
            <p>
                <Link to="/">Regresar</Link>
            </p>
        </div>
    )
}

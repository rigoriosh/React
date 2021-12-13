import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NoMatch = () => {
    const navigate = useNavigate();
        
    useEffect(() => {
        navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div style={{paddingLeft:'40%'}}>
            <h2>Ruta invalida!</h2>
            <p>
                <Link to="/">Regresar</Link>
            </p>
        </div>
    )
}

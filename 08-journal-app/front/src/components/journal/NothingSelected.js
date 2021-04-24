import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="NothingSelected__main-content animate__animated animate__pulse">
            <p>
                Selecciona una nota
                <br/>
                para realizarle cambios
            </p>
            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}

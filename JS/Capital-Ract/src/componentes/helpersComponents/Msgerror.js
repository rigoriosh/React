import React from 'react'

const Msgerror = props => {
    
    return (
        <>
            {//alert para los mensajes de validacion
                        props.msgError !== "" && 
                        (
                            <>
                                
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Nota!</strong> {props.msgError}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>                                    
                        </>
                        )
                } 
        </>
    )
}


export default Msgerror

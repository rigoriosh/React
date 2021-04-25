import React from 'react'
import { Pedido } from './menu/Pedido'

export const Facturacion = ({history}) => {
    console.log({history})
    return (
        <div className=" container">
            <button type="button" className="btn btn-dark btn-block" onClick={()=>{history.goBack()}}>
                <i className="fa fa-arrow-left"></i> Return            
            </button>
            <Pedido history={history} facturacion={true}/>
            Facturacion
        </div>
    )
}

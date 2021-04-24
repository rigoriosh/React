import React from 'react';
import noimages from '.././/../assets/images/noImages.png';

export const CardProductoMuestra = ({producto}) => { 
    
    console.log({producto})
    
    return (
        <div className=" cardProducto text-center" style={{'backgroundColor': JSON.parse(producto.color).hex}}>
            <p>Vista previa</p>
                {/* <img src={producto.imagen}  className="card-img-top" alt="Card  cap"/>  */}
                {
                    (producto.imagen.length === 0) 
                    ? (<img src={noimages} alt="No " />)
                    :(
                        <img height="200" style={{"maxWidth": "250px"}} src={producto.imagen} alt="anything"/>  
                    )
                }               
                <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>     
                    <p className="card-text">{producto.description}</p>
                    <h5>Precio: {producto.price}</h5>                    
                </div>
            </div>
    )
}

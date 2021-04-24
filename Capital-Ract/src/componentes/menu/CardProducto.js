import React, { useContext, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import noimages from '.././/../assets/images/noImages.png';

export const CardProducto = ({producto, updateMenu, setupdateMenu}) => {
    const [cantidadPedido, setCantidadPedido] = useState(0); 
    const menuContext = useContext(MenuContext); 
    const {pedido, setPedido} = menuContext;
    
    
    //console.log({producto})
    //console.log({menuContext})

    if(pedido.length > 0){
        const productoPedidoPendiente = pedido.find(e => e.producto.id === producto.id);
        if (productoPedidoPendiente && (productoPedidoPendiente.cuantasPidieron !== cantidadPedido)) {
            setCantidadPedido(productoPedidoPendiente.cuantasPidieron)
        }
    }

    const fixPedido = (action) => {
        let cuantasPidieron = 0;
        if(action === 'sumar'){
            cuantasPidieron = cantidadPedido + 1;
        }else{
            cuantasPidieron = cantidadPedido - 1;            
        }
        setCantidadPedido(cuantasPidieron);
        
        const productoSeleccionado = pedido.find(e => e.producto.id === producto.id);            
        if(productoSeleccionado){
            const index = pedido.findIndex(e => e.producto.id === producto.id);
            productoSeleccionado.cuantasPidieron = cuantasPidieron;
            pedido[index] = productoSeleccionado
        }else{
            pedido.push({producto, cuantasPidieron})
        }            
        
        setPedido(pedido);

        setupdateMenu(!updateMenu);
        //addPedido(producto, cuantasPidieron);
    }
    
    
    
    return (
        <>            
            <div className="cardProducto text-center mt-1" style={{'backgroundColor': JSON.parse(producto.color).hex}}>
                {/* <img src={producto.imagen}  className="card-img-top" alt="Card  cap"/>  */}            
                               
                <div className="card-body">

                    <div className="row">
                        <div className="col" style={{"maxWidth": "100px", "position": "initial"}}>
                        {
                            (producto.imagen.length === 0) 
                            ? (<img src={noimages} alt="No " />)
                            :(
                                <img height="200" style={{"maxWidth": "150px"}} src={producto.imagen} alt="anything"/>  
                            )
                        }
                        </div>
                        <div className="col" style={{"width": "200px"}}>
                            <h5 className="card-title">{producto.name}</h5>     
                            <p className="card-text">{producto.description}</p>
                            <h5>Precio: {producto.price}</h5>
                            {
                                (cantidadPedido > 0) && (<p>Cantidad: {cantidadPedido}</p>)
                            }                    
                            <button onClick={() => fixPedido('sumar')} type="button" className="btn btn-success rounded-circle" style={{"marginRight": "5px"}}><i className="fas fa-plus" style={{"padding": "0px 0px 0px 0px"}}></i></button>
                            {
                                (cantidadPedido > 0) && (
                                <button onClick={() => fixPedido('restar')} type="button" className="btn btn-dark rounded-circle" style={{"marginRight": "5px"}}><i className="fas fa-minus" style={{"padding": "0px 0px 0px 0px"}}></i></button> 
                                )
                            }
                        </div>
                    </div>
                                       
                </div>
                
            </div>
        </>
    )
}

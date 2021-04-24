import React, { useContext, useState } from 'react'
import { MenuContext } from '../../context/MenuContext';

export const Pedido = ({history, facturacion=false}) => {
    const menuContext = useContext(MenuContext);
    const {pedido} = menuContext;
    const NoMesas = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5', 'Mesa 6', 'Mesa 7', 'Mesa 8', 'Mesa 9', 'Mesa 10'];
    const [mesaSelected, setmesaSelected] = useState()
    const mediosDePago = ['Efectivo', 'Traer datáfono'];
    const [medioDePagoSelected, setMedioDePagoSelected] = useState();
    console.log(pedido)   
    let total = 0;
    pedido.forEach(p => {
        total += (p.producto.price * p.cuantasPidieron)
    });
    console.log({history})
    const goBilling = () => {
        history.push('/owner/facturacion');
    }
    console.log({mesaSelected});
    console.log({medioDePagoSelected})
    return (
        <div className="d-flex mt-4" >  
            <div id="pedidos"  style={{"width": "100%"}}>                                
                <div className="alert alert-success mb-0 text-center small" role="alert">MI PEDIDO</div>    
                <table className="table table-sm table-striped table-dark animate__headShake text-center mt-0 mb-0 ">
                <thead>
                    <tr>            
                    <th scope="col">Ítem</th>
                    <th scope="col">V.Unidad</th>          
                    <th scope="col">Cntas</th>
                    <th scope="col">SubT</th>            
                    </tr>
                </thead>
                <tbody >
                    {
                        pedido.map(({producto, cuantasPidieron}) => {
                            return (
                                <tr key={producto.id}  className="table-active" >
                                    <th scope="row">{producto.name}</th>
                                    <td>${producto.price}</td>
                                    <td>{cuantasPidieron}</td>
                                    <td>${producto.price * cuantasPidieron}</td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                </table>
                
               {
                   (!facturacion) && (
                    <button onClick={goBilling} type="button" className="btn btn-info btn-block btnPedido">
                        <i className="fas fa-shopping-cart block" style={{"padding": "0px 1px 0px 5px"}}></i>
                        Realizar pedido
                        <span className="badge badge-dark">Total: ${total}</span>
                    </button>
                   )
               }
               {
                   (facturacion) && (
                       <>
                            <h4><span className="badge badge-success mr-5 text-size">El total de la compra es: ${total}</span></h4>
                            <hr/>
                            <label htmlFor="selectCategory">En que mesa te encuentras</label>
                            <select id="selectCategory" onChange={s => setmesaSelected(s.target.value)} value={mesaSelected} className="form-control">
                                <option value="select...">Select</option>
                                {
                                    NoMesas.map(e => {
                                        return <option key={e} value={e}>{e}</option>
                                    })
                                }
                            </select>
                            <hr/>
                            <label htmlFor="selectCategory">Medio de pago</label>
                            <select id="selectCategory" onChange={s => setMedioDePagoSelected(s.target.value)} value={medioDePagoSelected} className="form-control">
                                <option value="select...">Select</option>
                                {
                                    mediosDePago.map(e => {
                                        return <option key={e} value={e}>{e}</option>
                                    })
                                }
                            </select>
                            
                            <button  type="button" className="btn btn-info btn-block btnPedido">
                                
                                <i className="fas fa-shopping-cart block" style={{"padding": "0px 1px 0px 5px"}}></i>
                                Pedir                                
                            </button>
                        </>
                   )
               }
            </div>
        </div>
    )
}

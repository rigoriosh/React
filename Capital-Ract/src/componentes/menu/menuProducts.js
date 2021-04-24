import React from 'react'
import { CardProducto } from "./CardProducto";


export const MenuProducts = ({products, updateMenu, setupdateMenu}) => {
    
    return (
        <div className="cardsMenu  mt-5 ">           
            {
                products.map(d => {
                    return (                        
                        <CardProducto key={d.id} producto={d} updateMenu={updateMenu} setupdateMenu = {setupdateMenu}/>
                    )
                })
            }

            
        </div>
    )
}

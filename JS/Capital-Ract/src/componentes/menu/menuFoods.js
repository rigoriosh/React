import React from 'react'
import { CardProducto } from './CardProducto';

export const MenuFoods = ({foods, updateMenu, setupdateMenu}) => {
    
    return (
        <div className="cardsMenu animated fadeIn faster container mt-5 d-flex flex-column align-items-center">
            {
                foods.map(d => {
                    return (                        
                        <CardProducto key={d.id} producto={d} updateMenu={updateMenu} setupdateMenu = {setupdateMenu}/>
                    )
                })
            }
        </div>
    )
}

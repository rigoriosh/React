import { createContext, useState } from "react";


export const MenuContext = createContext();

export const MenuContextProvider = ({children}) => {
    
    const [pedido, setPedido] = useState([
        /* {
          idPedido: '1',
          mesa: 5,
          nameCliente:'rigo',
          correoCliente: 'r@gmail.com',
          productos: [
            {
              cantidad: 5,
              nameP:'Aguila',
              descripcionP: '350mm',
              precioUni: '3500',          
            },
            {
              cantidad: 2,
              nameP:'Empanadas',
              descripcionP: '',
              precioUni: '3500',          
            }
          ],
          precioTotalPedido: 5252
        } */
      ]);

    return (
        <MenuContext.Provider value = {{pedido, setPedido}}>
            {children}
        </MenuContext.Provider>
    )
}
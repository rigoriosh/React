
import {useState } from 'react';
import { Provider } from 'react-redux';
import { MenuContext } from './context/MenuContext';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

function App() {
  
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
  ])
  return <>
    <Provider store = { store}>      
      <MenuContext.Provider value={{pedido, setPedido}}>
        <AppRouter/>
      </MenuContext.Provider>
    </Provider>  
  
  </>

  
}

export default App;

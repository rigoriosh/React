

import { Provider } from 'react-redux';
import {MenuContextProvider} from './context/MenuContext'
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

function App() {
  
  
  return <>
    <Provider store = { store}>     
      <MenuContextProvider>
        <AppRouter/>
      </MenuContextProvider>      
    </Provider>  
  
  </>

  
}

export default App;

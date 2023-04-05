import { createContext, useEffect, useState } from 'react'
import './styles/App.css'
import { LoginPage } from './pages/login/LoginPage'
import { PuntoPage } from './pages/formulario/PuntoPage'
import { HomePage } from './pages/home/HomePage'
import { FormTest } from './pages/formulario/FormTest'
import { menu } from './helpers/constantes'
import { Backdrop, CircularProgress, Slide } from '@mui/material'
import { SnackbarProvider } from 'notistack'

const initStore = {
  menuSelected: menu.Home,
  subMenuSelected:"",
  openBackop: false
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export const StoreContext = createContext(null);

function App() {
  
  const [store, setStore] = useState(initStore);
  const [login, setLogin] = useState({
    isLogin:false
  })
  const{openBackop}=store;
  const closeBackDrop = () => {
    setStore({...store, openBackop:false})
  };
  const openBackDrop = () => {
    setStore({...store, openBackop:!openBackop});
  };
  


  useEffect(() => {
    console.log("App");
    return () => {}
  }, [])
  
  return (
    <StoreContext.Provider value={{store, setStore, login, setLogin}}>
      <SnackbarProvider maxSnack={3} TransitionComponent={TransitionDown}>
        <div className="App">
          {
            login.isLogin
            ? <HomePage/>
            : <LoginPage/>
          }        
          
        </div>
      </SnackbarProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackop}
        onClick={closeBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StoreContext.Provider>
  )
}

export default App

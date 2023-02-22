import React, {  useState } from 'react'
import { BrowserRouter } from "react-router-dom";


import { createContext } from "react";
import { getToken, initStore  } from './helpers/utils';
import { AppRouter } from './routers/AppRouter';
export const StoreContext = createContext(null);

export const App = () => {
 
 const [store, setStore] = useState(initStore);
 


 const updateStore = async(data)=>{
   if (data) {
    //  setStore(data);

    const tiempoExpiracion = store.user.tiempoExpiracion;
    const tiempoInicioToken = store.tiempoInicioToken;
    const currentTime = new Date().getTime();
    let sessionTime = (tiempoExpiracion/2) - (currentTime - tiempoInicioToken)
    /* console.log(`
      APP - updateDtore ////////////////////////
        tiempoExpiracion  = ${tiempoExpiracion}
        tiempoInicioToken      = ${tiempoInicioToken}
        currentTime       = ${currentTime}
        sessionTime       = ${sessionTime}
        sessionTime < 0   = ${sessionTime <= 0}
    `)
    console.log(data) */

    let newData = {...data, tiempoInicioSession: new Date().getTime()}
    if (sessionTime <= 0 && data.user.user !== '' && data.user.pwd !== '') {
      // console.log("ACTUALIZAR TOKEN")
      try {
        const responseGetToken = await getToken(data.user.user, data.user.pwd);
        newData = {
          ...data,
          user:{
            ...store.user,
            token: responseGetToken.tkn,
          },
          tiempoInicioSession: new Date().getTime(), // inicio Session
          tiempoInicioToken: new Date().getTime(), // inicio Token
        }
      } catch (error) {
        console.error(error)
      }
    }
     setStore(newData);
     if (newData.user.isLogin) sessionStorage.setItem('store', JSON.stringify(newData))
   }
 }
 
  return (
    <StoreContext.Provider value={{store, updateStore}}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App;

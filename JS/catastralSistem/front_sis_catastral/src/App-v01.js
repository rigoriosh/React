import React, {  useState } from 'react'
import { BrowserRouter } from "react-router-dom";


import { createContext } from "react";
import { getToken, initStore  } from './helpers/utils';
import { AppRouter } from './routers/AppRouter';
import { getInfoGET } from './api';
import enviroment from './helpers/enviroment';

export const StoreContext = createContext(null);

export const App = () => {
 
 const [store, setStore] = useState(initStore);
 


 const updateStore = async(data, updateSession=true)=>{
  console.log("updateStore")
  let responseGetToken = {} ;
   if (data && data.user.isLogin) {
    //  setStore(data);
    
    console.log("data => ", data)
    //  const tiempoExpiracion = store.user.tiempoExpiracion
    //  const tiempoInicio = store.user.tiempoInicio
    //  const currentTime = new Date()
    const tiempoExpiracion = store.user.tiempoExpiracion;
    const oldTime = store.user.tiempoInicio;
    const currentTime = new Date().getTime();
    let sessionTime = (tiempoExpiracion/2) - (currentTime - oldTime)
    console.log(`
        tiempoExpiracion  = ${tiempoExpiracion}
        oldTime           = ${oldTime}
        currentTime       = ${currentTime}
        sessionTime       = ${sessionTime}
        sessionTime < 0   = ${sessionTime < 0}
    `)
    if (sessionTime <= 0) {
      // //debugger
      try {
        responseGetToken = await getToken(data.user.user, data.user.pwd);
        //debugger
        const newStore = {
          ...store,
          user:{
            ...store.user,
            token: responseGetToken.tkn,
            tiempoInicio: currentTime
          }
        }
        console.log("newStore => ", newStore)
        setStore(newStore);
        sessionStorage.setItem('store', JSON.stringify(newStore))
        
      } catch (error) {
        //debugger
        console.log(error)
        setStore({...data});
        sessionStorage.setItem('store', JSON.stringify(data))
      }
      /* data = {...data, user: {...data.user, 
        token:responseGetToken.tkn,
        tiempoInicio: currentTime,
      }} */
    }else{
      //debugger
      setStore({...data});
      sessionStorage.setItem('store', JSON.stringify(data))
    }

   }
 }
 
  return (
    <StoreContext.Provider value={{store, updateStore, setStore}}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App;

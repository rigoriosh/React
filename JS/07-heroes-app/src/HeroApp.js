import React, { useEffect, useReducer, useState } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {logged: false}
}

export const HeroApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init)
    const [myDevice, setMyDevice] = useState();

    useEffect(() => {
        console.log('in here')
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const connectButtonPointerUpHandler = () => {
        navigator.bluetooth.requestDevice({
          filters:
            [
              { name: 'HUAWEI Y9 Prime 2019 rrh' },
            //   { services: [SEND_SERVICE] },
            ]
        })
          .then(device => {
            setMyDevice(device);
      
            return device.gatt.connect();
          })
          .then(server => {
            //   server.getPrimaryService(SEND_SERVICE)
            console.log({server});
              
          }
          )
        //   .then(service => service.getCharacteristic(SEND_SERVICE_CHARACTERISTIC))
        //   .then(characteristic => {
        //     toggleLigthCharacteristic = characteristic;
      
        //     toggleButtonsVisible();
        //     toggleItemsEventListeners('addEventListener');
        //   })
          .catch(error => {
            console.error(error);
          });

        }

    console.log({myDevice});

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            <button onClick={()=>connectButtonPointerUpHandler()}>sss</button>
            <AppRouter/>
        </AuthContext.Provider>
        )
}

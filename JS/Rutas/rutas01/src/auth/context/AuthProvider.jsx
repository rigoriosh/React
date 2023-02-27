import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer, inititalStatel } from './authReducer'
import { types } from '../types/types'

export const AuthProvider = ({children}) => {

    const initializer = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        let data = {};
        user ? data={logged: !!user, user} : data=inititalStatel
        return data
    }

    const [authState, authDispatch] = useReducer(authReducer, inititalStatel, initializer);

    const login = (name)=>{
        const user = {
            id:'ABC',
            name
        }
        const action = {
            type: types.login,
            payload: user
        };
        localStorage.setItem('user', JSON.stringify(user))
        authDispatch(action)
    }
    const logout = ()=>{
        localStorage.removeItem('user')
        authDispatch({type: types.logout})
    }

  return (
    <AuthContext.Provider value={{login, logout, authState}}>
        {children}
    </AuthContext.Provider >
  )
}

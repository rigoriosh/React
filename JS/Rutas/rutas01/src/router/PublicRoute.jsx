import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

export const PublicRoute = ({children}) => {
    const {authState} = useContext(AuthContext)
    console.log(authState);

    
  return (!authState.logged)
  ? children
  : <Navigate  to="/" />
}

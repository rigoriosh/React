import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext'

export const PrivateRoute = ({children}) => {
    
    const {authState} = useContext(AuthContext)
    console.log(authState);
    const location = useLocation();
    const lastPath = location.pathname + location.search;
    localStorage.setItem('lastPath',lastPath);
    console.log('re-render');
    
    return (authState.logged)
    ? children
    : <Navigate  to="/login" />
}

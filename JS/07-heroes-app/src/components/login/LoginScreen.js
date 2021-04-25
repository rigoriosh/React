import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {    

    const context = useContext(AuthContext);
    const {user, dispatch} = context;
    const {logged, name} = user;

    console.log('name => ',name || 'sin registro')    
    console.log('logged => ',logged)    

    const handleLogin = () => {
        const lastPath = localStorage.getItem('lastPath') || '/'
        dispatch({
            type: types.login,
            payload: {name:'Fernando'}
        })
        history.replace(lastPath);
    }
    return (
        <div className="container mt-5">
            <h3>LoginScreen</h3>
            <hr/>

            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

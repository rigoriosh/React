import React, { useContext } from 'react'
import { UserContext } from './UserContext';

export const LoginScreen = () => {
    const {user, setUser} = useContext(UserContext);    
    return (
        <>
             <h3>LoginScreen</h3>
             <hr/>
             <button className="btn btn-primary" onClick={()=>setUser({Name: 'rigo', year: 2021})}>Login</button>
             <pre>
                 {JSON.stringify(user, null, 3)}
             </pre>
         </>
    )
}

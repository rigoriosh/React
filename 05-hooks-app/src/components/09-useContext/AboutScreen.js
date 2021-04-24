import React, { useContext } from 'react'
import { UserContext } from './UserContext';

export const AboutScreen = () => {
    const {user, setUser} = useContext(UserContext);    
    return (
        <>
             <h3>AboutScreen</h3>
             <hr/>
             <button className="btn btn-dark" onClick={()=>setUser({Name: 'Ana', year: 1952})}>Login</button>

             <pre>
                 {JSON.stringify(user, null, 3)}
             </pre>
         </>
    )
}

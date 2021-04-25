 import React, { useContext } from 'react'
import { UserContext } from './UserContext';
 
 export const HomeScreen = () => {
     const userContext = useContext(UserContext);
     const {user, setUser} = userContext;
     console.log(userContext);     
     return (
         <>
             <h3>HomeScreen</h3>
             <hr/>
             <pre>
                 {JSON.stringify(user, null, 3)}
             </pre>
         </>
     )
 }
 
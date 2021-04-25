import React, { useState } from 'react'
import { AppRouter } from './AppRouter'
import { UserContext } from './UserContext'

export const MainApp = () => {

    const [user, setUser] = useState({id:123})

    return (
        <UserContext.Provider value={{user, setUser, test: 1234}}>
            <AppRouter/>
        </UserContext.Provider>
    )
}

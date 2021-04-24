import { useState } from 'react';

interface User {
    uid: string,
    name: string
}

const temUser: User = {
    uid: 'xyz',
    name: 'Thiago'
}

export const Usuario = () => {
    const [user, setUser] = useState<User>(temUser);
    const login = () => {
        setUser({
            uid: 'ABC123',
            name: 'Rigo'
        })
    }
    return (
        <div className="mt-3">
            <hr/>
            <h3>Usuario: useState</h3>

            <button onClick={login} className="btn btn-outline-primary">Login</button>
            <br/>
            {
                (!user)
                ? <p>Sin usuario</p>
                : <pre>{JSON.stringify(user)}</pre>
            }            
        </div>
    )
}

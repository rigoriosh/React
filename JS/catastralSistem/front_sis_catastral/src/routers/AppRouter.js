import React, { useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { StoreContext } from '../App';
import { RequireAuth } from '../auth/RequireAuth';
import { NoMatch } from '../componets/NoMatch';
import { Login } from '../pages/auth/Login';
import { Signin } from '../pages/auth/Signin';
import { Tramites } from '../pages/tramites/Tramites';
import { AuthRouter } from './AuthRouter';
import { TramitesCatastrales } from './TramitesCatastrales';

export const AppRouter = () => {
    let location = useLocation();
    const { store, updateStore } = useContext(StoreContext);
    const { user:usuario } = store;
    useEffect(() => {
        console.log(location)
        return () => {
        }
    }, [location])

    const salir = () => {
        updateStore({...store, user:{...usuario, isLogin: false, user:'', token:''}});
    }
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            {
                usuario.isLogin &&
                    <div>
                        <p>{`Bievenido ${usuario.user}`}</p>
                        <button onClick={()=>salir()}>Salir</button>
                    </div>
            }
            <Routes>
                <Route path="*" element={
                    <Tramites>
                        <AuthRouter/>
                    </Tramites>
                }
                />
                {/* <Route path="*" element={<AuthRouter/>}>
                    <Route index element={<Login/>} />
                    <Route path="sigin" element={<Signin/>} />
                </Route> */}
                <Route
                    path="/tramites/*"
                    element={
                    <RequireAuth>
                        <TramitesCatastrales />
                    </RequireAuth>
                    }
                />
                {/* <Route path="/tramites/*" element={<TramitesCatastrales/>} /> */}
                {/* <Route path="*" element={<NoMatch/>} /> */}
            </Routes>
        </div>
    )
}


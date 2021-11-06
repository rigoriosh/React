import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { Login } from '../pages/auth/Login';
import { Signin } from '../pages/auth/Signin';
import { AuthRouter } from './AuthRouter';
import { TramitesCatastrales } from './TramitesCatastrales';

export const AppRouter = () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location)
        return () => {
        }
    }, [location])
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="*" element={<AuthRouter/>}>
                    <Route index element={<Login/>} />
                    <Route path="sigin" element={<Signin/>} />
                </Route>
                <Route path="/tramites/*" element={<TramitesCatastrales/>} />
                {/* <Route path="*" element={<NoMatch/>} /> */}
            </Routes>
        </div>
    )
}

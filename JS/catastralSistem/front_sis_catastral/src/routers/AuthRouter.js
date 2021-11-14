import React from 'react'
import { Routes, Route } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { IngresarRegistrarse } from '../pages/auth/IngresarRegistrarse';
import { Login } from '../pages/auth/Login';
import { Signin } from '../pages/auth/Signin';

export const AuthRouter = () => {
    return (
            <Routes>
                <Route index element={<IngresarRegistrarse/>} />
                <Route path="login" element={<Login/>} />
                <Route path="sigin" element={<Signin/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>

    )
}

import React from 'react'
import { Routes, Route } from "react-router-dom";
import { NoMatch } from '../componets/NoMatch';
import { Login } from '../pages/auth/Login';
import { Signin } from '../pages/auth/Signin';

export const AuthRouter = () => {
    return (
        <div>
            <h1>AuthRouter</h1>
            <Routes>
                <Route index element={<Login/>} />
                <Route path="sigin" element={<Signin/>} />
                <Route path="*" element={<NoMatch/>} />
            </Routes>
        </div>

    )
}

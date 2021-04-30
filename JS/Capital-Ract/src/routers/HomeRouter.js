import React from 'react'
import { Redirect, Switch } from "react-router-dom";

import OwnerRouts from './ownerRout/OwnerRouts';
import AdminBarRouts from './admidBarRout/AdminBarRouts';
import UserRouts from './userRout/UserRouts';
import { NavBar } from '../componentes/NavBar';
import { RoutsOwner } from './ownerRout/RoutsOwner';
import { RoutsAdminBar } from './admidBarRout/RoutsAdminBar';
import { RoutsUser } from './userRout/RoutsUser';
import { useSelector } from 'react-redux';


export const HomeRouter = () => {
    const {authReducer} = useSelector(state => state)
    console.log(authReducer.rol)
    return (
        <div>
            <NavBar rol={authReducer.rol} />
            <Switch>
                <OwnerRouts rol={authReducer.rol} path="/owner" component={RoutsOwner} />
                <AdminBarRouts rol={authReducer.rol} path="/adminBar" component={RoutsAdminBar} />
                <UserRouts rol={authReducer.rol} path="/user" component={RoutsUser} />
                <Redirect to={authReducer.rol} />
            </Switch>
        </div>

    )
}

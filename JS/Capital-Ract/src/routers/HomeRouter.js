import React, { useState } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import OwnerRouts from './ownerRout/OwnerRouts';
import AdminBarRouts from './admidBarRout/AdminBarRouts';
import UserRouts from './userRout/UserRouts';
import { NavBar } from '../componentes/NavBar';
/* import { HomeScreen } from '../componentes/home/HomeScreen';
import { Admin } from '../componentes/admin/Admin';
import { Bar } from '../componentes/bar/Bar';
import { Menu } from '../componentes/menu/Menu';
import { Rockola } from '../componentes/rockola/Rockola';
import { Nosotros } from '../componentes/nosotros/Nosotros'; */
import { RoutsOwner } from './ownerRout/RoutsOwner';
import { RoutsAdminBar } from './admidBarRout/RoutsAdminBar';
import { RoutsUser } from './userRout/RoutsUser';
import { useSelector } from 'react-redux';


export const HomeRouter = () => {
    const {auth} = useSelector(state => state)
    console.log(auth.rol)
    return (
        <div>
            <NavBar rol={auth.rol} />
            <Switch>
                <OwnerRouts rol={auth.rol} path="/owner" component={RoutsOwner} />
                <AdminBarRouts rol={auth.rol} path="/adminBar" component={RoutsAdminBar} />
                <UserRouts rol={auth.rol} path="/user" component={RoutsUser} />
                <Redirect to={auth.rol} />
            </Switch>
        </div>

    )
}

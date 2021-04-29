import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { HomeScreen } from '../../componentes/home/HomeScreen'
import { Menu } from '../../componentes/menu/Menu'
import { Rockola } from '../../componentes/rockola/Rockola'

export const RoutsUser = () => {
    return (
        <>
            <Switch>    
                    <Route exact path="/user"           component={HomeScreen} />               
                    <Route exact path="/user/menu"     component={Menu} />
                    <Route exact path="/user/rockola"  component={Rockola} />
                    <Redirect to='/user' />
            </Switch>
        </>
    )
}

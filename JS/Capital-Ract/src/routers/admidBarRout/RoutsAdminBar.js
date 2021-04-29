import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Bar } from '../../componentes/bar/Bar'
import { HomeScreen } from '../../componentes/home/HomeScreen'
import { Menu } from '../../componentes/menu/Menu'

export const RoutsAdminBar = () => {
    return (
        <>
            <Switch>            
                <Route exact path="/adminBar"          component={HomeScreen} />       
                <Route exact path="/adminBar/bar"  component={Bar} />
                <Route exact path="/adminBar/menu" component={Menu} />                    
                <Redirect to='/adminBar' />
            </Switch>
        </>
    )
}

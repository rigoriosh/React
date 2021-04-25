import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Bar } from '../../componentes/bar/Bar'
import { Menu } from '../../componentes/menu/Menu'

export const RoutsAdminBar = () => {
    return (
        <>
            <Switch>                   
                    <Route exact path="/adminBar/bar"  component={Bar} />
                    <Route exact path="/adminBar/menu" component={Menu} />                    
                    <Redirect to='/adminBar/admin' />
            </Switch>
        </>
    )
}

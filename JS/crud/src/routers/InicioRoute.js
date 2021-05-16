import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


import MenuNavBar from '../components/MenuNavBar';
import Breadcrumb from '../components/Breadcrumb';
import Projectsearch from '../pages/Projectsearch';
import { HomeRoute } from './HomeRoute';

export const InicioRoute = ({history}) => {
    console.log('InicioRoute');
    return (
        <div>
            
                    <MenuNavBar history={history}/>
                    <Breadcrumb />
                    <Switch>
                        <Route path="/inicio" component={HomeRoute}/>                                    
                        <Route path="/" component={Projectsearch} />
                        <Redirect exact to="/" />
                    </Switch>
                
        </div>
    )
}

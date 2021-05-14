import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import MenuNavBar from '../components/MenuNavBar';
import Projectsearch from '../pages/Projectsearch';
import { HomeRoute } from './HomeRoute';

export const InicioRoute = ({history}) => {
    console.log('InicioRoute');
    return (
        <div>
            
            <Router>
                <Switch>
                    <Route path="/inicio" component={HomeRoute}/>                                    
                    <Route exact path="/" component={Projectsearch} />
                    <Redirect exact to="/" />
                </Switch>
            </Router>
        </div>
    )
}

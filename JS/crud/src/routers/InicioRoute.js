import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import '../css/inicioRoute.css';


import MenuNavBar from '../components/MenuNavBar';
import Breadcrumb from '../components/Breadcrumb';
import Projectsearch from '../pages/Projectsearch';
import { HomeRoute } from './HomeRoute';

export const InicioRoute = ({history}) => {
    console.log('InicioRoute');
    return (
        <div className="inicioRoute-main">
                <div className="inicioRoute-header">
                    <MenuNavBar history={history}/>
                    <Breadcrumb className="ml-5"/>
                </div>                    
                <div className="inicioRoute-content">
                    <Switch>
                        <Route path="/inicio" component={HomeRoute}/>                                    
                        <Route path="/" component={Projectsearch} />
                        <Redirect exact to="/" />
                    </Switch>
                </div>
                
        </div>
    )
}

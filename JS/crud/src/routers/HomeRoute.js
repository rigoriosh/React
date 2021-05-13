import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Projectsearch from '../pages/Projectsearch';
import { AdministracionRoute } from './AdministracionRoute';
import { ProrratasRoute } from './ProrratasRoute';
import { ReportesRoute } from './ReportesRoute';

export const HomeRoute = () => {
    console.log('HomeRoute')
    return (
        <Router>
            <Switch>
                <Route exact path="/buscar" component={Projectsearch} />
                <Route exact path="/prorrata" component={ProrratasRoute}/>                
                <Route exact path="/reportes" component={ReportesRoute}/>
                <Route exact path="/administracion" component={AdministracionRoute}/>
                <Redirect to="/buscar" />
            </Switch>
        </Router>
    )
}

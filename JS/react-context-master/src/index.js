import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppContextProvider } from './context/appContext';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';
import Rigo from './pages/Rigo';

const Root = (
    <AppContextProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/reports" component={Reports} />
                <Route path="/rigo" component={Rigo} />
                <Redirect from="/" to="/dashboard" />
            </Switch>
        </BrowserRouter>
    </AppContextProvider>
);

ReactDOM.render(Root, document.getElementById('root'));

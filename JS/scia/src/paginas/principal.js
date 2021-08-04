import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './homepage'
//import logo from './../imagenes/logo.png'

/* const logout = () => {
    localStorage.removeItem('logearUsuario');
    window.location.reload();
} */

const dato = () => {
    return (
        <div className="jumbotron align-middle" style={{marginTop: '20px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <BrowserRouter>
                            <div>
                                {/* <div className="navbar navbar-expand-lg navbar-light bg-light">
                                    <a class="navbar-brand" href="/"><img  src={logo} alt="logo"/></a>
                                    <div className="navbar-nav">
                                        <Link to="/" className="nav-item nav-link">Home</Link>
                                        <Link to="" onClick={logout} className="nav-item nav-link">Logout</Link>
                                    </div>
                                </div> */}
                            </div>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/homepage" component={HomePage} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dato
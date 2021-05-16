import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PublicRout } from "./PublicRout";
import { PrivateRoute } from "./PrivateRoute";
import Login from '../pages/Login';
//import { HomeRoute } from './HomeRoute';
import { login } from '../acciones/login_action';
//import Projectsearch from '../pages/Projectsearch';
import { InicioRoute } from './InicioRoute';

export const AppRouter = () => {
    console.log('AppRouter')
    const [banderaLogin, setBanderaLogin] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const {id, nombre} = useSelector(state => state.login_reducer);
    console.log({id, nombre, banderaLogin, isUserLoggedIn});

    useEffect(() => {
        // read user from localStorage
        //TODO: consultar si esta logueado el usuario
        const user = JSON.parse(localStorage.getItem('userLogin')); 
        console.log(user);       
        if (user) {
            
            dispatch(login(user.id, user.nombreUsuario));
        }
        setBanderaLogin(false);
        return () => {
            console.log('onClose => AppRouter')
        }
    }, [dispatch]);

    useEffect(() => {
        id ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
        return () => {}
    }, [id])
    

    if (banderaLogin) {
        return <h1>Pagina de esperando revisar si el usuario esta logueado ....</h1>        
    }

    return (
        <Router>
            <Switch>
                <PublicRout     exact path="/login" isUserLoggedIn={isUserLoggedIn} component={Login}/>     
                <PrivateRoute   path="/" isUserLoggedIn={isUserLoggedIn} component={InicioRoute}/>  
                <Redirect to="/login" />                 
            </Switch>            
        </Router>
    )
}

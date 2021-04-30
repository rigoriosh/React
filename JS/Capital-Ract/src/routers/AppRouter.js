import React, {useEffect, useState } from 'react'
//import {firebase} from '../firebase/firebaseConfig';
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { AuthScreen } from '../componentes/auth/AuthScreen';
/* import { HomeScreen } from '../componentes/home/HomeScreen';

import { Nosotros } from '../componentes/nosotros/Nosotros';

import { RoutsAdminBar } from './admidBarRout/RoutsAdminBar';


import { RoutsOwner } from './ownerRout/RoutsOwner';

import { RoutsUser } from './userRout/RoutsUser';
import { tipos } from '../types/tipos';
import { useDispatch} from 'react-redux';
import { login } from '../actions/auth'; */
import PublicRout from './PublicRout';
import PrivateRoute from './PrivateRoute';
import { HomeRouter } from './HomeRouter';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';




export const AppRouter = ({history}) => {

    const state = useSelector(state => state);//para acceder a la info del redux
    const [checkingLogin, setChecking] = useState(false);
    const dispatch = useDispatch();
    const {authReducer} = state
    console.log(authReducer.uid)

    const [isLogin, setisLogin] = useState(false)
    console.log(isLogin)


    useEffect(() => {
        (authReducer.uid) ? setisLogin(true) : setisLogin(false);
        //(authReducer.uid) ? setRol(tipos.rolOwner) : setRol('tipos.rolOwner');
    }, [authReducer])
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));       
        if (user) {
            const {uid, name, rol } = user;
            console.log(user)
            dispatch(login(uid, name, rol))
        }
        setChecking(true)
        return () => {}
    }, [dispatch])

    if (!checkingLogin) {
        return (
            <h1>Waiting ....</h1>
        )
    } 
    


   /*  const dispatch = useDispatch();
         */
   

    /* 
    useEffect(() => {        
        firebase.authReducer().onAuthStateChanged((user) => {
            console.log(user, {isLogin});
            setChecking(true);
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));                
                setisLogin(true);
                setRol(tipos.rolOwner)
            }else{                
                setisLogin(false);
                setRol('tipos.rolOwner');
            }
        });

    }, [dispatch, isLogin, setChecking])

    
    */
    
    return (
        <Router>
            <>
                
                <Switch>
                    {/* <Route exact path="/we" component={Nosotros} />
                    <Route exact path="/authReducer" component={AuthScreen} />                    
                    */}
                     
                    <PublicRout isAuthenticated={isLogin} path="/auth" component={AuthScreen} redirec={"/"}/>                    
                    <PrivateRoute  isAuthenticated={isLogin} path="/" component={HomeRouter} redirec={"/auth"}/>
                    <Redirect to="/"/>
                </Switch>
            </>            
        </Router>
    )
}

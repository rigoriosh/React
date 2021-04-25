import React, {useEffect, useState } from 'react'
import {firebase} from '../firebase/firebaseConfig';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AuthScreen } from '../componentes/auth/AuthScreen';
import { HomeScreen } from '../componentes/home/HomeScreen';
import { NavBar } from '../componentes/NavBar';
import { Nosotros } from '../componentes/nosotros/Nosotros';
import AdminBarRouts from './admidBarRout/AdminBarRouts';
import { RoutsAdminBar } from './admidBarRout/RoutsAdminBar';

import OwnerRouts from './ownerRout/OwnerRouts';
import { RoutsOwner } from './ownerRout/RoutsOwner';
import UserRouts from './userRout/UserRouts';
import { RoutsUser } from './userRout/RoutsUser';
import { tipos } from '../types/tipos';
import { useDispatch} from 'react-redux';
import { login } from '../actions/auth';



export const AppRouter = ({history}) => {

    /* const state = useSelector(state => state);//para acceder a la info del redux
    const {auth} = state
    useEffect(() => {
        (auth.uid) ? setRol(tipos.rolOwner) : setRol('tipos.rolOwner');
    }, [auth, history]) */
    const [rol, setRol] = useState('');

    
    


    const dispatch = useDispatch();
    const [checkingLogin, setChecking] = useState(false);    
    const [isLogin, setisLogin] = useState(false)

    useEffect(() => {        
        firebase.auth().onAuthStateChanged((user) => {
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

    if (!checkingLogin) {
        return (
            <h1>Waiting ....</h1>
        )
    }

    return (
        <Router>
            <>
                <NavBar rol={rol}/>
                <Switch>
                    <Route exact path="/we" component={Nosotros} />
                    <Route exact path="/auth" component={AuthScreen} />                    
                    <OwnerRouts    rol={rol} path="/owner"    component={RoutsOwner}/>
                    <AdminBarRouts rol={rol} path="/adminBar" component={RoutsAdminBar}/>
                    <UserRouts     rol={rol} path="/user"     component={RoutsUser}/>
                    <Route path="/" component={HomeScreen} />
                    {/* <PublicRout isAuthenticated={isLogin} path="/" component={AuthRouter}/> */}
                    {/* <PrivateRoute  isAuthenticated={isLogin} path="/auth" component={HomeRouter}/> */}
                    <Redirect to="/"/>
                </Switch>
            </>            
        </Router>
    )
}

import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notesActions';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRout from './PublicRout';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [banderaLogin, setBanderaLogin] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        /* esta parter pregunta a firebase si hay un usuario logueado, si es asi, atualiza el store */
        firebase.auth().onAuthStateChanged((user) => {
            //console.log({user});
            if (user?.uid) {/* si exite el user.uid siginifica q si esta aunticado */
                dispatch(login(user.uid, user.displayName));// actualiza el store
                setIsUserLoggedIn(true); // si el usuario ya esta logueado lo envia directamente al home
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsUserLoggedIn(false); // si el usuario ni esta logueado lo envia directamente al loguin
            }
            setBanderaLogin(false);
        });
    }, [dispatch])

    if (banderaLogin) {
        return <h1>Pagina de esperando revisar si el usuario esta logueado ....</h1>
        
    }
    return (
        <Router>
            <Switch>
                <PublicRout exact path="/auth/login" isUserLoggedIn={isUserLoggedIn} component={AuthRouter}/>     
                <PrivateRoute exact path="/" isUserLoggedIn={isUserLoggedIn} component={JournalScreen}/>  
                <Redirect to="/auth/login" />                 
            </Switch>
            {/* <Switch>
                <Route path="/auth" component={AuthRouter} />
                <Route exact path="/" component={JournalScreen}/>      
                <Redirect to="/auth/login" />          
            </Switch> */}
        </Router>
    )
}

import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthScreen } from '../componentes/auth/AuthScreen';
/* import { LoginScreen } from '../componentes/auth/LoginScreen';
import { RegisterScreen } from '../componentes/auth/RegisterScreen';
 */
export const AuthRouterXXX = () => {
    return (
        <div className="auth__main_xxx">
            <div className="auth__box-container_xxx">
                <Switch>
                    <Route exact path="/auth" component={AuthScreen} />
                    {/* <Route exact path="/auth/login" component={LoginScreen} />
                    <Route exact path="/auth/register" component={RegisterScreen}/>           */}      
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </div>
    )
}

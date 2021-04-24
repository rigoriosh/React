import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    /* Hook 'useDispatch' para trabajar con redux, por medio del dispach se ejecuta una action y 
    al mismo tiempo los reducers la escuchan y segun el tipo de action se ejecutara una logica interna en el
    correspondiente reducer. en resumen sirve para hacer dispatch de acciones, osea modificar el store */
    const dispatch = useDispatch();
    const {loading, msgError: mse} = useSelector(state => state.uiReducer); // el hook useSelector se utiliza para leer los reducers q estan en el store    
    const {msgError} = mse;

    const [fields, handledInputChange] = useForm(
        {
            email:'',
            password: ''
        });
    const {email, password} = fields;

    const handleLogin = (e) =>{
        e.preventDefault();
        if (isFormValid()) {
            //ejecuta la action startLoginEmailPassword la cual es un middleware x lo q es asincrona
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const isFormValid = () => {

        if (!validator.isEmail(email)) {
            dispatch(setErrorAction('El email no es valido'));
            return false;
        }else if (password === '') {
            dispatch(setErrorAction('El password es required'));
            return false;
        }

        dispatch(removeErrorAction());

        return true;
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
                { msgError && <div className="auth__alert-error">{msgError}</div> }
                <input type="text" placeholder="Email" name="email" className="auth__input" value={email} onChange={handledInputChange}/>
                <input type="password" placeholder="password" name="password" className="auth__input" value={password} onChange={handledInputChange}/>
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Login</button>
                
                <div className="auth__social-networks">  {/* Contenedor para logearse con la API del gmail */}
                    <p>Login with social networks </p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register" className="link">Create new account</Link>
            </form>
        </>
    )
}

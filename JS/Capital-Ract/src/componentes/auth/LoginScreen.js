import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const {ui} = state

    const [fields, handledInputChange] = useForm(
        {
            email:'RigobertoRiosH@hotmail.com',
            password: '123456'
        });
    const {email, password} = fields;

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(email, password);
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {            
            dispatch(setErrorAction('Email valid is requerid'))
            return false;
        }/* else if (password !== confirmPassword || password.length < 6) {            
            dispatch(setErrorAction('Password should have at least six characteres to mach'))
            return false;
        } */
        dispatch(removeErrorAction());
        return true
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>            
            <form onSubmit={handleLogin}>
            {
                    ui.msgError && 
                    (
                       <div className='auth__alert-error'>{ui.msgError}</div>
                       )
                } 
                <input type="text" placeholder="Email" name="email" className="auth__input" value={email} onChange={handledInputChange}/>
                <input type="password" placeholder="password" name="password" className="auth__input" value={password} onChange={handledInputChange}/>
                <button type="submit" className="btn btn-primary btn-block" disabled={ui.loading}>Login</button>
                
                <div className="auth__social-networks">
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

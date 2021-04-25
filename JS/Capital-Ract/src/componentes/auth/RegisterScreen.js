import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const {ui} = state;
    console.log(state);
    console.log(ui);

    const [fields, handledInputChange] = useForm({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const {name, email, password, confirmPassword} = fields;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, email, password, confirmPassword);
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }        
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {            
            dispatch(setErrorAction('Name is requerid'))
            return false;
        }else if (!validator.isEmail(email)) {            
            dispatch(setErrorAction('Email valid is requerid'))
            return false;
        }else if (password !== confirmPassword || password.length < 6) {            
            dispatch(setErrorAction('Password should have at least six characteres to mach'))
            return false;
        }
        dispatch(removeErrorAction());
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    ui.msgError && 
                    (
                       <div className='auth__alert-error'>{ui.msgError}</div>
                       )
                }                
                <input type="text" placeholder="Name" name="name" className="auth__input" onChange={handledInputChange}/>
                <input type="text" placeholder="Email" name="email" className="auth__input" onChange={handledInputChange}/>
                <input type="password" placeholder="password" name="password" className="auth__input" onChange={handledInputChange}/>
                <input type="password" placeholder="confirm Password" name="confirmPassword" className="auth__input" onChange={handledInputChange}/>
                <button type="submit" className="btn btn-primary btn-block mb-5" disabled={false}>Register</button>
                
                
                <Link to="/auth/login" className="link">Already Register?</Link>
            </form>
        </>
    )
}

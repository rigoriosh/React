import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailAndPassword } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {


    const [fields, handledInputChange] = useForm({name:'',email:'',password:'',confirmPassword:''});
    const {name ,email ,password ,confirmPassword } = fields;

    const dispatch = useDispatch();
    //const state = useSelector(state => state.state)
    //console.log(state);
    const {msgError} = useSelector(state => state.uiReducer.msgError); // el hook useSelector se utiliza para leer los reducers q estan en el store
    //console.log(msgError);
    
    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            //console.log('form ok');
            dispatch(startRegisterWithEmailAndPassword(email, password, name));
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatch(setErrorAction('El nombre es requerido'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setErrorAction('El email no es valido'));
            return false;
        } else if(password !== confirmPassword || password.length < 5){
            dispatch(setErrorAction('Las contraseñas deben coincidir y ser mayor a 6 caracteres'));
            return false;
        }

        dispatch(removeErrorAction());

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister} className="animate__animated animate__bounce">

                { msgError && <div className="auth__alert-error">{msgError}</div> }
                
                <input onChange={handledInputChange} type="text" placeholder="Name" name="name" className="auth__input"/>
                <input onChange={handledInputChange} type="password" placeholder="password" name="password" className="auth__input"/>
                <input onChange={handledInputChange} type="password" placeholder="confirm Password" name="confirmPassword" className="auth__input"/>
                <input onChange={handledInputChange} type="text" placeholder="Email" name="email" className="auth__input"/>
                
                <button type="submit" className="btn btn-primary btn-block mb-5" disabled={false}>Register</button>                
                
                <Link to="/auth/login" className="link">Already Register?</Link>
            </form>
        </>
    )
}

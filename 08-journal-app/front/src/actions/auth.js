import { types } from "../types/types"
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import {startLoading, finishLoading, setErrorAction} from './uiActions'
import { notesLogOutCleaning } from "./notesActions";


/* startLoginEmailPassword es la simulación de ejecution de una action asincrona */
export const startLoginEmailPassword = (email, password) => {
    /* dentro de la action startLoginEmailPassword llama a la action login */
    return (dispatch) => {/* //simula llegada de data un tiempo despues, luego ejecuta la action login por medio
                            del dispatch*/
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(UserCredential => {
                const {user} = UserCredential;
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(e =>{
                dispatch(setErrorAction(e.message))
                dispatch(finishLoading());
            });
            
        // sigIn emai pas
        
    }
}

/* otro middleware para controlar la utenticacion */
export const startGoogleLogin = () => { 
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( userCard => {
                const {user} = userCard;
                dispatch(login(user.uid, user.displayName))
            })
    }
} 

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispath) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async(userCrednctial) => {
                const {user} = userCrednctial;
                await user.updateProfile({displayName: name})
                dispath(login(user.uid, user.displayName))
                //console.log(user);
            })
            .catch(e => console.log(e))
    }
}

/* Accion login que retorna por defecto un obj con el type de action y el payload que lleva la data,
    esta action sera capturada por un reducer, recordar que todos los reducer escuchan esta action 
    pero se descrimina segun el type.
    Las action se ejecutan por medio de los dispach en las vistas*/
export const login = (uid, displayName) => (
    {
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }
)

/* action middleware para el logOut */
export const startLogOut = () => {
    return async (dispatch) => {
        await firebase.auth().signOut().catch(e => { console.log(e); });
        dispatch(logout());
        dispatch(notesLogOutCleaning());
    }
}

export const logout = () => ({type:types.logout});
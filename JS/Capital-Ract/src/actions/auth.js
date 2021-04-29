import { tipos } from "../types/tipos"
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
//import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';



export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        console.log(email, password)
        dispatch(login(password, email));
        
        //dispatch(startLoading())

        /* firebase.auth().signInWithEmailAndPassword(email, password)
            .then(r => {
                console.log(r);
                dispatch(login(email, password));
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            }) */

    }
}

/// cuando se ejecuta una función asincrono se debe realizar un return un callback, ej :
/* 
    export const nameFuntion = (parames...) => {
        return (dispath) => {
            ...
        }
    }
 */

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName: name});
                console.log(user);
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    
    return (dispatch) => {
        dispatch(login(12345, 'rigo'));
        console.log(12345, 'rigo')
        /* firebase.auth().signInWithPopup(googleAuthProvider)
            .then( resp => {
                const {user} = resp;
                dispatch(login(user.uid, user.displayName));
                
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
            }) */
    }
} 

export const login = (uid, name, rol=tipos.rolAdminBar) => {
    console.log(uid, name, rol)
    return {
        type: tipos.login,
        payload:{
            uid,
            name,
             rol
        }
    }
}

//funcion asincrona
/* 
    export const muFuntion = () => {
        return (dispatch) => {

        }
    }

*/

export const startLogOut = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () => ({
    type: tipos.logout
})
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";


const reducers = combineReducers({
    authReducer,
    uiReducer,
    notesReducer
});

/* Lo siguiente es para habilitar en el navegador los tools Redux; y poder configurar el store */ 
/* el composeEnhacers es para implentar varios middlewares en este caso estan el de las devtools redux y  */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))//middleware empleando thunk para acciones asincronas
);
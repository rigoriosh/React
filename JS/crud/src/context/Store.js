import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { login_reducer } from "../reducers/login_reducer";
import { proyecto_reducer } from "../reducers/proyecto_reducer";



const reducers = combineReducers({
    login_reducer,
    proyecto_reducer
});


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)) //middleware empleando thunk para acciones asincronas
);
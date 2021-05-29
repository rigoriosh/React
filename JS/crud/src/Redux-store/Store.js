import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { breadCrumb_reducer } from "../Redux-reducer/breadCrumb_reducer";
import { login_reducer } from "../Redux-reducer/login_reducer";
import { proyecto_reducer } from "../Redux-reducer/proyecto_reducer";
import { alertas_mensajes_reducer } from "../Redux-reducer/alertas_mensajes_reducer";
import { cargueCuadroDeAreas_reducer } from "../Redux-reducer/cargueCuadroDeAreas_reducer";



const reducers = combineReducers({
    login_reducer,
    proyecto_reducer,
    breadCrumb_reducer,
    alertas_mensajes_reducer,
    cargueCuadroDeAreas_reducer
});


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)) //middleware empleando thunk para acciones asincronas
);
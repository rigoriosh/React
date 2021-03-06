import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { drinksReducer } from "../reducers/drinksReducer";
import { foodsReducer } from "../reducers/foodsReducer";
import { uiReducer } from "../reducers/uiReducer";


const reducers = combineReducers(
    {
        authReducer,
        drinksReducer,
        foodsReducer,
        uiReducer,
    }
);

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
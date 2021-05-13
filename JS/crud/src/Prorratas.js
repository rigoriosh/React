import React from 'react';
import { Provider } from "react-redux";
import { store } from './context/Store';
import { AppRouter } from './routers/AppRouter';
import { Footer } from './components/Footer';


const Prorratas = props => {
    return (
        <Provider store={store} >
            <AppRouter />
            <Footer/>
        </Provider>
    )
}


export default Prorratas

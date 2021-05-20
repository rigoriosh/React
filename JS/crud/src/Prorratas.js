import React from 'react';
import { Provider } from "react-redux";
import { store } from './Redux-store/Store';
import { AppRouter } from './routers/AppRouter';
import { Footer } from './components/Footer';
import DialogComponent from './components/DialogComponent';
import SnackbarComponent from './components/Snackbar';


const Prorratas = props => {
    return (
        <Provider store={store} >
            <div className="margen-inferior">
                <AppRouter />
            </div>
            <DialogComponent />
            <SnackbarComponent />
            <Footer/>
        </Provider>
    )
}


export default Prorratas

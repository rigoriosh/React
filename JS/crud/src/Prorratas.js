import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';
import { Provider } from "react-redux";
import { store } from './Redux-store/Store';
import { AppRouter } from './routers/AppRouter';
import { Footer } from './components/Footer';
import DialogComponent from './components/DialogComponent';
import SnackbarComponent from './components/Snackbar';


const Prorratas = props => {
    const theme = createMuiTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      }, esES);

      
    return (
        
            <ThemeProvider theme={theme}>
                <Provider store={store} >
                
                    <div className="mb200px ">
                        <AppRouter />                    
                        <DialogComponent />
                        <SnackbarComponent />
                        <Footer/>
                    </div>
                    
                </Provider>
            </ThemeProvider>
           
    )
}


export default Prorratas

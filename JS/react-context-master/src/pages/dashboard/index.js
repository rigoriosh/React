import React from 'react';
import Layout from '../../components/layout';
import { AppContext, AppContextProvider } from '../../context/appContext';

class Dashboard extends React.Component {
    render() {

        console.log('context: ', this.context)
        const {nombre} = this.context;
        return (
            
                <Layout>
                    <div>
                        dashboard {nombre}
                    </div>
                </Layout>
        );
    }
}

Dashboard.contextType = AppContext;
export default Dashboard;

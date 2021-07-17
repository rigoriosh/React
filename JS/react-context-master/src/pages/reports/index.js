import React from 'react';
import Layout from '../../components/layout';
import { AppContext } from '../../context/appContext';

class Reports extends React.Component {
    render() {
        const {
            toggleModal,
            updateContext
        } = this.context;
        return (
          
                <Layout>
                    <div>
                        reports
                        <button onClick={()=>{
                            console.log(this.context)
                            updateContext([ 'nombre', 'isModalOpen'], ['  Rigo Rios', true])
                            }}>toggleModal</button>
                    </div>
                </Layout>
        );
    }
}

Reports.contextType = AppContext;
export default Reports;

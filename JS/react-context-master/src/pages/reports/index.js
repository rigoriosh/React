import React from 'react';
import Layout from '../../components/layout';
import { AppContext } from '../../context/appContext';

class Reports extends React.Component {

    constructor(props){
        super(props)

        this.updateAlgo = this.updateAlgo.bind(this);
    }

    updateAlgo(){
        console.log(this.context)
        this.context.updateContext([2,3], [4,5])
    }

    render() {
        const {
            toggleModal,
            updateContext
        } = this.context;
        return (
          
                <Layout>
                    <div>
                        reports
                        <button onClick={this.updateAlgo/* ()=>{
                            console.log(this.context)
                            updateContext([ 'nombre', 'isModalOpen'], ['  Rigo Rios', true])
                            } */}>toggleModal</button>
                    </div>
                </Layout>
        );
    }
}

Reports.contextType = AppContext;
export default Reports;

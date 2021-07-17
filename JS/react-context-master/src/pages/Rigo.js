import { Component } from "react";
import Layout from "../components/layout";
import { AppContext } from "../context/appContext";


class Rigo extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }


    render(){

        return (
            <Layout>
                <h1>Rigo</h1>
            </Layout>
        )
    }

}

Rigo.contextType = AppContext;
export default Rigo;
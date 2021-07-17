import React from 'react';

export const AppContext = React.createContext({
    isModalOpen: true,
    toggleModal: () => {},
});

export class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            nombre: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateContext = this.updateContext.bind(this);
    }

    toggleModal() {
        console.log(444)
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    updateContext(keys,values){
        console.log(keys,values)
        keys.forEach((element, item) => {
            this.setState({...this.state, [element]: values[item]})
        });
    }

    render() {
        const { children, } = this.props;
        const { isModalOpen, nombre} = this.state;

        return (
            <AppContext.Provider
                value={{
                    isModalOpen, nombre, 
                    toggleModal: this.toggleModal,
                    updateContext: this.updateContext
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}

export const AppContextConsumer = AppContext.Consumer;

import React from 'react'
import Principal from './paginas/principal'
import Iniciosesion from './paginas/iniciosesion/iniciosesion'

class App extends React.Component {

  state = {
    form: {user: window.localStorage.getItem('logearUsuario')}
  };

  render(){
    if(this.state.form.user != null){
      return (<Principal/>)
    }
    return ( <Iniciosesion/> );
  } 
  
}

export default App;
import {useState } from 'react';
import { MyVistasContext } from './contexts/Context';
import { AdminScreen } from './pages/adminScreen/AdminScreen';
import { AuthScreen } from './pages/authScreen/AuthScreen';
import { tiposHome } from './tipos/tipos';
/* 
type vistas = {
  home: 'home',
  auth: 'auth'
}
 */
//const Context = createContext({});

function App() {
  const [vistaGolbal, setVistasGlobal] = useState<string>(tiposHome.home);
  console.log({vistaGolbal});
  return <>
  <MyVistasContext.Provider value={{vistaGolbal, setVistasGlobal}}>
    <div className="">
      {
        (vistaGolbal === tiposHome.home) &&
          <div className="position-absolute bottom-0 end-0 mb-1">
            <button onClick={() => setVistasGlobal(tiposHome.auth)} className="btn btn-outline-info">authScreen</button>
            <button onClick={() => setVistasGlobal(tiposHome.admin)} className="btn btn-outline-info">adminScreen</button>
          </div>
      }
      
      
      {
        (vistaGolbal === tiposHome.auth) && 
        <div>
          <button onClick={() => setVistasGlobal(tiposHome.home)} className="btn btn-outline-info btn-block">Return</button>
          <AuthScreen/>
        </div>
      }
      {
        (vistaGolbal === tiposHome.admin) && 
          <div className="container d-grid gap-2">            
            <AdminScreen/>
            
          </div>
      }
    </div>
    </MyVistasContext.Provider>
  </>
  
}

export default App;

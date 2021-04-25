
import { HomeE1 } from "./ejerc1/HomeE1";
import { useState } from 'react';
import { HomeE2 } from "./jerc2/HomeE2";

const tipos = {
  ejerc1: 'ejerc1',
  ejerc2: 'ejerc2'
}


function App(): JSX.Element {
  const [ejercicio, setEjercicio] = useState('');
  return (
    <div >
      <h1>React + typeScript</h1>
      <button onClick={()=>setEjercicio(tipos.ejerc1)} className="btn btn-outline-info">Ejercicio 1</button>
      <button onClick={()=>setEjercicio(tipos.ejerc2)} className="btn btn-outline-info">Ejercicio 2</button>
      {
        (ejercicio === tipos.ejerc1) && <HomeE1/>
      }
      {
        (ejercicio === tipos.ejerc2) && <HomeE2/>
      }      
    </div>
  );
}

export default App;

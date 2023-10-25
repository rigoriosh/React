import './App.css';
import React from 'react'
// import { Gis } from './components/Gis';
import { GtranShapefile } from './components/GtranShapefile';

function App() {
  return (
    <div className="App">
      <GtranShapefile/>
      {/* <h1>Map Stuff</h1>
      <h2>How it works:</h2>
      <p>
        Don't activate the double Runway at the beginning even if you have two{" "}
      </p>
      <p>
        Put Marker 0 on the lower end of the runway and Marker1 on the upper
        end
      </p>
      <p>Then click on get Center 1, this will change Marker 0 to Center 1</p>
      <p>
        Put Marker 0 on the lower end of the runway and Marker2 on the upper
        end,
      </p>
      <p>Then click on get Center 2, this will change Marker 0 to Center 2</p>
      <p>Click on Download shape file to get a zip file</p>
      <Gis /> */}
    </div>
  );
}

export default App;

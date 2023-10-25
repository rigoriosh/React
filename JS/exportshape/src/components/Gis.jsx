import React, { useState } from 'react'
import { MapContainer } from './MapContainer';

export const Gis = () => {

    const [estado, setEstado] = useState({singleRunWay: true});

    const handleChange = () => {
        const { singleRunWay: s } = estado;
    
        setEstado({ singleRunWay: !s });
      };

      const { singleRunWay } = estado;
  return (
    <div>
      <MapContainer singleRunWay={singleRunWay} />
    </div>
  );
}

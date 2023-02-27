import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const PageTest1 = () => {
    
    const params = useParams();
    console.log("params => ", params);
    
  return (
    <h3>PageTest1</h3>
  )
}

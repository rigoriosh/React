import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const PagePrivateTest = () => {
  
  const navigate = useNavigate();
  
  const goLogin = () => {
    console.log("goLogin");
    navigate("/",{
      replace:true
    })
  }

  return (

    <div>
        PagePrivateTest 
        <hr />
        <button className="btn btn-primary" onClick={goLogin}>go login</button>
    </div>

  )
}

import React, { useContext } from 'react'
import { /* useParams, useNavigate, */ useLocation, Navigate } from "react-router-dom";
import { StoreContext } from '../App';

export const RequireAuth = ({children}) => {

    const {store:{user:{isLogin}}, /* updateStore */} = useContext(StoreContext);
    // let auth = useAuth();
    const location = useLocation();
    // let navigate = useNavigate();
  
    if (!isLogin) {
      return <Navigate to="/" state={{ from: location }} />;
    }
  
    return children;
}

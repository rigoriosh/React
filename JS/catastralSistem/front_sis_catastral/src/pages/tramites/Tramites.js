import React, { useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from '../../App';

export const Tramites = ({children}) => {
    let navigate = useNavigate();
    const {store:{user:{isLogin}}, updateStore} = useContext(StoreContext);
    if (isLogin) {
        return (
            <div>
                <h1>Tramites</h1>
                <button onClick={()=>{navigate("/tramites/crear");}}>Crear solicitud</button>
                <button onClick={()=>{navigate("/tramites/consultar");}}>Consultar solicitudes</button>
                <button onClick={()=>{navigate("/tramites/crearUsuarios");}}>Crear usuarios</button>
                <button onClick={()=>{navigate("/tramites/verSolicitudes");}}>Ver solicitudes</button>
            </div>
        )
    }

    return children;
}

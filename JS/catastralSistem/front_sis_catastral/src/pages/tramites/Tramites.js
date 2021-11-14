import React, { useContext, useEffect } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { StoreContext } from '../../App';

export const Tramites = ({children}) => {
    let navigate = useNavigate();
    const {store:{user:{isLogin}}, /* updateStore */} = useContext(StoreContext);
    useEffect(() => {
        // console.log("in Tramites")
        return () => {}
    }, [])
    if (isLogin) {
        return (
            <div>
                <h1>Tramites</h1>
                <button onClick={()=>{navigate("/tramites/crear");}}>Crear trámite</button>
                <button onClick={()=>{navigate("/tramites/consultar");}}>Consultar trámite</button>
                <button onClick={()=>{navigate("/tramites/gestionarUsuario");}}>Gestionar Usuario</button>
                <button onClick={()=>{navigate("/tramites/seguimientoTramitre");}}>Seguimiento a Trámite</button>
            </div>
        )
    }

    return children;
}

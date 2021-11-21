import React, { useContext, useEffect } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { StoreContext } from '../../App';
import { permits } from '../../helpers/utils';

export const Tramites = ({children}) => {
    let navigate = useNavigate();
    const { store/* , updateStore */} = useContext(StoreContext);
    useEffect(() => {
        console.log("in Tramites")
        return () => {}
    }, []);
    

    const checkPermits = (permits, store1) => {
        const roles = store1.user.infoUser.roles;
        const Permisos = [];
        roles.forEach(rol => rol.permisos.forEach(permiso => Permisos.push(permiso)));
        const isOk = Permisos.filter(p => p.moduloDominio.valor === permits);
        return isOk.length > 0
        // const isOk = roles.filter(e => )
    }

    if (store.user.isLogin) {
        return (
            <div>
                <h1>Tramites</h1>

                {
                    checkPermits(permits[0].valor, store) &&
                    <button onClick={()=>{navigate("/tramites/gestionarUsuario");}}>Gestionar Usuario</button>
                }
                {
                    checkPermits(permits[1].valor, store) &&
                    <button onClick={()=>{navigate("/tramites/seguimientoTramitre");}}>Seguimiento a Trámite</button>
                }
                {
                    checkPermits(permits[2].valor, store) &&
                    <button onClick={()=>{navigate("/tramites/crear");}}>Crear trámite</button>
                }
                {
                    checkPermits(permits[3].valor, store) &&
                    <button onClick={()=>{navigate("/tramites/consultar");}}>Consultar trámite</button>
                }
            </div>
        )
    }

    return children;
}

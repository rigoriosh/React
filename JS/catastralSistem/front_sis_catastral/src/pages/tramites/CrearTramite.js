import React, { useContext, useEffect, useState } from 'react'
import { getInfoGET } from '../../api'
import { StoreContext } from '../../App'
import enviroment from '../../helpers/enviroment'
import { textosInfoWarnig } from '../../helpers/utils'
import { FirstFormTramitre } from './formulariosTramite/FirstFormTramitre'



export const CrearTramite = () => {

    const [forms, setForms] = useState(1);
    const { store, updateStore } = useContext(StoreContext);
    const [tiposTramites, setTiposTramites] = useState([]);
    const [tipoSolicitud, setTipoSolicitud] = useState([]);
    const [tiposSolicitante, setTiposSolicitudes] = useState([]);
    const [tramiteSeleccionado, setTramiteSeleccionado] = useState('');
    const [titularesDeDerecho, setTitularesDeDerecho] = useState([]);
    const [formularioTramite, setFormularioTramite] = useState(
        {
            tipoTramite:{
                name:'tipoTramite',
                value:'',
                validation:''
            },
            motivoSolicitud:{
                name:'motivoSolicitud',
                value:'',
                validation:''
            },
            tipoSolicitante:{
                name:'tipoSolicitante',
                value:'',
                validation:''
            },
            razonSolicitud:{
                name:'razonSolicitud',
                value:'',
                validation:''
            },
        }
    );
    const {tipoTramite, motivoSolicitud, tipoSolicitante}  = formularioTramite;
    
    const handleFormChange = ({value, name}) => {
        console.log(value, name)
        setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
    }

    const avancePagina = () => {

    }

    const getTramitesSolicitudes = async() => {
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getTiposTramite);
            setTiposSolicitudes(response.resultado.tiposSolicitantes);
            setTiposTramites(response.resultado.tiposTramite);
            updateStore({...store, openBackDrop:false,});
        } catch (error) {
            falloLaPeticion();
        }
    }
    const falloLaPeticion = () => {
        updateStore({
            ...store,
            openBackDrop:false,
            snackBar:{ openSnackBar:true, messageSnackBar:textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}
        });
    }

    const getTiposSolicitud = async(valorConsultar) => {
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token, valorConsultar};
            const response = await getInfoGET(headers, enviroment.getTiposSolicitud);
            setTipoSolicitud(response.resultado.dominios);
            updateStore({...store, openBackDrop:false,});
        } catch (error) {
            falloLaPeticion();
        }
    }

    useEffect(() => {
        if (tipoTramite.value !== "") {
            console.log('useEffect', tipoTramite)
            getTiposSolicitud(tipoTramite.value);
        }
        return () => {}
    }, [tipoTramite])

    useEffect(() => {
        // consultar tipos de tramites y tipos de solicitudes
        getTramitesSolicitudes();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <div className="sombra" style={{backgroundColor:'white', width:'50%', padding:'5px', borderRadius:'10px'}}>
            <div /* style={{marginTop:'5px'}} */ className="tituloTramite"><p>Nuevo trámitre</p></div>
            {
                forms === 1 && <FirstFormTramitre handleFormChange={handleFormChange} tiposTramites={tiposTramites}
                    tipoSolicitud={tipoSolicitud} tiposSolicitante={tiposSolicitante} avancePagina={avancePagina}
                    formularioTramite={formularioTramite} setTitularesDeDerecho={setTitularesDeDerecho}
                    titularesDeDerecho={titularesDeDerecho}
                />
            }
            

        </div>
    )
}

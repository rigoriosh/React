import React, { useContext, useEffect, useState } from 'react'
import { getInfoGET } from '../../api'
import { StoreContext } from '../../App'
import enviroment from '../../helpers/enviroment'
import { constantesGlobales, textosInfoWarnig } from '../../helpers/utils'
import { FirstFormTramitre } from './formulariosTramite/FirstFormTramitre'
import { MutacionDePrimera } from './formulariosTramite/mutacion/MutacionDePrimera'

export const constantesCrearTramites = {
    /* notasFlotantes:{
        nota1: `Para realizar correctamente este trámite debes adjuntar los
                siguientes archivos al final del formulario:\n

                Copia de la cédula de ciudadania o documento de identidad del
                propietario, poseedor, ocupante y/o apoderado.

                Cambio de propietario: Copia del título de dominio (Escritura
                pública. Acto administrativo o sentencia) debidamente registrado.

                Cambio de poseedor u ocupante: Documentos que establezcan la
                posesión u ocupación como constancias de pago de impuestos,
                servicios públicos, contribuciones, valorización etc.

                El cambio de nombre entre poseedores u ocupantes estará sujeto
                al estudio de los documentos aportados por el solicitante.
                `,
        nota2: `Copia de la cédula de ciudadania o documento de identidad del
                propietario, poseedor, ocupante y/o apoderado.`,
        nota3: `Cambio de propietario: Copia del título de dominio (Escritura
                pública. Acto administrativo o sentencia) debidamente registrado.`,
        nota4: `Cambio de poseedor u ocupante: Documentos que establezcan la
                posesión u ocupación como constancias de pago de impuestos,
                servicios públicos, contribuciones, valorización etc.`,
        nota5: `El cambio de nombre entre poseedores u ocupantes estará sujeto
                al estudio de los documentos aportados por el solicitante.`
    } */
}

const initialStateCrearTramite = {
    msgInfoFiles:'',
}

export const CrearTramite = () => {

    const { store, updateStore } = useContext(StoreContext);
    const [stateCrearTramite, setStateCrearTramite] = useState(initialStateCrearTramite);
    const [forms, setForms] = useState(2); // controla el paginado de los forms
    const [tiposTramites, setTiposTramites] = useState([]);
    const [tipoSolicitud, setTipoSolicitud] = useState([]);
    const [tiposSolicitante, setTiposSolicitudes] = useState([]);
    const [tiposDeSuelo, setTiposDeSuelo] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [tramiteSeleccionado, setTramiteSeleccionado] = useState('');
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
            titularesDeDerecho:[],
            fichaCatastral:{
                name:'fichaCatastral',
                value:'',
                validation:''
            },
            matricula:{
                name:'matricula',
                value:'',
                validation:''
            },
            tipoDeSuelo:{
                name:'tipoDeSuelo',
                value:'',
                validation:''
            },
            municipio:{
                name:'municipio',
                value:'',
                validation:''
            },
            files:{
                name:'files',
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

    const avancePagina = (formularioTotalOk, avanza) => {
        console.log("avanzando pagina", formularioTotalOk)
        setForms(avanza ? (forms + 1) : (forms - 1));
    }

    const getTramitesSolicitudes = async() => { // pobla el campo Trámite y tipo de solicitante
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

    const getTiposSolicitud = async(valorConsultar) => { // pobla el campo Solicitud
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

    const openInfoFiles = () => {
        updateStore({
            ...store,
            dialogTool:{
                open:true, msg :constantesGlobales.tipoNotas.nota1,
                tittle:'Nota', 
                response:false, actions:false, 
                styles:{backgroundColor: 'rgba(10,10,10,0.8)', color:'white'},
                textColor:{color:'white'},
            },
        });
    }
    
    return (
        <div className="sombra" style={{backgroundColor:'white', width:'50%', padding:'5px', borderRadius:'10px', marginTop:'25px'}}>
            <div /* style={{marginTop:'5px'}} */ className="tituloTramite"><p>Nuevo trámite</p></div>
            {
                forms === 1 ? 
                    <FirstFormTramitre 
                        handleFormChange={handleFormChange}
                        tiposTramites={tiposTramites}
                        tipoSolicitud={tipoSolicitud}
                        tiposSolicitante={tiposSolicitante}
                        avancePagina={avancePagina}
                        formularioTramite={formularioTramite}
                        setFormularioTramite={setFormularioTramite}
                        openInfoFiles={openInfoFiles}
                />
                : forms === 2 ?
                    <MutacionDePrimera
                        handleFormChange={handleFormChange}
                        formularioTramite={formularioTramite}
                        setFormularioTramite={setFormularioTramite}
                        tiposDeSuelo={tiposDeSuelo}
                        municipios={municipios}
                    />
                : <h1>ultimo</h1>
            }
            

        </div>
    )
}

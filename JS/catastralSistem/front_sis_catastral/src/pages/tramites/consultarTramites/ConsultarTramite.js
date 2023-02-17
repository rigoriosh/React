import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";

import { StoreContext } from '../../../App';
import enviroment from '../../../helpers/enviroment';
import { textosInfoWarnig } from '../../../helpers/utils';

import { getInfoGET } from '../../../api';
import { TablaTramites } from './TablaTramites';
import { CrearTramite } from '../CrearTramite';


export const ConsultarTramite = ({tipoTramite='Consulta'/* , setOpenBackDrop */}) => {
    const { store, updateStore } = useContext(StoreContext);
    let navigate = useNavigate();
    // const [stateConsultarTramite, setStateConsultarTramite] = useState(initStateConsultarTramite);
    // const {registrosGetSolicitudesUsuario, tramiteSeleccionado} = stateConsultarTramite;
    const [registrosGetSolicitudesUsuario, setRegistrosGetSolicitudesUsuario] = useState([]);
    const [paginado, setPaginado] = useState({})
    const [showDetalleTramite, setShowDetalleTramite] = useState(false);
    const [detalleTramite, setDetalleTramite] = useState({});

    useEffect(() => {
        updateStore({...store, openBackDrop:true, llama:"L24FConsultarTramite"});
        // setOpenBackDrop(true)
        // setTimeout(() => {
            getTramite(0,10);
            // getTramiteTest();
        // }, 3000);
        console.log("ConsultaTramiteeeee")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line no-unused-vars
    const getTramiteTest = () => {
        console.log("getTramiteTest")
        setTimeout(() => {
            poblarTablaTramites({
                "resultado": {
                    "paginacion": {
                        "paginaActual": 0,
                        "totalPaginas": 21
                    },
                    "solicitudes": [
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 7,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 8,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 9,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 10,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 18,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        }
                    ]
                }
                /* "resultado": {
                    "solicitudes": [
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 4,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 5,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 6,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 7,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 8,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 9,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 10,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 18,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 19,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 20,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 22,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 23,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 24,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 25,
                            "numeroRadicado": "45678",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 26,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 27,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 28,
                            "numeroRadicado": "123456789",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 33,
                            "numeroRadicado": "RASOGC-33-22-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 35,
                            "numeroRadicado": "RASOGC-35-22-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 38,
                            "numeroRadicado": "RASOGC-38-22-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 40,
                            "numeroRadicado": "RASOGC-40-22-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 42,
                            "numeroRadicado": "RASOGC-42-24-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitud Certificado Catastral",
                            "idSolicitud": 43,
                            "numeroRadicado": "RASOGC-43-24-11-2021",
                            "tipoTramite": "Solicitudes / Certificados"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 60,
                            "numeroRadicado": "RASOGC-60-27-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 62,
                            "numeroRadicado": "RASOGC-62-27-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 63,
                            "numeroRadicado": "RASOGC-63-27-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 64,
                            "numeroRadicado": "RASOGC-64-27-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 73,
                            "numeroRadicado": "RASOGC-73-29-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 74,
                            "numeroRadicado": "RASOGC-74-29-11-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Englobe o Agregación de un predio",
                            "idSolicitud": 76,
                            "numeroRadicado": "RASOGC-76-30-11-2021",
                            "tipoTramite": "Mutación de Segunda"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 78,
                            "numeroRadicado": "RASOGC-78-3-12-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 79,
                            "numeroRadicado": "RASOGC-79-3-12-2021",
                            "tipoTramite": "Mutación de Primera"
                        },
                        {
                            "estado": "Radicado",
                            "nombreTramite": "Solicitudes / Certificados",
                            "idSolicitud": 96,
                            "numeroRadicado": "RASOGC-96-3-12-2021",
                            "tipoTramite": "Mutación de Primera"
                        }
                    ]
                } */
            })
        }, 1000);
    }

    const getTramite = async(pag, tam) => {
        // setOpenBackDrop(true)
        // updateStore({...store, openBackDrop: false});
        updateStore({...store, openBackDrop:true, llama:"L324FConsultaTramite"});
        // setTimeout(() => {
        // }, 1000);
        try {
            const headers = {token: store.user.token};
            const idUser = store.user.infoUser.idUsuario
            const  response = await getInfoGET(headers, enviroment.getSolicitudesUsuario+'/'+idUser+`?pag=${pag}&tam=${tam}`);
            if (response.error) {
                falloLaPeticion(response.error);
                navigate("/tramites")
            } else {
                if (response.resultado.solicitudes.length > 0) {
                    poblarTablaTramites(response);
                } else {
                    // setOpenBackDrop(false);
                    updateStore({
                        ...store,
                        openBackDrop:false,
                        snackBar:{
                            openSnackBar:true,
                            messageSnackBar: 'No tienes solicitudes creadas', severity:'info', },
                        dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L339FConsultarTramite"
                    });
                    navigate("/tramites");        
                }
                // return response;
            }
        } catch (error) {
            falloLaPeticion(error);
            navigate("/tramites")
        }
    }

    const poblarTablaTramites = (response) => {
        console.log("poblarTablaTramites")
        const solicitudes = [...registrosGetSolicitudesUsuario, ...response.resultado.solicitudes];
        solicitudes.map((solicitud, item) => solicitud.id = item);
        setRegistrosGetSolicitudesUsuario(solicitudes);
        setPaginado(response.resultado.paginacion);
        updateStore({...store, openBackDrop: false,llama:"L364FConsultarTramite"});
    }

    const falloLaPeticion = (error) => {
        updateStore({
            ...store,
            openBackDrop:false,
            snackBar:{
                openSnackBar:true,
                messageSnackBar: textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L370FConsultarTramite"
        });
        // setOpenBackDrop(false)
    }

    const getDetalleTramite = async({idSolicitud})=>{
        updateStore({...store, openBackDrop:true, llama:"L382FConsultarTramite"});
        // setOpenBackDrop(true)
        //fixDataDetalleTramite(dataTestDetalleTramite);
        try {
            const headers = {token: store.user.token};
            const  response = await getInfoGET(headers, enviroment.getDetalleSolicitud+'/'+idSolicitud);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                fixDataDetalleTramite(response);
                // return response;
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const fixDataDetalleTramite = (response) => {
        const responseDetalleTramite = response.resultado.solicitud;

        const titularesPredio = response.resultado.solicitud.titularesPredio;
        titularesPredio.map((d,i) => d.id = i);
        
        const estadosSolicitud = response.resultado.solicitud.estadosSolicitud;
        const updateEstadosSolicitud = estadosSolicitud.map((d,i) => {
            const fecha = new Date(d.fechaEstado)
            return {
                ...d,
                id: i,
                fechaEstado: fecha.getDate()+'/'+(fecha.getMonth() + 1)+'/'+fecha.getFullYear(),
            }
        });
        const prediosAsociados = response.resultado.solicitud.prediosAsociados;
        prediosAsociados.map((d,i) => d.id = i);
        
        responseDetalleTramite.titularesPredio =  titularesPredio;
        responseDetalleTramite.estadosSolicitud =  updateEstadosSolicitud;
        responseDetalleTramite.prediosAsociados =  prediosAsociados;
        setDetalleTramite(responseDetalleTramite);
        setShowDetalleTramite(true);
    }


    return (
        <div className="sombra componentFather" >
            {
                !showDetalleTramite
                ?   <TablaTramites
                        getDetalleTramite={getDetalleTramite}
                        registrosGetSolicitudesUsuario={registrosGetSolicitudesUsuario}
                        setRegistrosGetSolicitudesUsuario={setRegistrosGetSolicitudesUsuario}
                        paginado={paginado}
                        tipoTramite={tipoTramite}
                        getTramite={getTramite}
                        setPaginado={setPaginado}
                    />
                :   <CrearTramite 
                        key={'CrearTramite'}
                        detalleTramite={detalleTramite}
                        modoTramite={tipoTramite}
                        getDetalleTramite={getDetalleTramite}
                    />
            }
            
        </div>
    )
}

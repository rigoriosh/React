import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useLocation, useNavigate } from "react-router-dom";

import { StoreContext } from '../../../App';
import enviroment from '../../../helpers/enviroment';
import { ajusteDataTramite, textosInfoWarnig } from '../../../helpers/utils';

import { getInfoGET } from '../../../api';
import { TablaTramites } from './TablaTramites';
import { getSolicitudId_179, paginadoTest } from '../../../helpers/toTest';
// import { CrearTramite } from '../CrearTramite';


export const ConsultarTramite = ({tipoTramite/* , setOpenBackDrop */}) => {
    const { store, updateStore } = useContext(StoreContext);
    const {modeTest} = store;
    let location = useLocation();
    // console.log(location);
    let navigate = useNavigate();
    // const [stateConsultarTramite, setStateConsultarTramite] = useState(initStateConsultarTramite);
    // const {registrosGetSolicitudesUsuario, tramiteSeleccionado} = stateConsultarTramite;
    const [registrosGetSolicitudesUsuario, setRegistrosGetSolicitudesUsuario] = useState([]);
    const [paginado, setPaginado] = useState({})
    // const [showDetalleTramite, setShowDetalleTramite] = useState(false);
    // const [detalleTramite, setDetalleTramite] = useState({});

    useEffect(() => {
        // updateStore({...store, openBackDrop:true, llama:"L24FConsultarTramite"});
        const solicitudesSession = JSON.parse(sessionStorage.getItem('solicitudes'))
        if (solicitudesSession) {
            if (solicitudesSession.length > 0) {
                setRegistrosGetSolicitudesUsuario(solicitudesSession);
                updateStore({...store, openBackDrop: false, detalleTramite:{}, llama:"L32FConsultarTramite"});
            }else{
                getTramite(0,10);
            }
        }else{
            getTramite(0,10);
        }
        // getTramiteTest();
        // console.log("ConsultaTramiteeeee")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line no-unused-vars
    const getTramiteTest = () => {
        // console.log("getTramiteTest")
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

    const getTramite = async(pag, tam, consulta) => {

        updateStore({...store, openBackDrop:true, llama:"L332FConsultaTramite", detalleTramite:{}});
        
        try {
            const headers = {token: store.user.token};
            const idUser = store.user.infoUser.idUsuario
            let  response = {};
            if (modeTest) {
                response = paginadoTest;
            } else {
                response = await getInfoGET(headers, enviroment.getSolicitudesUsuario+'/'+idUser+`?pag=${pag}&tam=${tam}`);
            }
            
            if (response.error) {
                falloLaPeticion(response.error);
                navigate("/tramites")
            } else {
                if (response.resultado.solicitudes.length > 0) {
                    poblarTablaTramites(response,consulta);
                } else {
                    // setOpenBackDrop(false);
                    updateStore({
                        ...store, detalleTramite:{},
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

    const poblarTablaTramites = (response,consulta) => {
        // console.log("poblarTablaTramites")
        let solicitudes = [];
        if (consulta) {
            solicitudes = [...response.resultado.solicitudes];
        } else {
            solicitudes = [...registrosGetSolicitudesUsuario, ...response.resultado.solicitudes];
        }
        solicitudes.map((solicitud, item) => solicitud.id = item);
        setRegistrosGetSolicitudesUsuario(solicitudes);
        // sessionStorage.setItem('solicitudes', JSON.stringify(solicitudes))
        setPaginado(response.resultado.paginacion);
        updateStore({...store, openBackDrop: false, detalleTramite:{}, llama:"L372FConsultarTramite"});
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

    const getDetalleTramite = async(row)=>{
        
        updateStore({
            ...store,
            openBackDrop:true,
            snackBar:{
                openSnackBar:false,
                messageSnackBar: '', severity:'info'
            },
            llama:"L376FConsultarTramite"});
        try {
            let response = {};
            if (modeTest) {
                response = getSolicitudId_179;
            } else {
                const headers = {token: store.user.token};
                response = await getInfoGET(headers, enviroment.getDetalleSolicitud+'/'+row.idSolicitud);
            }
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                //debugger
                sessionStorage.setItem('solicitudes', JSON.stringify([row]))
                fixDataDetalleTramite(response);
                // return response;
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const fixDataDetalleTramite = (response) => {
        
        const responseDetalleTramite = ajusteDataTramite(response)
        // setDetalleTramite(responseDetalleTramite);
        updateStore({
            ...store,
            detalleTramite:responseDetalleTramite,
            modoTramite:tipoTramite,
            // modoTramite:"Seguimiento",
            // modoTramite:"Consulta",
            llama:"L418FConsultarTramite",
            openBackDrop:false,
            snackBar:{
                openSnackBar: false,
                messageSnackBar: '',
                severity: 'success'
            }
        })
        // setShowDetalleTramite(true);
        moverPagina();
        
    }

    const moverPagina = () => {
        let pathname = location.pathname;
        pathname = pathname.split('/');
        pathname=pathname[pathname.length-1]
        pathname==='consultaTramite'
            ? navigate("/tramites/consultaTramite/consulta")
            : navigate("/tramites/seguimientoTramite/detalle")
    }


    return (
        <div className="sombra componentFather" >
            <TablaTramites
                        getDetalleTramite={getDetalleTramite}
                        registrosGetSolicitudesUsuario={registrosGetSolicitudesUsuario}
                        setRegistrosGetSolicitudesUsuario={setRegistrosGetSolicitudesUsuario}
                        paginado={paginado}
                        tipoTramite={tipoTramite}
                        getTramite={getTramite}
                        setPaginado={setPaginado}
                    />
            {/* {
                !showDetalleTramite
                   
                   <CrearTramite 
                        key={'CrearTramite'}
                        detalleTramite={detalleTramite}
                        modoTramite={tipoTramite}
                        getDetalleTramite={getDetalleTramite}
                    />
            } */}
            
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import { createSolitud, getInfoGET } from '../../api'
import { StoreContext } from '../../App'
import { DialogMsgOk } from '../../componets/DialogMsgOk'
import enviroment from '../../helpers/enviroment'
import { constantesGlobales, regExp10Num, regExp10Num2dec, textosInfoWarnig } from '../../helpers/utils'
import { VerEstado } from './consultarTramites/VerEstado';
import { FirstFormTramitre } from './formulariosTramite/FirstFormTramitre'
import { SecondFormTramitre } from './formulariosTramite/SecondFormTramitre'


export const CrearTramite = ({detalleTramite={}, modoTramite, getDetalleTramite}) => {

    const { store, updateStore } = useContext(StoreContext);
    let navigate = useNavigate();
    const [forms, setForms] = useState(1); // controla el paginado de los forms
    const [tiposTramites, setTiposTramites] = useState([]);
    const [tipoSolicitud, setTipoSolicitud] = useState([
        {
            descripcionValor:'Seleccione...',
            valor:''
        }
    ]);
    const [tiposSolicitante, setTiposSolicitudes] = useState([]);
    const [tiposDeSuelo, setTiposDeSuelo] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [openDialog, setOpenDialog] = useState({
        open:false,
        tittle:'',
        msg:'',
        tipo:"OK",//"SI/NO"
        response:false
    });
    const [formularioTramite, setFormularioTramite] = useState(
        {
            modoTramite:'Nuevo',
            tipoTramite:{
                name:'tipoTramite',
                // value:'MP',
                value:'',
                validation:''
            },
            tipoInscripcion:{
                name:'tipoInscripcion',
                // value:'INP',
                value:'',
                validation:''
            },
            motivoSolicitud:{
                name:'motivoSolicitud',
                // value:'CPP',
                value:'',
                validation:''
            },
            tipoSolicitante:{
                name:'tipoSolicitante',
                // value:'PR',
                value:'',
                validation:''
            },
            razonSolicitud:{
                name:'razonSolicitud',
                // value:'PORQUE VOY A ENTRAR EN UN PLEITO Y NECESITO TENER LA INFORMACION CLARA',
                value:'',
                validation:''
            },
            tipoDeSuelo:{
                name:'tipoDeSuelo',
                // value:'RU',
                value:'',
                validation:''
            },
            municipio:{
                name:'municipio',
                // value:'54385',
                value:'',
                validation:''
            },
            file:{
                name:'file',
                // value:'',
                value:'',
                validation:''
            },
            zip:{},
            propiedadHorizontal:{
                name:'propiedadHorizontal',
                // value:'S',
                value:'',
                validation:''
            },
            proyectoUrbanistico:{
                name:'proyectoUrbanistico',
                // value:'N',
                value:'',
                validation:''
            },
            objetoPeticion:{
                name:'objetoPeticion',
                // value:'CDE',
                value:'',
                validation:''
            },
            consideraMejora:{
                name:'consideraMejora',
                // value:'INC',
                value:'',
                validation:''
            },
            avaluoTerreno:{
                name:'avaluoTerreno',
                // value:30.1,
                value:'',
                validation:''
            },
            avaluoConstruccion:{
                name:'avaluoConstruccion',
                // value:120.4,
                value:'',
                validation:''
            },
            areaTerreno:{
                name:'areaTerreno',
                // value:20.4,
                value:'',
                validation:''
            },
            areaConstruccion:{
                name:'areaConstruccion',
                // value:18.4,
                value:'',
                validation:''
            },
            autoestimacionAvaluo:{
                name:'autoestimacionAvaluo',
                // value:240000000,
                value:'',
                validation:''
            },
            diferenciaMayoEsta:{
                name:'diferenciaMayoEsta',
                // value:'T',
                value:'',
                validation:''
            },
            revisionBusca:{
                name:'revisionBusca',
                // value:'D',
                value:'',
                validation:''
            },
            noEscrituraPublica:{
                name:'noEscrituraPublica',
                // value:'ABCDEFG1234567',
                value:'',
                validation:''
            },
            anioEscritura:{
                name:'anioEscritura',
                // value:'2015',
                value:'',
                validation:''
            },
            notariaOtorgante:{
                name:'notariaOtorgante',
                // value:'NOTARIA DE PRUEBA',
                value:'',
                validation:''
            },
            objetoRectificacion:{
                name:'objetoRectificacion',
                // value:'CDE',
                value:'',
                validation:''
            },
            municipioNotaria:{
                name:'municipioNotaria',
                // value:'54385',
                value:'',
                validation:''
            },
            motivoDeLaSolicitud:{
                name:'motivoDeLaSolicitud',
                // value:'OFAC',
                value:'',
                validation:''
            },
            titularesDeDerecho:[
                /* {
                    id:0,
                    numeroDocumento:'132465',
                    tipoDocumento:'CC',
                    nombre:'nombreTest',
                    apellido:'apellidoTtest'
                },
                {
                    id:1,
                    numeroDocumento:'79845132',
                    tipoDocumento:'CC',
                    nombre:'nombreTest1',
                    apellido:'apellidoTtest1'
                } */
            ],
            MotivosSolicitud:[],
            ObjetosDeLaPeticion:[],
            ConsideraUnaMejoraLaMutacion:[],
            ConsideraQueLaDiferenciaMayorEstaEn:[],
            LaRevisionBusca:[],
            MunicipioDeLaNotaria:[],
            prediosAsociados:[
                /* {
                    id:0,
                    numeroPredial:'12345678932165498712396385274',
                    matriculaInmobiliaria:'ABCDE12345'
                },
                {
                    id:1,
                    numeroPredial:'98765432112345678996385274120',
                    matriculaInmobiliaria:'123456ABCD'
                }, */
            ],
            TiposInscripcion:[],
            ObjetosRectificacion:[],
        }
    );
    const {
        anioEscritura,
        avaluoTerreno,
        avaluoConstruccion,
        areaTerreno,
        areaConstruccion,
        autoestimacionAvaluo,
        noEscrituraPublica,
        notariaOtorgante,
        motivoSolicitud,
        municipio,
        tipoTramite,
        tipoSolicitante,
        titularesDeDerecho,
        tipoDeSuelo,
        zip,
    }  = formularioTramite;
    
    const handleFormChange = ({value, name}) => {
        if (name !== avaluoTerreno.name &&
            name !== avaluoConstruccion.name &&
            name !== areaTerreno.name &&
            name !== areaConstruccion.name &&
            name !== autoestimacionAvaluo.name &&
            name !== noEscrituraPublica.name &&
            name !== anioEscritura.name &&
            name !== notariaOtorgante.name
        ) {
                setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
        } else if(name === avaluoTerreno.name ||
                name === avaluoConstruccion.name ||
                name === areaTerreno.name ||
                name === areaConstruccion.name
        ){
            if (regExp10Num2dec.test(value)) {  // valida tipo de dato numerico 10 digitos y dos decimales
                setFormularioTramite(
                    {
                        ...formularioTramite,
                        [name]: {
                            ...formularioTramite[name],
                            value
                        }
                    }
                );
            }
        } else if(name === autoestimacionAvaluo.name){
            if (regExp10Num.test(value)) {  // valida tipo de dato numerico 10 digitos
                setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
            }
        } else if(name === noEscrituraPublica.name){
            if (value.length < 21) {  // valida longitud de campo hasta 20 caracteres
                setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
            }
        } else if(name === anioEscritura.name){
            if (value.length < 5) {  // valida longitud de campo hasta 4 caracteres
                setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
            }
        } else if(name === notariaOtorgante.name){
            if (value.length < 51) {  // valida longitud de campo hasta 50 caracteres
                setFormularioTramite({...formularioTramite, [name]:{...formularioTramite[name], value}})
            }
        }
    }

    const avancePagina = (formularioTotalOk, avanza) => {
        if (formularioTotalOk) {
            setForms(avanza ? (forms + 1) : (forms - 1));
        }
    }

    const getTramitesSolicitudes = async() => { // pobla el campo Tr??mite y tipo de solicitante
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getTiposTramite);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setTiposSolicitudes(addPrimerOpcionSelect(response.resultado.tiposSolicitantes));
                setTiposSolicitudes(addPrimerOpcionSelect(response.resultado.tiposSolicitantes));
                setTiposTramites(addPrimerOpcionSelect(response.resultado.tiposTramite));
                updateStore({...store, openBackDrop:false,});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const addPrimerOpcionSelect = (data) => {
        if(data[0].descripcionValor !== 'Seleccione...'){
            data.unshift({
                descripcionValor:'Seleccione...',
                valor:''
            })
        }
        return data;
    }

    const getTiposDeSuelos = async()=>{
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getTiposSuelo);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setTiposDeSuelo(addPrimerOpcionSelect(response.resultado.dominios));
                updateStore({...store, openBackDrop:false,});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const getMunicipios = async()=>{
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getMunicipiosCatatumbo);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setMunicipios(addPrimerOpcionSelect(response.resultado.dominios));
                updateStore({...store, openBackDrop:false,});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const getDataApi = async(url)=>{
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const  response = await getInfoGET(headers, url);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                updateStore({...store, openBackDrop:false,});
                return response;
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const falloLaPeticion = (error) => {
        updateStore({
            ...store,
            openBackDrop:false,
            snackBar:{
                openSnackBar:true,
                messageSnackBar: textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}
        });
    }

    const getTiposSolicitud = async(valorConsultar) => { // pobla el campo Solicitud
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token, valorConsultar};
            const response = await getInfoGET(headers, enviroment.getTiposSolicitud);
            setTipoSolicitud(addPrimerOpcionSelect(response.resultado.dominios));
            updateStore({...store, openBackDrop:false,});
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const resetFormulario = () => {
        setFormularioTramite(
            {
                ...formularioTramite,
                tipoSolicitante:{
                    name:'tipoSolicitante',
                    value:'',
                    validation:''
                },
                tipoInscripcion:{
                    name:'tipoInscripcion',
                    value:'',
                    validation:''
                },
                razonSolicitud:{
                    name:'razonSolicitud',
                    value:'',
                    validation:''
                },
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
                file:{
                    name:'file',
                    value:'',
                    validation:''
                },
                zip:{},
                propiedadHorizontal:{
                    name:'propiedadHorizontal',
                    value:'',
                    validation:''
                },
                proyectoUrbanistico:{
                    name:'proyectoUrbanistico',
                    value:'',
                    validation:''
                },
                objetoPeticion:{
                    name:'objetoPeticion',
                    value:'',
                    validation:''
                },
                consideraMejora:{
                    name:'consideraMejora',
                    value:'',
                    validation:''
                },
                avaluoTerreno:{
                    name:'avaluoTerreno',
                    value:'',
                    validation:''
                },
                avaluoConstruccion:{
                    name:'avaluoConstruccion',
                    value:'',
                    validation:''
                },
                areaTerreno:{
                    name:'areaTerreno',
                    value:'',
                    validation:''
                },
                areaConstruccion:{
                    name:'areaConstruccion',
                    value:'',
                    validation:''
                },
                autoestimacionAvaluo:{
                    name:'autoestimacionAvaluo',
                    value:'',
                    validation:''
                },
                diferenciaMayoEsta:{
                    name:'diferenciaMayoEsta',
                    value:'',
                    validation:''
                },
                revisionBusca:{
                    name:'revisionBusca',
                    value:'',
                    validation:''
                },
                noEscrituraPublica:{
                    name:'noEscrituraPublica',
                    value:'',
                    validation:''
                },
                anioEscritura:{
                    name:'anioEscritura',
                    value:'',
                    validation:''
                },
                notariaOtorgante:{
                    name:'notariaOtorgante',
                    value:'',
                    validation:''
                },
                objetoRectificacion:{
                    name:'objetoRectificacion',
                    value:'',
                    validation:''
                },
                municipioNotaria:{
                    name:'municipioNotaria',
                    value:'',
                    validation:''
                },
                motivoDeLaSolicitud:{
                    name:'motivoDeLaSolicitud',
                    value:'',
                    validation:''
                },
            }
        );
    }

    useEffect(() => {
        if (!detalleTramite.idSolicitud) {
            if (tipoTramite.value !== "") {
                getTiposSolicitud(tipoTramite.value);
                resetFormulario();
            }
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tipoTramite])


    const renderizarInfoSegunTipoTramite = () => {
        let msg = '', open = true;

        if( tipoTramite.value === 'MO' && motivoSolicitud.value === 'MPHC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MO_MPHC;
        }else if( tipoTramite.value === 'MP' && motivoSolicitud.value === 'CPP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MP_CPP;
        }else if( tipoTramite.value === 'MS' && motivoSolicitud.value === 'EAP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MS_EAP;
        }else if( tipoTramite.value === 'MS' && motivoSolicitud.value === 'DDP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MS_DDP;
        }else if( tipoTramite.value === 'MT' && motivoSolicitud.value === 'IRC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MT_IRC;
        }else if( tipoTramite.value === 'MC' && motivoSolicitud.value === 'AEAC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MC_AEAC;
        }else if( tipoTramite.value === 'MC' && motivoSolicitud.value === 'RAC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MC_RAC;
        }else if( tipoTramite.value === 'MQ' && motivoSolicitud.value === 'INCP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_MQ_INCP;
        }else if( tipoTramite.value === 'RE' && motivoSolicitud.value === 'RUD' ){
            msg = constantesGlobales.tipoNotas.msgInfo_RE_RUD;
        }else if( tipoTramite.value === 'RE' && motivoSolicitud.value === 'RAT' ){
            msg = constantesGlobales.tipoNotas.msgInfo_RE_RAT;
        }else if( tipoTramite.value === 'RE' && motivoSolicitud.value === 'ACN' ){
            msg = constantesGlobales.tipoNotas.msgInfo_RE_ACN;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCPPC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCPPC;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCC;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCCE' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCCE;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCFP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCFP;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCCPP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCCPP;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SPCC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SPCC;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SCNP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SCNP;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'CIC' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_CIC;
        }else if( tipoTramite.value === 'SC' && motivoSolicitud.value === 'SNP' ){
            msg = constantesGlobales.tipoNotas.msgInfo_SC_SNP;
        }else {
            open = false;
        }
        setTimeout(() => {
            updateStore({
                ...store,
                dialogTool:{
                    open,
                    msg,
                    tittle:'Nota', 
                    response:false,
                    actions:false, 
                    styles:{backgroundColor: 'rgba(10,10,10,0.8)', color:'white'},
                    textColor:{color:'white'},
                },
            })
            
        }, 10);
    }
    
    useEffect(() => {
        // debugger

        if (!detalleTramite.idSolicitud) {
            renderizarInfoSegunTipoTramite();
            resetFormulario();
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motivoSolicitud])

    useEffect(() => {
        // consultar tipos de tramites y tipos de solicitudes
        if (modoTramite === "Consulta" || modoTramite === "Seguimiento") {
            // poblar los campos del formularioTramite
            cargarInfoDetalleTramite();
        } else {
            getTramitesSolicitudes();
            getTiposDeSuelos();
            getMunicipios();
            poblarCamposSelect();
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cargarInfoDetalleTramite = () => {
        
        setFormularioTramite(
            {
                ...formularioTramite,
                modoTramite:'Detalle',
                tipoTramite:{
                    name:'tipoTramite',                    
                    value: detalleTramite.tipoTramite,
                    validation:''
                },
                tipoInscripcion:{
                    name:'tipoInscripcion',                    
                    value: detalleTramite.tipoInscripcion,
                    validation:''
                },
                motivoSolicitud:{
                    name:'motivoSolicitud',                    
                    value: detalleTramite.motivoSolicitud,
                    validation:''
                },
                tipoSolicitante:{
                    name:'tipoSolicitante',                    
                    value: detalleTramite.tipoSolicitante,
                    validation:''
                },
                razonSolicitud:{
                    name:'razonSolicitud',                    
                    value: detalleTramite.razonSolicitud,
                    validation:''
                },
                tipoDeSuelo:{
                    name:'tipoDeSuelo',                    
                    value: detalleTramite.claseSuelo,
                    validation:''
                },
                municipio:{
                    name:'municipio',                    
                    value: detalleTramite.municipioPredio,
                    validation:''
                },
                /* file:{
                    name:'file',                    
                    value: detalleTramite.,
                    validation:''
                },
                zip:{}, */
                propiedadHorizontal:{
                    name:'propiedadHorizontal',                    
                    value: detalleTramite.propiedadHorizontal,
                    validation:''
                },
                proyectoUrbanistico:{
                    name:'proyectoUrbanistico',                    
                    value: detalleTramite.proyectoUrbanistico,
                    validation:''
                },
                objetoPeticion:{
                    name:'objetoPeticion',                    
                    value: detalleTramite.objetoPeticion,
                    validation:''
                },
                consideraMejora:{
                    name:'consideraMejora',                    
                    value: detalleTramite.consideraMejora,
                    validation:''
                },
                avaluoTerreno:{
                    name:'avaluoTerreno',                    
                    value: detalleTramite.avaluoTerreno,
                    validation:''
                },
                avaluoConstruccion:{
                    name:'avaluoConstruccion',                    
                    value: detalleTramite.avaluoConstruccion,
                    validation:''
                },
                areaTerreno:{
                    name:'areaTerreno',                    
                    value: detalleTramite.areaTerreno,
                    validation:''
                },
                areaConstruccion:{
                    name:'areaConstruccion',                    
                    value: detalleTramite.areaConstruccion,
                    validation:''
                },
                autoestimacionAvaluo:{
                    name:'autoestimacionAvaluo',                    
                    value: detalleTramite.autoestimacionAvaluo,
                    validation:''
                },
                diferenciaMayoEsta:{
                    name:'diferenciaMayoEsta',                    
                    value: detalleTramite.diferenciaMayoEsta,
                    validation:''
                },
                revisionBusca:{
                    name:'revisionBusca',                    
                    value: detalleTramite.revisionBusca,
                    validation:''
                },
                noEscrituraPublica:{
                    name:'noEscrituraPublica',                    
                    value: detalleTramite.noEscrituraPublica,
                    validation:''
                },
                anioEscritura:{
                    name:'anioEscritura',                    
                    value: detalleTramite.anioEscritura,
                    validation:''
                },
                notariaOtorgante:{
                    name:'notariaOtorgante',                    
                    value: detalleTramite.notariaOtorgante,
                    validation:''
                },
                objetoRectificacion:{
                    name:'objetoRectificacion',                    
                    value: detalleTramite.objetoRectificacion,
                    validation:''
                },
                municipioNotaria:{
                    name:'municipioNotaria',                    
                    value: detalleTramite.municipioNotaria,
                    validation:''
                },
                motivoDeLaSolicitud:{
                    name:'motivoDeLaSolicitud',                    
                    value: detalleTramite.motivoSolicitud,
                    validation:''
                },
                titularesDeDerecho: detalleTramite.titularesPredio,
                prediosAsociados: detalleTramite.prediosAsociados,

            }
        );
        updateStore({...store, openBackDrop:false,});
    }
    const poblarCamposSelect = async()=>{
        updateStore({...store, openBackDrop:true,});
        try {
            const responseMotivosSolicitud = await getDataApi(enviroment.getMotivoSolicitud);
            const responseObjetosDeLaPeticion = await getDataApi(enviroment.getObjetoPeticion);
            const responseConsideraUnaMejoraLaMutacion = await getDataApi(enviroment.getConsideraMejora);
            const responseConsideraQueLaDiferenciaMayorEstaEn = await getDataApi(enviroment.getDiferenciaMayor);
            const responseLaRevisionBusca = await getDataApi(enviroment.getRevisionBusca);
            const responseMunicipioDeLaNotaria = await getDataApi(enviroment.getCodigosDane);
            const responseTiposInscripcion = await getDataApi(enviroment.getTipoSolicitudIns);
            const responseObjetosRectificacion = await getDataApi(enviroment.getObjetoRectifica);
            setFormularioTramite({
                ...formularioTramite,
                MotivosSolicitud: addPrimerOpcionSelect( responseMotivosSolicitud.resultado.dominios),
                ObjetosDeLaPeticion: addPrimerOpcionSelect( responseObjetosDeLaPeticion.resultado.dominios),
                ConsideraUnaMejoraLaMutacion: addPrimerOpcionSelect( responseConsideraUnaMejoraLaMutacion.resultado.dominios),
                ConsideraQueLaDiferenciaMayorEstaEn: addPrimerOpcionSelect( responseConsideraQueLaDiferenciaMayorEstaEn.resultado.dominios),
                LaRevisionBusca: addPrimerOpcionSelect( responseLaRevisionBusca.resultado.dominios),
                MunicipioDeLaNotaria: addPrimerOpcionSelect( responseMunicipioDeLaNotaria.resultado.dominios),
                TiposInscripcion: addPrimerOpcionSelect(responseTiposInscripcion.resultado.dominios),
                ObjetosRectificacion: addPrimerOpcionSelect(responseObjetosRectificacion.resultado.dominios),

            });
            updateStore({...store, openBackDrop:false,});
        } catch (error) {
            falloLaPeticion(error);
            navigate("/");
        }

    }

    const quitarIdDelRegistros_prediosAsociados = (data) => {
        const cloneData = [];
        data.forEach(({numeroPredial, matriculaInmobiliaria}) => {
            cloneData.push(
                { numeroPredial, matriculaInmobiliaria }
            )
        });
        return cloneData;
    }
    const quitarIdDelRegistros_titularesPredio = (data) => {
        const cloneData = [];
        data.forEach(({nombre, apellido, tipoDocumento, numeroDocumento}) => {
            cloneData.push(
                { nombre, apellido, tipoDocumento, numeroDocumento }
            )
        });
        return cloneData;
    }
    
    const onSubmitFinal = async() => {
        const data = {
            "numeroRadicado": "123456789",
            "tipoSolicitante": tipoSolicitante.value,
            "idSolicitante": {
              "idUsuario": store.user.infoUser.idUsuario
            },
            "tipoTramite": tipoTramite.value,
            "nombreTramite": tipoTramite.value,
            "municipioPredio": municipio.value,
            "claseSuelo": tipoDeSuelo.value,
            "propiedadHorizontal": formularioTramite.propiedadHorizontal.value,
            "proyectoUrbanistico": formularioTramite.proyectoUrbanistico.value,
            "noEscrituraPublica": formularioTramite.noEscrituraPublica.value,
            "anioEscritura": formularioTramite.anioEscritura.value,
            "notariaOtorgante": formularioTramite.notariaOtorgante.value,
            "municipioNotaria": formularioTramite.municipioNotaria.value,
            "objetoPeticion": formularioTramite.objetoPeticion.value,
            "consideraMejora": formularioTramite.consideraMejora.value,
            "diferenciaMayoEsta": formularioTramite.diferenciaMayoEsta.value,
            "revisionBusca": formularioTramite.revisionBusca.value,
            "tipoInscripcion": formularioTramite.tipoInscripcion.value,
            "motivoSolicitud": formularioTramite.motivoSolicitud.value,
            "objetoRectificacion": formularioTramite.objetoRectificacion.value,
            "areaTerreno": formularioTramite.areaTerreno.value,
            "areaConstruccion": formularioTramite.areaConstruccion.value,
            "avaluoTerreno": formularioTramite.avaluoTerreno.value,
            "avaluoConstruccion": formularioTramite.avaluoConstruccion.value,
            "autoestimacionAvaluo": formularioTramite.autoestimacionAvaluo.value,
            "razonSolicitud": formularioTramite.razonSolicitud.value,
            "titularesPredio": quitarIdDelRegistros_titularesPredio(Object.assign([], titularesDeDerecho)),
            "prediosAsociados": quitarIdDelRegistros_prediosAsociados(Object.assign([], formularioTramite.prediosAsociados))
          }
        updateStore({...store, openBackDrop:true,});
        try {
            const headers = {token: store.user.token};
            const body = {
                file:zip,
                data:JSON.stringify(data),
            }
            const response = await createSolitud(headers, enviroment.createSolicitud, 'POST', body);
            let messageSnackBar = '', openSnackBar = true;
            if(response.error){
                messageSnackBar = response.error.descripcion ? response.error.descripcion : response.error

            }else{
                messageSnackBar = response.resultado.mensaje;
                setOpenDialog({
                    open:true,
                    tittle:'??Felicidades!',
                    msg: textosInfoWarnig.tramiteExito,
                    tipo:"OK",//"SI/NO"
                    response:false
                });
                openSnackBar = false;
            }
            updateStore({
                ...store,
                openBackDrop:false,
                snackBar:{
                    openSnackBar,
                    messageSnackBar,
                    severity:'warning',
                },
            });
        } catch (error) {
            falloLaPeticion();
        }

    }

    return (
        <div className={modoTramite === 'Nuevo' ? "sombra componentFather": ''} >
            {
                modoTramite === 'Nuevo'
                ?
                    <div /* style={{marginTop:'5px'}} */ className="tituloTramite"><p>Nuevo tr??mite</p></div>
                :
                    <p style={{
                        textAlign:'end',
                        fontWeight:'bold',
                        color:'gray',
                        position:'absolute',
                        left:'52%',
                        // top:'265px'
                    }}>{detalleTramite.numeroRadicado}</p>
            }
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
                        renderizarInfoSegunTipoTramite={renderizarInfoSegunTipoTramite}
                        setForms={setForms}
                        detalleTramite={detalleTramite}
                        cargarInfoDetalleTramite={cargarInfoDetalleTramite}
                        modoTramite={modoTramite ? modoTramite : 'Nuevo'}
                        addPrimerOpcionSelect={addPrimerOpcionSelect}
                />
                : forms === 2 ?
                    <SecondFormTramitre
                        handleFormChange={handleFormChange}
                        formularioTramite={formularioTramite}
                        tiposDeSuelo={tiposDeSuelo}
                        municipios={municipios}
                        setFormularioTramite={setFormularioTramite}
                        avancePagina={avancePagina}
                        onSubmitFinal={onSubmitFinal}
                        renderizarInfoSegunTipoTramite={renderizarInfoSegunTipoTramite}
                        setForms={setForms}
                        modoTramite={modoTramite ? modoTramite : 'Nuevo'}
                    />
                : forms === "verEstado" ?
                    <VerEstado
                        setForms={setForms}
                        detalleTramite={detalleTramite}
                        formularioTramite={formularioTramite}
                        modoTramite={modoTramite}
                        getDetalleTramite={getDetalleTramite}
                    />
                : <h1>ultimo</h1>
            }
            
            <DialogMsgOk openDialog={openDialog} setOpenDialog={setOpenDialog} />

        </div>
    )
}

  export const msgInfo_MO_MPHC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />
            <p className="labels1">Copia del reglamento de propiedad horizontal debidamente
                registrado, as?? como, de las reformas, modificaciones,
                aclaraciones y correcci??n de los t??tulos con sus respectivos
                anexos, si los hay.</p><br />
            <p className="labels1">Para realizar la solicitud de un tr??mite de una reforma, la
                propiedad horizontal debe estar incorporada en la base predial
                catastral.</p><br />
            <p className="labels1">Si hay m??s de una escritura de reforma, o aclaraciones o
                correcciones de los t??tulos, anexarlos en la solicitud.</p><br />
        </div>
    )
  }
  export const msgInfo_MP_CPP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />
            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Cambio de propietario: Copia del t??tulo de dominio (Escritura P??blica. Acto administrativo o Sentencia) debidamente registrado.</p><br />
            <p className="labels1">Cambio de poseedor u ocupante: Documentos que establezcan la posesi??n u ocupaci??n como constancias de pago de impuestos, servicios p??blicos, contribuciones, valorizaci??n etc</p><br />
            <p className="labels1">El cambio de nombre entre poseedores u ocupantes estar?? sujeto al estudio de los documentos aportados por el solicitante.</p><br />
        </div>
    )
  }
  export const msgInfo_MS_EAP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del t??tulo de dominio (Escritura P??blica. Acto administrativo o Sentencia debidamente registrado, en donde conste el englobe y/o el desenglobe de los bienes inmuebles, as?? como las modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay).</p><br />
            <p className="labels1">Se debe adjuntar el plano de levantamiento planim??trico de acuerdo con las especificaciones t??cnicas establecidas en el art??culo 11 del presente acto administrativo.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal: </span> copia legible del t??tulo de dominio (Escritura P??blica, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, as?? como sus reformas, modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localizaci??n y descripci??n del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyecci??n cartogr??fica de Origen ??nico para Colombia, el cual debe contener la planta de cubiertas, con el n??mero de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los pol??gonos de construcci??n en una sola l??nea, o copia del plano aprobado con la licencia per parte de la curadur??a que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relaci??n de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, c??rculo registral y matr??cula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
        </div>
    )
  }
  export const msgInfo_MS_DDP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del t??tulo de dominio (Escritura P??blica. Acto administrativo o Sentencia debidamente registrado, en donde conste el englobe y/o el desenglobe de los bienes inmuebles, as?? como las modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay).</p><br />
            <p className="labels1">Se debe adjuntar el plano de levantamiento planim??trico de acuerdo con las especificaciones t??cnicas establecidas en el art??culo 11 del presente acto administrativo.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal: </span> copia legible del t??tulo de dominio (Escritura P??blica, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, as?? como sus reformas, modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano del desarrollo urban??stico en medio magn??tico (formato dwg o dxf o shapefile), con cuadro de coordenadas referidas al sistema de proyecci??n cartogr??fica de origen ??nico para Colombia.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal:</span> Copia legible del t??tulo de dominio (Escritura P??blica, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, as?? como sus reformas, modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localizaci??n y descripci??n del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyecci??n cartogr??fica de Origen ??nico para Colombia, el cual debe contener la planta de cubiertas, con el n??mero de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los pol??gonos de construcci??n en una sola l??nea, o copia del plano aprobado con la licencia per parte de la curadur??a que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relaci??n de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, c??rculo registral y matr??cula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
        </div>
    )
  }
  export const msgInfo_MT_IRC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Documento de certificaci??n juramentada del ??rea de la construcci??n, cuando se cuente con planos de la construcci??n se podr??n aportar, los planos deben cumplir con las especificaciones t??cnicas definidas en el art??culo 11 de la presente resoluci??n.</p><br />
            <p className="labels1">Para el caso de predios ubicados en municipios cuyo catastro no ha sido formado de conformidad con la ley 14 de 1983: Se requiere acreditar en la solicitud, la existencia y propiedad, y debe indicar el ??rea y aval??o.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad horizontal:</span> Copia de la escritura del reglamento de Propiedad Horizontal y sus modificaciones o adiciones debidamente registradas, incluyendo planos protocolizados de localizaci??n y planos arquitect??nicos por tipo de construcci??n, en escala original aprobado por planeaci??n o curadur??a urbana.</p><br />
        </div>
    )
  }
  export const msgInfo_MC_AEAC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">En la declaraci??n de autoestimaci??n del aval??o catastral, podr?? presentar el aval??o comercial, planos, certificaciones de autoridades administrativas, aerofotograf??as, escrituras p??blicas y otros documentos que demuestren los cambios f??sicos, valorizaci??n o cambios de uso en el predio.</p><br />
        </div>
    )
  }
  export const msgInfo_MC_RAC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">En la petici??n se debe indicar claramente la vigencia para la cual se solicita la revisi??n de aval??o y manifestar los motivos de inconformidad.</p><br />
            <p className="labels1">Anexar los documentos que demuestren que el aval??o no se ajusta a las caracter??sticas y condiciones del predio, en cuanto a linderos, ??rea, uso, clases de terreno o naturaleza de la construcci??n, condiciones; ubicaci??n, v??as de acceso, clase de terreno y naturaleza de la construcci??n, condiciones locales del mercado inmobiliario y dem??s informaciones pertinentes.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>El propietario, poseedor u ocupante podr?? presentar documentos como:</span> Para cambios f??sicos: Escritura p??blica que indique la segregaci??n o agregaci??n de ??reas, por contratos o certificados de la Alcald??a Municipal sobre nuevas construcciones, demoliciones o deterioros.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Valorizaci??n:</span> Mediante certificaciones de la Alcald??a Municipal o de la autoridad que haya adelantado la obra correspondiente.</p><br />
            <p className="labels1">Cambios de uso: Mediante certificados de entidades financieras o de la Alcald??a Municipal o de la C??mara de comercio, y otros.</p><br />
        </div>
    )
  }
  export const msgInfo_MQ_INCP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del t??tulo de dominio (Escritura P??blica, Acto administrativo o Sentencia) debidamente registrado del bien inmueble.</p><br />
        </div>
    )
  }
  export const msgInfo_RE_RUD = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">En predios PH: Copia de la escritura del reglamento de Propiedad Horizontal y sus modificaciones o adiciones debidamente registradas, incluyendo planos protocolizados de localizaci??n y planos arquitect??nicos por tipo de construcci??n, en escala original aprobado por planeaci??n o curadur??a urbana.</p><br />
            <p className="labels1">Para predio No PH: Para modificaci??n del destino econ??mico: Copia del acto administrativo expedido por la autoridad competente aportando las pruebas que permitan sustentar la solicitud. (Aplica para predios con destino de inter??s hist??rico, cultural o arquitect??nico). Para predios con otro destino econ??mico, cualquier medio probatorio que permita sustentar el tipo de solicitud, se debe tener en cuenta la actividad predominante que se desarrolle en el predio.</p><br />
            <p className="labels1"></p><br />
        </div>
    )
  }
  export const msgInfo_RE_RAT = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia legible del t??tulo de dominio (Escritura P??blica, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, as?? como sus reformas, modificaciones, aclaraciones y correcci??n de los t??tulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localizaci??n y descripci??n del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyecci??n cartogr??fica de Origen ??nico para Colombia, el cual debe contener la planta de cubiertas, con el n??mero de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los pol??gonos de construcci??n en una sola l??nea, o copia del plano aprobado con la licencia per parte de la curadur??a que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relaci??n de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, c??rculo registral y matr??cula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
            <p className="labels1"></p><br />
        </div>
    )
  }
  export const msgInfo_RE_ACN = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Predios urbanos: Copia legible del documento mediante el cual La Oficina de Planeaci??n Municipal asigna o corrige la nomenclatura del predio.</p><br />
            <p className="labels1">En caso de predios rurales, copia de escritura p??blica debidamente registrada donde figure el cambio de la nomenclatura</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCPPC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCCE = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCFP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCCPP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SPCC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCNP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
  export const msgInfo_SC_CIC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SNP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>??Recuerda que debes adjuntar todos los archivos para que el tr??mite sea exitoso!</p> <br />

            <p className="labels1">Copia de la c??dula de ciudadan??a o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradici??n</p><br />
        </div>
    )
  }
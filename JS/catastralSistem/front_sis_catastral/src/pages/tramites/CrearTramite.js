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


export const CrearTramite = ({detalleTramite={}, modoTramite, getDetalleTramite/* , setOpenBackDrop */}) => {

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
        // console.log("value, name => ", value, name)
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

    const getTramitesSolicitudes = async() => { // pobla el campo Trámite y tipo de solicitante
        // setOpenBackDrop(true)
        updateStore({...store, openBackDrop:true, llama:"L300FCrearTramite"});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getTiposTramite);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                // setTiposSolicitudes(addPrimerOpcionSelect(response.resultado.tiposSolicitantes));
                setTiposSolicitudes(addPrimerOpcionSelect(response.resultado.tiposSolicitantes));
                setTiposTramites(addPrimerOpcionSelect(response.resultado.tiposTramite));
                // setOpenBackDrop(false)
                updateStore({...store, openBackDrop:false, llama:"L311FCrearTramite"});
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
        // setOpenBackDrop(true)
        updateStore({...store, openBackDrop:true, llama:"L330FCrearTramite"});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getTiposSuelo);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setTiposDeSuelo(addPrimerOpcionSelect(response.resultado.dominios));
                // setOpenBackDrop(false)
                updateStore({...store, openBackDrop:false, llama:"L339FCrearTramite"});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const getMunicipios = async()=>{
        // setOpenBackDrop(true)
        updateStore({...store, openBackDrop:true, llama:"L348FCrearTramite"});
        try {
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getMunicipiosCatatumbo);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setMunicipios(addPrimerOpcionSelect(response.resultado.dominios));
                // setOpenBackDrop(false);
                updateStore({...store, openBackDrop:false, llama:"L357FCrearTramite"});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const getDataApi = async(url)=>{
        // setOpenBackDrop(true);
        updateStore({...store, openBackDrop:true, llama:"L366FCrearTramite"});
        try {
            const headers = {token: store.user.token};
            const  response = await getInfoGET(headers, url);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                // setOpenBackDrop(false)
                // updateStore({...store, openBackDrop:false,});
                return response;
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const falloLaPeticion = (error) => {
        // setOpenBackDrop(false)
        updateStore({
            ...store,
            // openBackDrop:false,
            snackBar:{
                openSnackBar:true,
                messageSnackBar: textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L384FCrearTramite"
        });
    }

    const getTiposSolicitud = async(valorConsultar) => { // pobla el campo Solicitud
        updateStore({...store, openBackDrop:true, llama:"L395FCrearTramite"});
        // setOpenBackDrop(true)
        try {
            const headers = {token: store.user.token, valorConsultar};
            const response = await getInfoGET(headers, enviroment.getTiposSolicitud);
            setTipoSolicitud(addPrimerOpcionSelect(response.resultado.dominios));
            updateStore({...store, openBackDrop:false, llama:"L401FCrearTramite"});
            // setOpenBackDrop(false)
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
                }, llama:"L601FCrearTramite"
            })
            
        }, 10);
    }
    
    useEffect(() => {
        // //debugger

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
        updateStore({...store, openBackDrop:false, llama:"L780FCrearTramite"});
    }
    const poblarCamposSelect = async()=>{
        updateStore({...store, openBackDrop:true, llama:"L783FCrearTramite"});
        // setOpenBackDrop(true)
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
            updateStore({...store, openBackDrop:false, llama:"L806FCrearTramite"});
            // setOpenBackDrop(false)
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
            "anioEscritura": formularioTramite.anioEscritura.value===""?null:formularioTramite.anioEscritura.value,
            "areaConstruccion": formularioTramite.areaConstruccion.value===""?null:formularioTramite.areaConstruccion.value,
            "areaTerreno": formularioTramite.areaTerreno.value===""?null:formularioTramite.areaTerreno.value,
            "autoestimacionAvaluo": formularioTramite.autoestimacionAvaluo.value===""?null:formularioTramite.autoestimacionAvaluo.value,
            "avaluoConstruccion": formularioTramite.avaluoConstruccion.value===""?null:formularioTramite.avaluoConstruccion.value,
            "avaluoTerreno": formularioTramite.avaluoTerreno.value===""?null:formularioTramite.avaluoTerreno.value,
            "claseSuelo": tipoDeSuelo.value===""?null:tipoDeSuelo.value,
            "consideraMejora": formularioTramite.consideraMejora.value===""?null:formularioTramite.consideraMejora.value,
            "diferenciaMayoEsta": formularioTramite.diferenciaMayoEsta.value===""?null:formularioTramite.diferenciaMayoEsta.value,
            "idSolicitante": {
              "idUsuario": store.user.infoUser.idUsuario===""?null:store.user.infoUser.idUsuario
            },
            "motivoSolicitud": formularioTramite.motivoDeLaSolicitud.value===""?null:formularioTramite.motivoDeLaSolicitud.value,
            "municipioNotaria": formularioTramite.municipioNotaria.value===""?null:formularioTramite.municipioNotaria.value,
            "municipioPredio": municipio.value===""?null:municipio.value,
            "noEscrituraPublica": formularioTramite.noEscrituraPublica.value===""?null:formularioTramite.noEscrituraPublica.value,
            "nombreTramite": motivoSolicitud.value===""?null:motivoSolicitud.value,
            "notariaOtorgante": formularioTramite.notariaOtorgante.value===""?null:formularioTramite.notariaOtorgante.value,
            "numeroRadicado": "123456789",
            "objetoPeticion": formularioTramite.objetoPeticion.value===""?null:formularioTramite.objetoPeticion.value,
            "objetoRectificacion": formularioTramite.objetoRectificacion.value===""?null:formularioTramite.objetoRectificacion.value,
            "prediosAsociados": quitarIdDelRegistros_prediosAsociados(Object.assign([], formularioTramite.prediosAsociados)),
            "propiedadHorizontal": formularioTramite.propiedadHorizontal.value===""?null:formularioTramite.propiedadHorizontal.value,
            "proyectoUrbanistico": formularioTramite.proyectoUrbanistico.value===""?null:formularioTramite.proyectoUrbanistico.value,
            "razonSolicitud": formularioTramite.razonSolicitud.value===""?null:formularioTramite.razonSolicitud.value,
            "revisionBusca": formularioTramite.revisionBusca.value===""?null:formularioTramite.revisionBusca.value,
            "tipoInscripcion": formularioTramite.tipoInscripcion.value===""?null:formularioTramite.tipoInscripcion.value,
            "tipoSolicitante": tipoSolicitante.value===""?null:tipoSolicitante.value,
            "tipoTramite": tipoTramite.value===""?null:tipoTramite.value,
            "titularesPredio": quitarIdDelRegistros_titularesPredio(Object.assign([], titularesDeDerecho)),
          }
        // console.log("data => ", data)
        // console.log(JSON.stringify(data));
        updateStore({...store, openBackDrop:true, llama:"L869FCrearTramite"});
        // setOpenBackDrop(true)
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
                    tittle:'¡Felicidades!',
                    msg: textosInfoWarnig.tramiteExito,
                    tipo:"OK",//"SI/NO"
                    response:false
                });
                openSnackBar = false;
            }
            // setOpenBackDrop(false)
            updateStore({
                ...store,
                openBackDrop:false,
                snackBar:{
                    openSnackBar,
                    messageSnackBar,
                    severity:'warning',
                }, llama:"L894FCrearTramite"
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
                    <div /* style={{marginTop:'5px'}} */ className="tituloTramite"><p>Nuevo trámite</p></div>
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
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />
            <p className="labels1">Copia del reglamento de propiedad horizontal debidamente
                registrado, así como, de las reformas, modificaciones,
                aclaraciones y corrección de los títulos con sus respectivos
                anexos, si los hay.</p><br />
            <p className="labels1">Para realizar la solicitud de un trámite de una reforma, la
                propiedad horizontal debe estar incorporada en la base predial
                catastral.</p><br />
            <p className="labels1">Si hay más de una escritura de reforma, o aclaraciones o
                correcciones de los títulos, anexarlos en la solicitud.</p><br />
        </div>
    )
  }
  export const msgInfo_MP_CPP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />
            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Cambio de propietario: Copia del título de dominio (Escritura Pública. Acto administrativo o Sentencia) debidamente registrado.</p><br />
            <p className="labels1">Cambio de poseedor u ocupante: Documentos que establezcan la posesión u ocupación como constancias de pago de impuestos, servicios públicos, contribuciones, valorización etc</p><br />
            <p className="labels1">El cambio de nombre entre poseedores u ocupantes estará sujeto al estudio de los documentos aportados por el solicitante.</p><br />
        </div>
    )
  }
  export const msgInfo_MS_EAP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del título de dominio (Escritura Pública. Acto administrativo o Sentencia debidamente registrado, en donde conste el englobe y/o el desenglobe de los bienes inmuebles, así como las modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay).</p><br />
            <p className="labels1">Se debe adjuntar el plano de levantamiento planimétrico de acuerdo con las especificaciones técnicas establecidas en el artículo 11 del presente acto administrativo.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal: </span> copia legible del título de dominio (Escritura Pública, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, así como sus reformas, modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localización y descripción del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyección cartográfica de Origen Único para Colombia, el cual debe contener la planta de cubiertas, con el número de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los polígonos de construcción en una sola línea, o copia del plano aprobado con la licencia per parte de la curaduría que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relación de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, círculo registral y matrícula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
        </div>
    )
  }
  export const msgInfo_MS_DDP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del título de dominio (Escritura Pública. Acto administrativo o Sentencia debidamente registrado, en donde conste el englobe y/o el desenglobe de los bienes inmuebles, así como las modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay).</p><br />
            <p className="labels1">Se debe adjuntar el plano de levantamiento planimétrico de acuerdo con las especificaciones técnicas establecidas en el artículo 11 del presente acto administrativo.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal: </span> copia legible del título de dominio (Escritura Pública, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, así como sus reformas, modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano del desarrollo urbanístico en medio magnético (formato dwg o dxf o shapefile), con cuadro de coordenadas referidas al sistema de proyección cartográfica de origen único para Colombia.
                <span style={{fontWeight:'bold'}}>Para propiedad horizontal:</span> Copia legible del título de dominio (Escritura Pública, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, así como sus reformas, modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localización y descripción del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyección cartográfica de Origen Único para Colombia, el cual debe contener la planta de cubiertas, con el número de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los polígonos de construcción en una sola línea, o copia del plano aprobado con la licencia per parte de la curaduría que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relación de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, círculo registral y matrícula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
        </div>
    )
  }
  export const msgInfo_MT_IRC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad no horizontal:</span> Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Documento de certificación juramentada del área de la construcción, cuando se cuente con planos de la construcción se podrán aportar, los planos deben cumplir con las especificaciones técnicas definidas en el artículo 11 de la presente resolución.</p><br />
            <p className="labels1">Para el caso de predios ubicados en municipios cuyo catastro no ha sido formado de conformidad con la ley 14 de 1983: Se requiere acreditar en la solicitud, la existencia y propiedad, y debe indicar el área y avalúo.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Para propiedad horizontal:</span> Copia de la escritura del reglamento de Propiedad Horizontal y sus modificaciones o adiciones debidamente registradas, incluyendo planos protocolizados de localización y planos arquitectónicos por tipo de construcción, en escala original aprobado por planeación o curaduría urbana.</p><br />
        </div>
    )
  }
  export const msgInfo_MC_AEAC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">En la declaración de autoestimación del avalúo catastral, podrá presentar el avalúo comercial, planos, certificaciones de autoridades administrativas, aerofotografías, escrituras públicas y otros documentos que demuestren los cambios físicos, valorización o cambios de uso en el predio.</p><br />
        </div>
    )
  }
  export const msgInfo_MC_RAC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">En la petición se debe indicar claramente la vigencia para la cual se solicita la revisión de avalúo y manifestar los motivos de inconformidad.</p><br />
            <p className="labels1">Anexar los documentos que demuestren que el avalúo no se ajusta a las características y condiciones del predio, en cuanto a linderos, área, uso, clases de terreno o naturaleza de la construcción, condiciones; ubicación, vías de acceso, clase de terreno y naturaleza de la construcción, condiciones locales del mercado inmobiliario y demás informaciones pertinentes.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>El propietario, poseedor u ocupante podrá presentar documentos como:</span> Para cambios físicos: Escritura pública que indique la segregación o agregación de áreas, por contratos o certificados de la Alcaldía Municipal sobre nuevas construcciones, demoliciones o deterioros.</p><br />
            <p className="labels1"><span style={{fontWeight:'bold'}}>Valorización:</span> Mediante certificaciones de la Alcaldía Municipal o de la autoridad que haya adelantado la obra correspondiente.</p><br />
            <p className="labels1">Cambios de uso: Mediante certificados de entidades financieras o de la Alcaldía Municipal o de la Cámara de comercio, y otros.</p><br />
        </div>
    )
  }
  export const msgInfo_MQ_INCP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Copia legible del título de dominio (Escritura Pública, Acto administrativo o Sentencia) debidamente registrado del bien inmueble.</p><br />
        </div>
    )
  }
  export const msgInfo_RE_RUD = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">En predios PH: Copia de la escritura del reglamento de Propiedad Horizontal y sus modificaciones o adiciones debidamente registradas, incluyendo planos protocolizados de localización y planos arquitectónicos por tipo de construcción, en escala original aprobado por planeación o curaduría urbana.</p><br />
            <p className="labels1">Para predio No PH: Para modificación del destino económico: Copia del acto administrativo expedido por la autoridad competente aportando las pruebas que permitan sustentar la solicitud. (Aplica para predios con destino de interés histórico, cultural o arquitectónico). Para predios con otro destino económico, cualquier medio probatorio que permita sustentar el tipo de solicitud, se debe tener en cuenta la actividad predominante que se desarrolle en el predio.</p><br />
            <p className="labels1"></p><br />
        </div>
    )
  }
  export const msgInfo_RE_RAT = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia legible del título de dominio (Escritura Pública, Acto administrativo o Sentencia) debidamente registrado, que contenga el reglamento de propiedad horizontal, así como sus reformas, modificaciones, aclaraciones y corrección de los títulos con sus respectivos anexos, si las hay.</p><br />
            <p className="labels1">Plano de localización y descripción del proyecto en formato dwg o shapefile ligado a las coordenadas del Sistema de Proyección cartográfica de Origen Único para Colombia, el cual debe contener la planta de cubiertas, con el número de pisos, aislamientos, alinderamiento del lote y debe tener solo dos niveles, uno con el lote y el otro con los polígonos de construcción en una sola línea, o copia del plano aprobado con la licencia per parte de la curaduría que, contenga los niveles citados.</p><br />
            <p className="labels1">Archivo Excel con la relación de las unidades prediales a desenglobar con los siguientes datos: nomenclatura predio matriz, nomenclatura predios segregados, torre, apto, coeficiente copropiedad, círculo registral y matrícula inmobiliaria asignado por la oficina de registro respectiva.</p><br />
            <p className="labels1"></p><br />
        </div>
    )
  }
  export const msgInfo_RE_ACN = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Predios urbanos: Copia legible del documento mediante el cual La Oficina de Planeación Municipal asigna o corrige la nomenclatura del predio.</p><br />
            <p className="labels1">En caso de predios rurales, copia de escritura pública debidamente registrada donde figure el cambio de la nomenclatura</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCPPC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCCE = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCFP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCCPP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SPCC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SCNP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
  export const msgInfo_SC_CIC = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
        </div>
    )
  }
  export const msgInfo_SC_SNP = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />

            <p className="labels1">Copia de la cédula de ciudadanía o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Recibo del impuesto predial o certificado de libertad y tradición</p><br />
        </div>
    )
  }
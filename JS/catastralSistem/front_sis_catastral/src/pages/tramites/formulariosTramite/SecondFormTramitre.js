import React, { useContext, useEffect, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import Salir_Icon from '../../../assets/Iconos/Salir_Icon.png'
import Rating from '@mui/material/Rating';
import { ProyectoUrbanistico, SiNoOptions, textosInfoWarnig } from '../../../helpers/utils';
import { FieldSelect } from '../../../componets/FieldSelect';
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel';
import { TablaPredios } from '../../../componets/TablaPredios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { constantes } from './FirstFormTramitre';
import { Transition } from '../../../componets/DialogMsgOk';
import { StoreContext } from '../../../App';
import { ModeTramiteDetalle } from '../consultarTramites/ModeTramiteDetalle';

export const SecondFormTramitre = ({
    handleFormChange,
    formularioTramite, setFormularioTramite,
    tiposDeSuelo,
    municipios,
    avancePagina,
    onSubmitFinal,
    renderizarInfoSegunTipoTramite,
    setForms,
    modoTramite,
}) => {

    // const [openDialogFormAddPredio, setOpenDialogFormAddPredio] = useState(false);

    const {
        avaluoTerreno,
        avaluoConstruccion,
        anioEscritura,
        areaTerreno,
        areaConstruccion,
        autoestimacionAvaluo,
        consideraMejora,
        ConsideraUnaMejoraLaMutacion,
        ConsideraQueLaDiferenciaMayorEstaEn,
        diferenciaMayoEsta,
        fichaCatastral,
        file,
        LaRevisionBusca,
        matricula,
        municipio,
        motivoSolicitud,
        municipioNotaria,
        MunicipioDeLaNotaria,
        motivoDeLaSolicitud,
        MotivosSolicitud,
        noEscrituraPublica,
        notariaOtorgante,
        tipoDeSuelo,
        tipoTramite,
        propiedadHorizontal,
        proyectoUrbanistico,
        prediosAsociados,
        revisionBusca,
        objetoPeticion,
        ObjetosDeLaPeticion,
        objetoRectificacion,
        TiposInscripcion,
        tipoInscripcion,
        ObjetosRectificacion,
    } = formularioTramite;

    const {store, updateStore} = useContext(StoreContext);
    const {dialogTool} = store;
    const [stateSecondFormTramite, setStateSecondFormTramite] = useState(
        {
            openDialogFormAddPredio: false,
            modoFormularioAddPredio: constantes.tipoFormulario.nuevo, // editar, eliminar
            predioSeleccionado: {},
            formNewPredio:{
                fichaCatastral:{
                    name:'fichaCatastral',
                    value:'',
                    validacion:''
                },
                matricula:{
                    name:'matricula',
                    value:'',
                    validacion:''
                },
            },
            asociadosPredios:[],
            filtroMotivosSolicitud:[],
        }
    );
    const {
        modoFormularioAddPredio,
        predioSeleccionado,
        formNewPredio,
        openDialogFormAddPredio,
        filtroMotivosSolicitud,
    } = stateSecondFormTramite;

    const fileHandler = ({target}) => {
        if(target.files[0]){
            setFormularioTramite({
                ...formularioTramite,
                zip:target.files[0],
                file: {
                    name:'file',
                    value:target.files[0].name,
                    validation:''
                }
            });
        }

    }

    const abrirFormPredioTitular = () => {
        setStateSecondFormTramite(
            {
                ...stateSecondFormTramite,
                modoFormularioAddPredio: constantes.tipoFormulario.nuevo,
                predioSeleccionado: {},
                openDialogFormAddPredio: true,
                formNewPredio:{
                    fichaCatastral:{...fichaCatastral, value:'', validacion:''},
                    matricula:{...matricula, value:'', validacion:''}
                }
            });
    }

    const newPredio = () => {

        let cloneAsociadosPredios = [...prediosAsociados];
        let openCLoseFormPredial = true;
        let formularioOk = true;
        if (modoFormularioAddPredio === constantes.tipoFormulario.nuevo) {
            const key = Object.keys(formNewPredio);
            let cloneformNewPredio = {...formNewPredio};
            key.forEach(campo => {
                if (cloneformNewPredio[campo].value === "") {
                    cloneformNewPredio[campo].validacion = textosInfoWarnig.campoRequerido;
                    formularioOk = false;
                }else if(cloneformNewPredio.fichaCatastral.value.length !== 20 && cloneformNewPredio.fichaCatastral.value.length !== 30){
                    cloneformNewPredio.fichaCatastral.validacion = textosInfoWarnig.tamanioCampo;
                    formularioOk = false;
                }else{
                    cloneformNewPredio[campo].validacion = '';
                }
            });
    
            if (formularioOk) {
                openCLoseFormPredial = false;
                cloneAsociadosPredios.push(
                    {   
                        id:cloneAsociadosPredios.length,
                        "numeroPredial":formNewPredio.fichaCatastral.value,
                        "matriculaInmobiliaria":formNewPredio.matricula.value,
                    }
                );
            } else {
                updateStore({
                    ...store,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar:textosInfoWarnig.camposRequerdios,
                        severity: 'error'
                    },
                });
            }
            setFormularioTramite(
                {
                    ...formularioTramite,
                    prediosAsociados:cloneAsociadosPredios,
                }
            );
            setStateSecondFormTramite(
                {
                    ...stateSecondFormTramite,
                    // asociadosPredios: cloneAsociadosPredios,
                    formNewPredio: cloneformNewPredio,
                    openDialogFormAddPredio: openCLoseFormPredial,
                }
            );
            
        } else if(modoFormularioAddPredio === constantes.tipoFormulario.editar){
            editarPredio(predioSeleccionado);
        }
        
    }

    const handleActiosTablePredios = ({action, register}) => {
        if (action === "edit") {
            // editarPredio(register);
            setStateSecondFormTramite(
                {
                    ...stateSecondFormTramite,
                    predioSeleccionado: register,
                    modoFormularioAddPredio: constantes.tipoFormulario.editar,
                    openDialogFormAddPredio: true,
                    formNewPredio:{
                        fichaCatastral:{...fichaCatastral, value:register.numeroPredial, validacion:''},
                        matricula:{...matricula, value:register.matriculaInmobiliaria, validacion:''}
                    }
                }
            );
        } else if(action === "delete"){
            setStateSecondFormTramite(
                {
                    ...stateSecondFormTramite,
                    predioSeleccionado: register,
                    modoFormularioAddPredio: constantes.tipoFormulario.eliminar,
                    formNewPredio:{
                        fichaCatastral:{...fichaCatastral, value:register.numeroPredial, validacion:''},
                        matricula:{...matricula, value:register.matriculaInmobiliaria, validacion:''}
                    }
                }
            );
            eliminarPredio(register);
        }
    }

    const editarPredio = (predio) => {
        let cloneformNewPredio = {...formNewPredio};
        if (cloneformNewPredio.fichaCatastral.value.length !== 20 && cloneformNewPredio.fichaCatastral.value.length !== 30) {
            cloneformNewPredio.fichaCatastral.validacion = textosInfoWarnig.tamanioCampo;
            setStateSecondFormTramite(
                {
                    ...stateSecondFormTramite,
                    // asociadosPredios: cloneAsociadosPredios,
                    formNewPredio: cloneformNewPredio,
                    // openDialogFormAddPredio: openCLoseFormPredial,
                }
            );
        } else {
            const updateAsociadosPredios = prediosAsociados.map(prediotoUpdate => {
                if (prediotoUpdate.id === predio.id) {
                    return {
                        ...prediotoUpdate,
                        numeroPredial:formNewPredio.fichaCatastral.value,
                        matriculaInmobiliaria:formNewPredio.matricula.value,
                    }
                } else {
                    return prediotoUpdate;
                }
            });
            setFormularioTramite(
                {
                    ...formularioTramite,
                    prediosAsociados:updateAsociadosPredios
                }
            );
            setStateSecondFormTramite(
                {
                    ...stateSecondFormTramite,
                    openDialogFormAddPredio: false,
                }
            );
        }
    }
    const eliminarPredio = (predio, eliminar=false) => {
        if (eliminar) {
            const updatePredios = prediosAsociados.filter(e => e.id !== predio.id)
            setFormularioTramite({...formularioTramite, prediosAsociados: updatePredios});
        } else {
            updateStore({
                ...store,
                dialogTool:{
                    open:true, 
                    msg: textosInfoWarnig.elimnarPredio,
                    tittle:'Confirmación',
                    response:false,
                    actions:true,
                }
            });
        }
    }

    const closeOpenDialogFormAddPredio = (closeOpen) => {
        setStateSecondFormTramite(
            {
                ...stateSecondFormTramite,
                openDialogFormAddPredio: closeOpen
            }
        )
    }
    const handleFieldsFormPredios = ({name, value}) => {
        setStateSecondFormTramite(
            {
                ...stateSecondFormTramite,
                formNewPredio: {
                    ...formNewPredio,
                    [name]: {
                        ...formNewPredio[name],
                        value,
                        validacion:'',
                    }
                }
            }
        )
    }

    const onSubmit = (e)=> {
        e.preventDefault();
        if (prediosAsociados.length < 1) {
            updateStore({
                ...store,
                dialogTool:{
                    open:true, 
                    msg: textosInfoWarnig.sinPredios,
                    tittle:'Confirmación',
                    response:false,
                    actions:false,
                }
            });
        } else {
            onSubmitFinal();
        }
        
    }

    
    useEffect(() => {
        if (dialogTool.response) {
            eliminarPredio(predioSeleccionado, true);
            updateStore({
                ...store,
                dialogTool:{open:false, msg :'',tittle:'', response:false}
            });
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogTool])

    useEffect(() => {
        if (tipoTramite.value === 'MQ' && motivoSolicitud.value === 'INCP') {
            const motivos = [];
            motivos.push(MotivosSolicitud[0]);
            motivos.push(MotivosSolicitud[1]);
            setStateSecondFormTramite({
                ...stateSecondFormTramite,
                filtroMotivosSolicitud:motivos
            });
        }else if (tipoTramite.value === "RE" && motivoSolicitud.value === "RAT") {
            const motivos = [];
            motivos.push(MotivosSolicitud[2]);
            motivos.push(MotivosSolicitud[3]);
            motivos.push(MotivosSolicitud[4]);
            setStateSecondFormTramite({
                ...stateSecondFormTramite,
                filtroMotivosSolicitud:motivos
            });
        }else{
            setStateSecondFormTramite({
                ...stateSecondFormTramite,
                filtroMotivosSolicitud:MotivosSolicitud
            });
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <form onSubmit={onSubmit}>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">DATOS DEL INMUEBLE</p>
            </div>
           
            <div style={{marginBottom:'15px'}}>
                {
                    modoTramite === 'Nuevo' &&
                        <div className="tituloBtnRight " >
                            {
                                prediosAsociados.length < 1 &&
                                <label onClick={()=>abrirFormPredioTitular()} htmlFor="" className="pointer" 
                                    style={{marginRight:'10px', color:'red', fontSize:'12px'}}>
                                        {textosInfoWarnig.sinPredios} 
                                </label>
                            }
                            {
                                (((tipoTramite.value === "MO" && motivoSolicitud.value === "MPHC")
                                ||(tipoTramite.value === "MS" && motivoSolicitud.value === "EAP")
                                ||(tipoTramite.value === "MS" && motivoSolicitud.value === "DDP")) ||
                                    (((tipoTramite.value  !== "MO" && motivoSolicitud.value !== "MPHC")
                                    ||(tipoTramite.value !== "MS" && motivoSolicitud.value !== "EAP")
                                    ||(tipoTramite.value !== "MS" && motivoSolicitud.value !== "DDP"))&&prediosAsociados.length < 1
                                )) &&
                                <Tooltip title="Agregar predio">
                                    <AddBusinessIcon sx={{color:'gray'}} className="pointer" onClick={()=>abrirFormPredioTitular()}/>
                                </Tooltip>
                            }
                        </div>
                }
                {
                    prediosAsociados.length > 0 && 
                    <TablaPredios key="TablaAsociadosPredios"
                        registros={prediosAsociados}
                        handleEvents={(response)=>handleActiosTablePredios(response)}
                        modoTramite={modoTramite ? modoTramite : 'Nuevo'}
                    />
                }
                
            </div>
           
            {/* Aplica para todos los formularios */}
            <div style={{display:'flex', width:'100%'}}>
                {
                    modoTramite === 'Nuevo'
                    ?
                        <div className="row" style={{width:'100%'}}>
                            <FieldSelect
                                label={'Tipo de suelo'}
                                value={tipoDeSuelo.value}
                                options={tiposDeSuelo} 
                                handleOnchange={(target)=>{handleFormChange(target)}} 
                                messageValidate={tipoDeSuelo.validation}
                                name={tipoDeSuelo.name}
                                styleOwn={{width:'50%'}}
                                required={true}
                            />
                            
                            <FieldSelect
                                label={'Municipio'}
                                value={municipio.value}
                                options={municipios} 
                                handleOnchange={(target)=>{handleFormChange(target)}} 
                                messageValidate={municipio.validation}
                                name={municipio.name}
                                styleOwn={{width:'50%', marginLeft:'10px'}}
                                required={true}
                            />
                        </div>
                    :
                        <div style={{width:'100%'}}>
                            <FieldTextWidtLabel
                                label={'Tipo de suelo'}
                                value={tipoDeSuelo.value} 
                                name={tipoDeSuelo.name}
                                messageValidate={tipoDeSuelo.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="text"
                                whitIconRight={false}
                                disabled={true}
                            />
                            <FieldTextWidtLabel
                                label={'Municipio'}
                                value={municipio.value} 
                                name={municipio.name}
                                messageValidate={municipio.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="text"
                                whitIconRight={false}
                                disabled={true}
                            />
                        </div>
                }
            </div>
            {/* Renderiza dependiendo del tipo de formulario */}

            {
                (tipoTramite.value === "MS" || tipoTramite.value === "MT" || tipoTramite.value === "MO") &&
                <div className="row" style={{marginTop:'5px'}}>
                    {
                        modoTramite === 'Nuevo'
                            ? 
                                <FieldSelect
                                    label={'Propiedad horizontal'}
                                    value={propiedadHorizontal.value}
                                    options={SiNoOptions} 
                                    handleOnchange={(target)=>{handleFormChange(target)}} 
                                    messageValidate={propiedadHorizontal.validation}
                                    name={propiedadHorizontal.name}
                                    styleOwn={{width:'50%'}}
                                    required={true}
                                />
                            :
                            <FieldTextWidtLabel
                                label={'Propiedad horizontal'}
                                value={propiedadHorizontal.value} 
                                name={propiedadHorizontal.name}
                                messageValidate={propiedadHorizontal.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="text"
                                whitIconRight={false}
                                disabled={true}
                            />
                    }
                    {
                        motivoSolicitud.value === "DDP" &&
                        <div style={{width:'50%', marginRight:'10px'}}>
                            {
                                modoTramite === 'Nuevo'
                                    ?
                                        <FieldSelect
                                            label={'Proyecto Urbanistico'}
                                            value={proyectoUrbanistico.value}
                                            options={ProyectoUrbanistico} 
                                            handleOnchange={(target)=>{handleFormChange(target)}} 
                                            messageValidate={proyectoUrbanistico.validation}
                                            name={proyectoUrbanistico.name}
                                            styleOwn={{width:'100%', marginLeft:'10px',}}
                                            required={true}
                                        />
                                    :
                                    <FieldTextWidtLabel
                                        label={'Proyecto Urbanistico'}
                                        value={proyectoUrbanistico.value} 
                                        name={proyectoUrbanistico.name}
                                        messageValidate={proyectoUrbanistico.validation}
                                        required={true}
                                        handleChange={(target)=>{handleFormChange(target)}}
                                        type="text"
                                        whitIconRight={false}
                                        disabled={true}
                                />
                            }
                        </div>
                    }
                </div>
            }   
            {
                (tipoTramite.value === "MT") &&
                <div className="row" style={{marginTop:'5px'}}>
                    <FieldSelect
                        label={'Objeto de la Petición'}
                        value={objetoPeticion.value}
                        options={ObjetosDeLaPeticion} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoPeticion.validation}
                        name={objetoPeticion.name}
                        styleOwn={{width:'50%'}}
                        required={true}
                    />
                    
                    <FieldSelect
                        label={'¿Considera una mejora la mutación?'}
                        value={consideraMejora.value}
                        options={ConsideraUnaMejoraLaMutacion} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={consideraMejora.validation}
                        name={consideraMejora.name}
                        styleOwn={{width:'50%', marginLeft:'10px',}}
                        required={true}
                    />
                    
                </div>
            } 
            {
                (tipoTramite.value === "MC" && motivoSolicitud.value !== "RAC") &&
                    <div style={{marginTop:'5px'}}>
                        <div className="row contenTitulo">
                            <div className="decorationTitle bgc2"></div>
                            <p className="titulo color2">ÁREA</p>
                        </div>
                        <div className='row'>
                            <FieldTextWidtLabel
                                label={'Terreno'}
                                value={areaTerreno.value} 
                                name={areaTerreno.name}
                                messageValidate={areaTerreno.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconRight={true}
                            />
                            <FieldTextWidtLabel
                                label={'Construcción'}
                                value={areaConstruccion.value} 
                                name={areaConstruccion.name}
                                messageValidate={areaConstruccion.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconRight={true}
                                styleOwn={{marginLeft:'10px'}}
                            />
                        </div>
                        <div className="row contenTitulo">
                            <div className="decorationTitle bgc4"></div>
                            <p className="titulo grey2">AVALÚO COMERCIAL</p>
                        </div>
                        <div className='row'>
                            <FieldTextWidtLabel
                                label={'Terreno'}
                                value={avaluoTerreno.value} 
                                name={avaluoTerreno.name}
                                messageValidate={avaluoTerreno.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconLeft="$"
                            />
                            <FieldTextWidtLabel
                                label={'Construcción'}
                                value={avaluoConstruccion.value} 
                                name={avaluoConstruccion.name}
                                messageValidate={avaluoConstruccion.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconLeft="$"
                                styleOwn={{marginLeft:'10px'}}
                            />
                        </div>
                        <FieldTextWidtLabel
                            label={'Autoestimación Total del Avalúo'}
                            value={autoestimacionAvaluo.value} 
                            name={autoestimacionAvaluo.name}
                            messageValidate={autoestimacionAvaluo.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            type="number"
                            whitIconLeft="$"
                        />
                    </div>
            }
            {
                (tipoTramite.value === "MC" && motivoSolicitud.value === "RAC") &&
                <div>
                    <FieldSelect
                        label={'Considera que la diferencia mayor esta en'}
                        value={diferenciaMayoEsta.value}
                        options={ConsideraQueLaDiferenciaMayorEstaEn} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={diferenciaMayoEsta.validation}
                        name={diferenciaMayoEsta.name}
                        styleOwn={{width:'100%',marginTop:'5px'}}
                        required={true}
                    />
                    <FieldSelect
                        label={'La revisión busca'}
                        value={revisionBusca.value}
                        options={LaRevisionBusca} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={revisionBusca.validation}
                        name={revisionBusca.name}
                        styleOwn={{width:'100%',marginTop:'5px'}}
                        required={true}
                    />
                </div>
            }
            {
                ((tipoTramite.value === "MQ" || 
                (tipoTramite.value === "RE" && motivoSolicitud.value !== "ACN"))  ) &&
                <div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldTextWidtLabel
                            label={'Número de Escritura Pública RPH'}
                            value={noEscrituraPublica.value} 
                            name={noEscrituraPublica.name}
                            messageValidate={noEscrituraPublica.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                        />
                        <FieldTextWidtLabel
                            label={'Año de la Escritura'}
                            value={anioEscritura.value} 
                            type={"number"}
                            maxLength={4}
                            name={anioEscritura.name}
                            messageValidate={anioEscritura.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            styleOwn={{width:'60%', marginLeft:'10px'}}
                        />
                    </div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldTextWidtLabel
                            label={'Notaria Otorgante'}
                            value={notariaOtorgante.value} 
                            name={notariaOtorgante.name}
                            messageValidate={notariaOtorgante.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            whitIconLeft="#"
                        />
                        <FieldSelect
                            label={'Municipio de la Notaria'}
                            value={municipioNotaria.value}
                            options={MunicipioDeLaNotaria} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={municipioNotaria.validation}
                            name={municipioNotaria.name}
                            styleOwn={{width:'100%', marginLeft:'10px'}}
                            required={true}
                        />
                    </div>
                    
                </div>
            }
            {
                (tipoTramite.value === "MQ") &&
                <div style={{width:'100%'}}>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldSelect
                            label={'Tipo de inscripción'}
                            value={tipoInscripcion.value}
                            options={TiposInscripcion} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={tipoInscripcion.validation}
                            name={tipoInscripcion.name}
                            styleOwn={{width:'100%',}}
                            required={true}
                        />
                        <FieldSelect
                            label={'Motivo de la Solicitud'}
                            value={motivoDeLaSolicitud.value}
                            options={filtroMotivosSolicitud} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={motivoDeLaSolicitud.validation}
                            name={motivoDeLaSolicitud.name}
                            styleOwn={{width:'100%', marginLeft: '10px'}}
                            required={true}
                        />
                    </div>
                </div>
            }
            
            {
                (tipoTramite.value === "RE" && (motivoSolicitud.value === "RUD" ||
                motivoSolicitud.value === "RAT") ) &&
                <div className="row">
                   { motivoSolicitud.value === "RAT" &&
                    <FieldSelect
                        label={'Motivo de la Solicitud'}
                        value={motivoDeLaSolicitud.value}
                        options={filtroMotivosSolicitud} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={motivoDeLaSolicitud.validation}
                        name={motivoDeLaSolicitud.name}
                        styleOwn={{width:'100%', marginRight:'10px'}}
                        required={true}
                    />}
                    <FieldSelect
                        label={'Objeto de Rectificación'}
                        value={objetoRectificacion.value}
                        options={ObjetosRectificacion} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoRectificacion.validation}
                        name={objetoRectificacion.name}
                        styleOwn={{width:'100%', }}
                        required={true}
                    />
                    
                </div>
            }
        {/*
            {
                (tipoTramite.value === "SC" && (motivoSolicitud.value === "SCPPC") ) &&

                <FieldSelect
                    label={'Motivo de la Solicitud'}
                    value={motivoDeLaSolicitud.value}
                    options={MotivosSolicitud} 
                    handleOnchange={(target)=>{handleFormChange(target)}} 
                    messageValidate={motivoDeLaSolicitud.validation}
                    name={motivoDeLaSolicitud.name}
                    styleOwn={{width:'100%', marginTop:'5px'}}
                    required={true}
                />
            }
        */}
            {
                modoTramite === 'Consulta' && <ModeTramiteDetalle formularioTramite={formularioTramite} key="ModeTramiteDetalle"/>
            }


            {/* Aplica para todos los formularios */}
            {
                ((modoTramite === 'Consulta' && file.value !== '')||(modoTramite === 'Nuevo')) &&
                <div className="row contenTitulo" style={{marginBottom:'10px', marginTop:'10px' ,justifyContent:'space-between'}}>
                    <div className="row ">
                        <div className="decorationTitle bgc3"></div>
                        <p className="titulo color3">OTROS</p>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <input type="file" name="file" id="file" accept=".zip, .rar" 
                            onChange={(e)=>fileHandler(e)} style={{display:'none'}}
                        />
                        {
                            modoTramite === 'Nuevo' &&
                                <label htmlFor="file" className="row aicenter">
                                    <p className="labels pointer btnAceptar" style={{color:'white'}}>Adjuntar archvio</p>
                                        <Rating
                                            sx={{color:'gray', cursor:'default'}}
                                            name="hover-feedback"
                                            value={1}
                                            max={1}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                renderizarInfoSegunTipoTramite()
                                            }}
                                            icon={<AttachFileIcon style={{ opacity: 1 }} fontSize="inherit" />}
                                            emptyIcon={<AttachFileIcon style={{ opacity: 1 }} fontSize="inherit" />}
                                        />
                                </label>
                        }
                    </div>
                </div>
            }

            <div>
            { ((modoTramite === 'Nuevo') || (modoTramite === 'Consulta' && file.value !== '')) &&
                <FieldTextWidtLabel
                    value={file.value}
                    ph="Adjunte en este campo los documentos solicitados en un archivo .ZIP o .RAR"
                    name={file.name}
                    label={''}
                    messageValidate={file.validation}
                    required={true}
                    disabled={modoTramite === 'Consulta' ? true : false}
                />
                }
                { modoTramite === 'Nuevo' && <button type="submit"  className='btnAceptar'>CREAR TRÁMITE</button> }
                { (modoTramite === 'Consulta' || modoTramite === 'Seguimiento')
                 && <button onClick={()=>setForms("verEstado")}
                  type="button" className='btnAceptar'>
                      {   modoTramite === 'Consulta'
                                ? `VER ESTADO`
                                : modoTramite === 'Seguimiento'
                                    ? 'CAMBIAR ESTADO'
                                    : ''
                        }
                      </button> }
                <div style={{display:'flex', justifyContent:'center'}} 
                    onClick={()=>{avancePagina(true, false)}}
                    >
                    <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                    <p className="btnSalirRegresar">Volver atrás</p>
                </div>
            </div>
            <Dialog
                open={openDialogFormAddPredio}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>closeOpenDialogFormAddPredio(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`${modoFormularioAddPredio === constantes.tipoFormulario.nuevo ? "Agregar" : "Editar"} predio`}</DialogTitle>
                <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                        <div style={{margin:'10px 20px'}}>
                                <FieldTextWidtLabel 
                                    value={formNewPredio.fichaCatastral.value}
                                    name="fichaCatastral"
                                    label={'Ficha catastral o número predial'} 
                                    handleChange={(target)=>handleFieldsFormPredios(target)} 
                                    messageValidate={formNewPredio.fichaCatastral.validacion}
                                    maxLength={30}
                                    showLengthCaracters={formNewPredio.fichaCatastral.validacion ? false : true}
                                    />
                                <FieldTextWidtLabel 
                                    value={formNewPredio.matricula.value}
                                    name="matricula"
                                    label={'Matrícula'}
                                    handleChange={(target)=>handleFieldsFormPredios(target)} 
                                    messageValidate={formNewPredio.matricula.validacion}
                                    styleOwn={{width:'400px'}}
                                    maxLength={20}
                                    />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                newPredio();
                            }} className='btnAceptar'>{`${modoFormularioAddPredio === constantes.tipoFormulario.nuevo ? 'Agregar': 'Editar'} predio`}</button>
                            <button onClick={()=>{
                                // resetForm();
                                closeOpenDialogFormAddPredio(false);
                            }} className='btnAceptar'>Cancelar</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
        </form>
    )
}

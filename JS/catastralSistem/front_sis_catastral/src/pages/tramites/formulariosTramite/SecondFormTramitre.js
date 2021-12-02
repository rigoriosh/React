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
import { ProyectoUrbanistico, SiNoOptions, stylesApp, textosInfoWarnig } from '../../../helpers/utils';
import { FieldSelect } from '../../../componets/FieldSelect';
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel';
import { TablaPredios } from '../../../componets/TablaPredios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { constantes } from './FirstFormTramitre';
import { Transition } from '../../../componets/DialogMsgOk';
import { StoreContext } from '../../../App';




export const SecondFormTramitre = ({
    handleFormChange,
    formularioTramite, setFormularioTramite,
    tiposDeSuelo,
    municipios,
    avancePagina,
    onSubmitFinal,
    renderizarInfoSegunTipoTramite
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
        EspecificacionDelTramiteSolicitado,
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
    } = formularioTramite;

    const {store, updateStore} = useContext(StoreContext);
    const {dialogTool} = store;
    const [addPredio, setAddPredio] = useState(false);
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
        }
    );
    const {
        modoFormularioAddPredio,
        predioSeleccionado,
        formNewPredio,
        openDialogFormAddPredio,
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
        console.log(cloneAsociadosPredios);
        let openCLoseFormPredial = true;
        let formularioOk = true;
        if (modoFormularioAddPredio === constantes.tipoFormulario.nuevo) {
            const key = Object.keys(formNewPredio);
            let cloneformNewPredio = {...formNewPredio};
            key.forEach(campo => {
                if (cloneformNewPredio[campo].value === "") {
                    cloneformNewPredio[campo].validacion = textosInfoWarnig.campoRequerido;
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
        console.log(action, register)
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

    const editarPredio = (predio) => {
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
    const eliminarPredio = (predio, eliminar=false) => {
        if (eliminar) {
            console.log(formularioTramite)
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
        console.log(name, value);
        setStateSecondFormTramite(
            {
                ...stateSecondFormTramite,
                formNewPredio: {
                    ...formNewPredio,
                    [name]: {
                        ...formNewPredio[name],
                        value
                    }
                }
            }
        )
    }

    const onSubmit = (e)=> {
        e.preventDefault();
        console.log('onSubmit')
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
        console.log(11111111)
        return () => {
            console.log('bay SecondForm')
        }
    }, [])

    return (
        <form onSubmit={onSubmit}>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">DATOS DEL INMUEBLE</p>
            </div>
            {
                ((tipoTramite.value === "MO" && motivoSolicitud.value === "MPHC")
                ||(tipoTramite.value === "MS" && motivoSolicitud.value === "EAP")
                ||(tipoTramite.value === "MS" && motivoSolicitud.value === "DDP"))  
                    ?  <div style={{marginBottom:'15px'}}>
                            <div className="tituloBtnRight " >
                                {
                                    prediosAsociados.length < 1 &&
                                    <label onClick={()=>abrirFormPredioTitular()} htmlFor="" className="pointer" 
                                        style={{marginRight:'10px', color:'red', fontSize:'12px'}}>
                                            {textosInfoWarnig.sinPredios} 
                                    </label>
                                }
                                <Tooltip title="Agregar predio">
                                    <AddBusinessIcon color="primary" className="pointer" onClick={()=>abrirFormPredioTitular()}/>
                                </Tooltip>
                            </div>
                            {
                                prediosAsociados.length > 0 && 
                                <TablaPredios key="TablaAsociadosPredios"
                                    registros={prediosAsociados}
                                    handleEvents={(response)=>handleActiosTablePredios(response)}
                                />
                            }
                            
                        </div> 
                    :  <div>
                        <FieldTextWidtLabel
                            label={'Ficha Catastral'}
                            value={fichaCatastral.value} 
                            name={fichaCatastral.name}
                            messageValidate={fichaCatastral.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                        />
                        <FieldTextWidtLabel
                            label={'Matricula'}
                            value={matricula.value} 
                            name={matricula.name}
                            messageValidate={matricula.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                        />
                    </div> 
                    
            }
            {/* Aplica para todos los formularios */}
            <div style={{display:'flex', width:'100%'}}>
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
            {/* Renderiza dependiendo del tipo de formulario */}

            {
                (tipoTramite.value === "MS" || tipoTramite.value === "MT" || tipoTramite.value === "MO") &&
                <div className="row" style={{marginTop:'5px'}}>
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
                    {
                        motivoSolicitud.value === "DDP" &&
                        <FieldSelect
                            label={'Proyecto Urbanistico'}
                            value={proyectoUrbanistico.value}
                            options={ProyectoUrbanistico} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={proyectoUrbanistico.validation}
                            name={proyectoUrbanistico.name}
                            styleOwn={{width:'50%', marginLeft:'10px',}}
                            required={true}
                        />
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
                <div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldSelect
                            label={'Especificación del Trámite Solicitado'}
                            value={diferenciaMayoEsta.value}
                            options={[]} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={diferenciaMayoEsta.validation}
                            name={diferenciaMayoEsta.name}
                            styleOwn={{width:'100%',}}
                            required={true}
                        />
                        <FieldSelect
                            label={'Motivo de la Solicitud'}
                            value={motivoDeLaSolicitud.value}
                            options={MotivosSolicitud} 
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
                        options={MotivosSolicitud} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={motivoDeLaSolicitud.validation}
                        name={motivoDeLaSolicitud.name}
                        styleOwn={{width:'100%', marginRight:'10px'}}
                        required={true}
                    />}
                    <FieldSelect
                        label={'Objeto de Rectificación'}
                        value={objetoRectificacion.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoRectificacion.validation}
                        name={objetoRectificacion.name}
                        styleOwn={{width:'100%', }}
                        required={true}
                    />
                    
                </div>
            }

            {
                (tipoTramite.value === "SC" && (motivoSolicitud.value === "SCPPC") ) &&

                <FieldSelect
                    label={'Motivo de la Solicitud'}
                    value={motivoDeLaSolicitud.value}
                    options={MotivosSolicitud} 
                    handleOnchange={(target)=>{handleFormChange(target)}} 
                    messageValidate={motivoDeLaSolicitud.validation}
                    name={motivoDeLaSolicitud.name}
                    styleOwn={{width:'100%', marginTop:'5px' /* marginLeft: '10px' */}}
                    required={true}
                />
            }



            {/* Aplica para todos los formularios */}
            <div className="row contenTitulo" style={{marginBottom:'10px', marginTop:'10px' ,justifyContent:'space-between'}}>
                <div className="row ">
                    <div className="decorationTitle bgc3"></div>
                    <p className="titulo color3">OTROS</p>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <input type="file" name="file" id="file" accept=".zip, .rar" 
                        onChange={(e)=>fileHandler(e)} style={{display:'none'}}
                    />
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
                </div>
            </div>

            <div>
                <FieldTextWidtLabel
                    value={file.value}
                    ph="Adjunte en este campo los documentos solicitados en un archivo .ZIP o .RAR"
                    name={file.name}
                    label={''}
                    messageValidate={file.validation}
                    // handleChange={({value})=>console.log(value)}
                    required={true}
                    // disabled={true}
                />
                <button type="submit"  className='btnAceptar'>CREAR TRÁMITE</button>
                <div style={{display:'flex', justifyContent:'center'}} 
                    onClick={()=>{avancePagina(true, false)}}
                    >
                    <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                    <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Volver atrás</p>
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
                                    label={'Ficha catastra'} 
                                    handleChange={(target)=>handleFieldsFormPredios(target)} 
                                    messageValidate={formNewPredio.fichaCatastral.validacion}/>
                                <FieldTextWidtLabel 
                                    value={formNewPredio.matricula.value}
                                    name="matricula"
                                    label={'Matrícula'}
                                    handleChange={(target)=>handleFieldsFormPredios(target)} 
                                    messageValidate={formNewPredio.matricula.validacion}
                                    styleOwn={{width:'400px'}}/>
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

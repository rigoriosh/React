import React, { useContext, useEffect, useState } from 'react'
import { FieldSelect } from '../../../componets/FieldSelect'
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { DataGrid } from '@mui/x-data-grid';

import GestiondeUS_CrearUs_Icon from '../../../assets/Iconos/GestiondeUS_CrearUs_Icon.png'
import { getInfoGET } from '../../../api'
import { StoreContext } from '../../../App'
import enviroment from '../../../helpers/enviroment'
import { regExp10Num, textosInfoWarnig } from '../../../helpers/utils'
import { Transition } from '../../auth/Signin';



const initForm = {
    nombres:{
        name: 'nombres',
        value:'',
        validacion:'',
    },
    apellidos:{
        name: 'apellidos',
        value:'',
        validacion:'',
    },
    tipoDeDocumento:{
        name: 'tipoDeDocumento',
        value:'',
        validacion:'',
    },
    numeroDeDocumento:{
        name: 'numeroDeDocumento',
        value:'',
        validacion:'',
    }
}


export const constantes = {
    tipoFormulario:{
        editar: 'edit',
        nuevo: 'new',
        eliminar:'delete',
    },
}
const initialState = {
    modoFormulario: constantes.tipoFormulario.nuevo, // editar, eliminar
    registroSeleccionado: {},
    formularioTotalOk: false,
    validacionTitulares:false,
}

export const FirstFormTramitre = ({handleFormChange, tiposTramites, tipoSolicitud, tiposSolicitante, avancePagina,
    formularioTramite, setFormularioTramite, renderizarInfoSegunTipoTramite, setFormsAndlastForm, detalleTramite, cargarInfoDetalleTramite,
    modoTramite, addPrimerOpcionSelect}) => {

        const {store, updateStore} = useContext(StoreContext);
        const {dialogTool} = store;
        const [openDialog, setOpenDialog] = useState(false);
        const {tipoTramite, motivoSolicitud, tipoSolicitante, razonSolicitud, titularesDeDerecho,
            } = formularioTramite;
        const [tiposDocumento, setTiposDocumento] = useState([]);

        const [stateFirsFormTramite, setStateFirsFormTramite] = useState(initialState);
        const {modoFormulario, registroSeleccionado, formularioTotalOk, validacionTitulares} = stateFirsFormTramite;
        /* console.log(`
            modoFormulario => ${modoFormulario}
            registroSeleccionado => ${JSON.stringify(registroSeleccionado)}
            formularioTotalOk => ${formularioTotalOk}
            validacionTitulares => ${validacionTitulares}
        `); */

        const [newTitularDerecho, setNewTitularDerecho] = useState(initForm);

        const agregarEditEliminarTitularDeDerecho = () => {
            let clonetitularesDeDerecho = [...titularesDeDerecho];
            let formularioOk = true;
            const key = Object.keys(newTitularDerecho);
            key.forEach(campo => {
                if (newTitularDerecho[campo].value === "") {
                    newTitularDerecho[campo].validacion = textosInfoWarnig.campoRequerido;
                    formularioOk = false;
                    updateStore({
                        ...store,
                        snackBar:{
                            openSnackBar: true,
                            messageSnackBar:textosInfoWarnig.camposRequerdios,
                            severity: 'error'
                        }, llama:"L87FFirstFormTramite"
                    });
                }else{
                    newTitularDerecho[campo].validacion = '';
                }
            });

            if (formularioOk || modoFormulario === constantes.tipoFormulario.eliminar) {
                if (modoFormulario === constantes.tipoFormulario.nuevo) {
                    clonetitularesDeDerecho.push(
                        {
                            id: clonetitularesDeDerecho.length,
                            numeroDocumento: newTitularDerecho.numeroDeDocumento.value,
                            tipoDocumento: newTitularDerecho.tipoDeDocumento.value,
                            nombre: newTitularDerecho.nombres.value,
                            apellido: newTitularDerecho.apellidos.value,
                        }
                    );
                } else if (modoFormulario === constantes.tipoFormulario.editar){
                    clonetitularesDeDerecho = clonetitularesDeDerecho.map( titular => {
                        if (titular.id === registroSeleccionado.id) {
                            return  {
                                id: registroSeleccionado.id,
                                numeroDocumento: newTitularDerecho.numeroDeDocumento.value,
                                tipoDocumento: newTitularDerecho.tipoDeDocumento.value,
                                nombre: newTitularDerecho.nombres.value,
                                apellido: newTitularDerecho.apellidos.value,
                            }
                        } else {
                            return titular;
                        }
                    })
                }
                setFormularioTramite({...formularioTramite, titularesDeDerecho: clonetitularesDeDerecho});
                // setTitularesDeDerecho(clonetitularesDeDerecho);
                setOpenDialog(false);
                resetForm();
            }

        }

        const resetForm = () => {
            setNewTitularDerecho({
                nombres:{
                    name: 'nombres',
                    value:'',
                    validacion:'',
                },
                apellidos:{
                    name: 'apellidos',
                    value:'',
                    validacion:'',
                },
                tipoDeDocumento:{
                    name: 'tipoDeDocumento',
                    value:'',
                    validacion:'',
                },
                numeroDeDocumento:{
                    name: 'numeroDeDocumento',
                    value:'',
                    validacion:'',
                }
            });
        }

        const getTiposDocumento = async() => {
            const token = '';
            const headers = {token, /* nombreDominio:'TIPO_DOCUMENTO' */};
            const getTiposDocumento = await getInfoGET(headers, enviroment.getTiposDocumento)
            // let getTiposDocumento = {"resultado":{"dominios":[{"descripcionValor":"Cedula de ciudadanía","idValorLista":1,"valor":"CC","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Cédula de extranjería","idValorLista":6,"valor":"CE","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Pasaporte","idValorLista":7,"valor":"PA","nombreLista":"TIPO_DOCUMENTO"}]}}
            if (!getTiposDocumento.resultado) {
                updateStore({
                    ...store,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar:textosInfoWarnig.falloComunicacion,
                        severity: 'error'
                    }, llama:"L165FFirstFormTramite"
                });
            } else {
                // ajusta tipos de documentos a ser renderizados
                const tiposDocumento = [
                    // {
                    //     descripcionValor: 'Seleccione...',
                    //     idValorLista: 1,
                    //     valor: 'seleccione',
                    //     nombreLista: 'seleccione'
                    // }
                ];
                getTiposDocumento.resultado.dominios.forEach(dominio => {
                    tiposDocumento.push(dominio);
                });
                setTiposDocumento(addPrimerOpcionSelect(tiposDocumento));
                updateStore({ ...store, tiposDocumento, llama:"L187FFirstFormTramite"});
            }
        }

        const abrirFormAgregarTitular = () => {
            setOpenDialog(true); 
            setStateFirsFormTramite(
                {
                    ...stateFirsFormTramite,
                    modoFormulario: constantes.tipoFormulario.nuevo,
                    registroSeleccionado: {},
                });
        }

        const editarTitular = (titular) => {
            setNewTitularDerecho({
                nombres:{
                    name: 'nombres',
                    value: titular.nombre,
                    validacion:'',
                },
                apellidos:{
                    name: 'apellidos',
                    value: titular.apellido,
                    validacion:'',
                },
                tipoDeDocumento:{
                    name: 'tipoDeDocumento',
                    value: titular.tipoDocumento,
                    validacion:'',
                },
                numeroDeDocumento:{
                    name: 'numeroDeDocumento',
                    value: titular.numeroDocumento,
                    validacion:'',
                }
            });
            setOpenDialog(true);
            setStateFirsFormTramite(
                {
                    ...stateFirsFormTramite,
                    modoFormulario: constantes.tipoFormulario.editar,
                    registroSeleccionado: titular,
                });
        }

        const aliminarTitular = (titular, eliminar=false) => {
            
            if (eliminar) {
                const updateTitulares = formularioTramite.titularesDeDerecho.filter(e => e.id !== stateFirsFormTramite.registroSeleccionado.id)
                setFormularioTramite({...formularioTramite, titularesDeDerecho: updateTitulares});
            } else {
                setStateFirsFormTramite(
                    {
                        ...stateFirsFormTramite,
                        modoFormulario: constantes.tipoFormulario.eliminar,
                        registroSeleccionado: titular,
                    });
                updateStore({...store, dialogTool:{
                    open:true, 
                    msg: textosInfoWarnig.elimnarUsuario,
                    tittle:'Confirmación',
                    response:false,
                    actions:true
                }, llama:"L245FFirstFormTramite"});
            }
        }

        useEffect(() => {

            if (modoTramite === 'Nuevo') {
                if (store.tiposDocumento.length === 0) {
                    getTiposDocumento();
                    // setTiposDocumento(tiposDocumentoToTest);
                } else {
                    setTiposDocumento(addPrimerOpcionSelect(store.tiposDocumento));
                }
            }else{
                cargarInfoDetalleTramite()
                setTimeout(() => {
                    // setFormularioTramite(
                    //     {
                    //         ...formularioTramite,
                    //         modoTramite: 'Detalle',
                    //     }
                    // );
                    updateStore({...store, openBackDrop:false, llama:"L273FFirstFormTramite"});
                }, 1000);

            }
            return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        useEffect(() => {
            if (modoTramite === 'Nuevo') {
                if (dialogTool.response) {
                    aliminarTitular(formularioTramite.registroSeleccionado, true);
                    updateStore({
                        ...store,
                        dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L285FFirstFormTramite"
                    });
                }
            }
            return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dialogTool])

        useEffect(() => {
            if (modoTramite === 'Nuevo') {
                validateTotalForm();
            }
            return () => {
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tipoTramite, motivoSolicitud, tipoSolicitante, titularesDeDerecho, razonSolicitud]);

        // eslint-disable-next-line no-unused-vars
        const [columns, setColumns] = useState([
            { field: 'id', headerName:'ID', hide:true, },
            { field: 'nombre', headerName:'Nombres', flex:0.2, },
            { field: 'apellido', headerName:'Apellidos', flex:0.2, },
            {
                field: 'Habilitar',
                // type: 'actions',
                hide: (modoTramite === 'Consulta'|| modoTramite === 'Seguimiento'),
                align:'center',
                flex:0.2,
                renderCell: ({row}) => [
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Tooltip title="Modificar información del titular ">
                            <EditIcon 
                                onClick={()=>{editarTitular(row)}}
                                sx={{color:'green'}}
                            />
                        </Tooltip>
                        <Tooltip title="Retirar titular ">
                            <DeleteForeverIcon 
                                onClick={()=>{aliminarTitular(row, false)}}
                                sx={{color:'gray'}}
                            />
                        </Tooltip>
                    </div>
                ],
            },
        ]);

        const validateTotalForm = () => {
            let validacion = false;
            if (tipoTramite.value !== '' && motivoSolicitud.value !== '' &&
             tipoSolicitante.value !== '' && razonSolicitud.value !== '' &&
             titularesDeDerecho.length > 0) {
                validacion = true;
            }
            let validacionTitulares = false;
            if (titularesDeDerecho.length < 1) {
                validacionTitulares = true;
            }
            setStateFirsFormTramite({
                ...stateFirsFormTramite,
                formularioTotalOk: validacion,
                validacionTitulares
            });
        }
        const onSubmit = (e)=> {
            e.preventDefault();
            validateTotalForm();
        }

    return (
        <form onSubmit={onSubmit}>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1"style={{width:'100%'}}>TRÁMITES CATASTRALES</p>
                {
                    (modoTramite === 'Nuevo') &&
                        <Tooltip title="Ver documentos requeridos">
                            <AttachFileIcon className="pointer"
                                onClick={()=>renderizarInfoSegunTipoTramite()}
                                sx={{color:'gray'}}
                            />
                        </Tooltip>
                }
            </div>
            <div style={{margin:'10px 0px'}}>
                <div className="row aife">
                    {
                        modoTramite === 'Nuevo'
                        ?
                            <FieldSelect
                                label={'Trámite'}
                                value={tipoTramite.value}
                                options={tiposTramites} 
                                handleOnchange={(target)=>handleFormChange(target)}
                                messageValidate={tipoTramite.validation}
                                name={tipoTramite.name}
                                required={true}
                            />
                        :
                        <FieldTextWidtLabel
                            label={'Trámite'}
                            value={tipoTramite.value} 
                            name={tipoTramite.name}
                            messageValidate={tipoTramite.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            type="text"
                            whitIconRight={false}
                            disabled={true}
                        />
                    }
                    
                </div>

                {
                    modoTramite === 'Nuevo'
                    ?   
                        <div>
                            <FieldSelect
                                label={'Solicitud'}
                                value={motivoSolicitud.value}
                                options={tipoSolicitud}
                                styleOwn={{marginTop:'5px'}}
                                handleOnchange={(target)=>handleFormChange(target)}
                                messageValidate={motivoSolicitud.validation}
                                name={motivoSolicitud.name}
                                required={true}
                            />
                            <FieldSelect
                                label={'Tipo de solicitante'}
                                value={tipoSolicitante.value}
                                options={tiposSolicitante}
                                styleOwn={{marginTop:'5px'}}
                                handleOnchange={(target)=>handleFormChange(target)}
                                messageValidate={tipoSolicitante.validation}
                                name={tipoSolicitante.name}
                                required={true}
                            />
                        </div>
                    :
                        <div>
                            <FieldTextWidtLabel
                                label={'Solicitud'}
                                value={motivoSolicitud.value} 
                                name={motivoSolicitud.name}
                                messageValidate={motivoSolicitud.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="text"
                                whitIconRight={false}
                                disabled={true}
                            />
                            <FieldTextWidtLabel
                                label={'Tipo de solicitante'}
                                value={tipoSolicitante.value} 
                                name={tipoSolicitante.name}
                                messageValidate={tipoSolicitante.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="text"
                                whitIconRight={false}
                                disabled={true}
                            />

                        </div>
                }

                

            </div>

            <div className="row contenTitulo">
                <div className="decorationTitle bgc2"></div>
                <p className="titulo color2" style={{width:'65%'}}>TITULARES DE DERECHO</p>
                {
                    modoTramite === 'Nuevo' &&
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <p onClick={()=>{abrirFormAgregarTitular()}} className="color2 pointer">Agregar titular</p>
                            <img onClick={()=>{abrirFormAgregarTitular()}} className="imgWidth" src={GestiondeUS_CrearUs_Icon} alt="" 
                            style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
                        </div>
                }
            </div>

            {
                titularesDeDerecho.length < 1 
                ? modoTramite === 'Nuevo' ? <p className="subTitulo" style={{marginBottom:'10px', color: validacionTitulares ? 'red':''}}>Recuerda, se requiere mínimo un titular</p>
                    : ''
                : <div style={{ height: 'auto', width: '100%', }}>
                    <DataGrid
                        columns={columns}
                        rows={titularesDeDerecho}
                        autoHeight
                        density="compact"
                        hideFooter={((modoTramite === 'Consulta' || modoTramite === 'Seguimiento') && titularesDeDerecho.length < 3)}
                        hideFooterSelectedRowCount
                        pageSize={2}
                        // scrollbarSize={10}
                        loading={titularesDeDerecho.length <= 0 && modoTramite === 'Nuevo'}
                        // rowsPerPageOptions={titularesDeDerecho.length}
                    />
                </div>
            }
            

            <div className="row contenTitulo">
                <div className="decorationTitle bgc3"></div>
                <p className="titulo color3">OTROS</p>
            </div>

            <div style={{margin:'10px 0px'}} >
                <div className="fieldTextWidtLabel labels">
                    <p>Razones de la solicitud</p>
                    <textarea
                        onChange={({target})=>{
                            setFormularioTramite({
                                ...formularioTramite,
                                razonSolicitud:{
                                    ...razonSolicitud,
                                    value:target.value
                                }})
                        }}
                        className="textArea"
                        name="textarea"
                        rows="10"
                        cols="50"
                        placeholder="Escriba en este campo las razones por las cuales está generando la solicitud."
                        required={true}
                        value={razonSolicitud.value}
                        disabled={modoTramite === 'Consulta' || modoTramite === 'Seguimiento'}
                        maxLength={254}
                    >
                    </textarea>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    { (modoTramite === 'Consulta' || modoTramite === 'Seguimiento') &&
                        <button onClick={()=>setFormsAndlastForm("verEstado")} type="button" style={{marginRight:'140px'}} className='btnAceptar'>
                            {   modoTramite === 'Consulta'
                                ? `VER ESTADO`
                                : modoTramite === 'Seguimiento'
                                    ? 'CAMBIAR ESTADO'
                                    : ''
                            }
                        </button> }
                    <button type="submit" style={{border:'none', background:'transparent'}}>
                        <p onClick={()=>{avancePagina( modoTramite === 'Nuevo' ? formularioTotalOk : true, true)}} 
                            className={`${(formularioTotalOk || modoTramite === 'Consulta' || modoTramite === 'Seguimiento') ?'color1 pointer':'grey2'}  `}>Siguiente <span style={{fontWeight:'bold'}}>{'>'}</span> </p>
                    </button>
                    {/* <img onClick={()=>{avancePagina()}} className="imgWidth" src={PasodePagDer_Icon} alt="" style={{width:'12px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/> */}
                </div>
            </div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Agregar titular de derecho'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div style={{margin:'10px 0px'}}>
                            <div className="row">
                                <FieldTextWidtLabel value={newTitularDerecho.nombres.value} name="nombres" label={'Nombres'}  maxLength={99}
                                    handleChange={({value})=>{
                                        if(value.length < 100) setNewTitularDerecho({...newTitularDerecho, nombres: {...newTitularDerecho.nombres,value}})
                                    }} 
                                    messageValidate={newTitularDerecho.nombres.validacion}
                                />
                                <FieldTextWidtLabel  value={newTitularDerecho.apellidos.value} name="apellidos" label={'Apellidos'} maxLength={99}
                                    handleChange={({value})=>{
                                        if(value.length < 100) setNewTitularDerecho({...newTitularDerecho, apellidos: {...newTitularDerecho.apellidos,value}})
                                    }}
                                    messageValidate={newTitularDerecho.apellidos.validacion} styleOwn={{marginLeft:'10px'}}
                                />
                            </div>
                            <div style={{display:'flex', width:'100%'}}>
                                <FieldSelect label={'Tipo de documento'} value={newTitularDerecho.tipoDeDocumento.value}
                                    options={tiposDocumento} 
                                    handleOnchange={({value})=>setNewTitularDerecho({...newTitularDerecho, tipoDeDocumento: {...newTitularDerecho.tipoDeDocumento, value}})} 
                                    messageValidate={newTitularDerecho.tipoDeDocumento.validacion} name={newTitularDerecho.tipoDeDocumento.name} styleOwn={{width:'100%'}}
                                />
                                
                                <FieldTextWidtLabel name={"numeroDocumento"} value={newTitularDerecho.numeroDeDocumento.value} label={'Numero de documento'} maxLength={10}
                                    handleChange={({value})=>{
                                        if(regExp10Num.test(value)||value.length < 10) setNewTitularDerecho({...newTitularDerecho, numeroDeDocumento: {...newTitularDerecho.numeroDeDocumento,value}})
                                    }}
                                    messageValidate={newTitularDerecho.numeroDeDocumento.validacion} type='number' styleOwn={{marginLeft:'10px', width:'60%'}}
                                />

                                {/* <img onClick={()=>{}} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/> */}
                            </div>
                            
                            <div className="row"></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                agregarEditEliminarTitularDeDerecho();
                            }} className='btnAceptar'>{`${modoFormulario === constantes.tipoFormulario.nuevo ? 'Agregar': 'Editar'} titular`}</button>
                            <button onClick={()=>{
                                resetForm();
                                setOpenDialog(false);
                            }} className='btnAceptar'>Cancelar</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
        </form>
    )
}

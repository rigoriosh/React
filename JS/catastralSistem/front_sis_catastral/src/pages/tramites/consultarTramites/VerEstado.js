import React, { useContext, useEffect, useState } from 'react'

import Salir_Icon from '../../../assets/Iconos/Salir_Icon.png'
import { FieldInput } from '../../../componets/FieldInput'
import { ajusteDataTramite, /* pathsRoutes, */ textosInfoWarnig } from '../../../helpers/utils'
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transition } from '../../auth/Signin';
import { FieldSelect } from '../../../componets/FieldSelect';
import { StoreContext } from '../../../App';
import { downloadFile, getInfo, getInfoGET } from '../../../api';
import enviroment from '../../../helpers/enviroment';
import { getEstadosSolicitudTest, getSolicitudId_179, updateEstadoSolicitudTest } from '../../../helpers/toTest';
// import { useNavigate } from 'react-router-dom';


export const VerEstado = ({setFormsAndlastForm, lastForm, detalleTramite, formularioTramite, modoTramite/* , getDetalleTramite */}) => {
    const { store, updateStore } = useContext(StoreContext);
    const {modeTest} = store;
    // let navigate = useNavigate();

    const {estadosSolicitud} = detalleTramite;

    const [state, setState] = useState({
        openDialogDetalleEstado:false,
        openDialogCambiarEstado:false,
        openDialogConfirmacionSiNo:{
            open:false,
            respuesta:''
        },
        showBtnCambiarEstado:true,
        registroSeleccionado:{},
        formNewEstado:{
            estado:{
                name:'estado',
                value:'',
                validacion:''
            },
            observaciones:{
                name:'observaciones',
                value:'',
                validacion:''
            },
        },
        tiposEstado:[],
    });
    const {openDialogDetalleEstado, registroSeleccionado, formNewEstado,
        openDialogCambiarEstado, tiposEstado, openDialogConfirmacionSiNo,
        showBtnCambiarEstado }=state;
    const {
        estado,
        observaciones,
    } = formNewEstado;
    const {respuesta} = openDialogConfirmacionSiNo;

    const opendeModal = (registroSeleccionado) => {
        setState({
            ...state,
            registroSeleccionado,
            openDialogDetalleEstado:true
        })
    }

    // eslint-disable-next-line no-unused-vars
    const [columns, setColumns] = useState([
        { field: 'id', headerName:'ID', hide:true, },
        { field: 'idSolicitud', headerName:'Solicitud', },
        { field: 'fechaEstado', headerName:'Fecha', flex:0.2, },
        { field: 'estado', headerName:'Estado', flex:0.2, },
        { field: 'observaciones', headerName:'Obervaciones', flex:0.2, },
        {
            field: '',
            // type: 'actions',
            headerName:'Detalle',
            hide:'',
            align:'center',
            width: 100,
            renderCell: ({row}) => [
                <div style={{display:'flex', alignItems:'center'}}>
                    <Tooltip title="Modificar información del predio ">
                        <FindInPageIcon 
                            onClick={()=>{opendeModal(row)}}
                            sx={{color:'green'}}
                        />
                    </Tooltip>
                </div>
            ],
        },
    ]);

    // eslint-disable-next-line no-unused-vars
    const abrirFormCambiarEstado = () => {
        setState(
            {
                ...state,
                openDialogCambiarEstado: true,
                formNewEstado:{
                    estado:{...estado, value:'', validacion:''},
                    observaciones:{...observaciones, value:'', validacion:''},
                },
            });
    }

    const getTiposEstado = async()=>{
        updateStore({...store, openBackDrop:true, llama:"L109FVerEstado"});
        try {
            let response={}
            if (modeTest) {
                response = getEstadosSolicitudTest;
            } else {
                const headers = {token: store.user.token};
                response = await getInfoGET(headers, enviroment.getEstadosSolicitud);
            }
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                setState({
                    ...state,
                    tiposEstado: response.resultado.dominios,
                    openDialogConfirmacionSiNo:{
                        ...openDialogConfirmacionSiNo,
                        respuesta:"No"
                    }
                });
                updateStore({...store, openBackDrop:false, llama:"L120FVerEstado"});
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
            dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L129FVerEstado"
        });
    }

    useEffect(() => {
        if(modoTramite === "Seguimiento") getTiposEstado();
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (respuesta === 'Si') {
            setState({
                ...state,
                openDialogConfirmacionSiNo:{
                    open:false,
                    respuesta:'No'
                }
            })
            actualizarEstado();
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respuesta])

    const actualizarEstado = async() => {
        updateStore({...store, openBackDrop:true, llama:"L161FVerEstado"});
        try {
            let response = {};
            const headers = {token: store.user.token};
            if (modeTest) {
                response = updateEstadoSolicitudTest;
            } else {
                const body = {
                    "estado": estado.value,
                    "observaciones": observaciones.value,
                    "idSolicitud": detalleTramite.estadosSolicitud[0].idSolicitud
                }
                response = await getInfo(headers, enviroment.updateEstadoSolicitud,
                    "PUT", JSON.stringify(body));
            }

            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                /* setState({
                    ...state,
                    showBtnCambiarEstado:false,
                    openDialogConfirmacionSiNo:{
                        ...openDialogConfirmacionSiNo,
                        respuesta:"No"
                    }
                }) */
                updateStore({...store,
                    // detalleTramite:{},
                    openBackDrop:true,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar:textosInfoWarnig.cambioEstadoTramiteOk,
                        tiempoExpiracion:'',
                        severity: "success"/*  | "error" | "warning" | "info" */,
                    }, llama:"L188FVerEstado"
                });
                // getDetalleTramite({idSolicitud:detalleTramite.idSolicitud});
                // navigate(pathsRoutes.seguimientoTramite)
            let response={};
            if (modeTest) {
                response = getSolicitudId_179;
            } else {
                response = await getInfoGET(headers, enviroment.getDetalleSolicitud+'/'+detalleTramite.estadosSolicitud[0].idSolicitud);
            }
            const responseDetalleTramite = ajusteDataTramite(response);
            updateStore({
                ...store,
                detalleTramite:responseDetalleTramite,                
                llama:"L206FVerEstado",
                openBackDrop:false,
                snackBar:{
                    openSnackBar: false,
                    messageSnackBar: '',
                    severity: 'success'
                }
            })

            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }

    const opendeModalFormCambiarEstado = () => {
        setState({
            ...state,
            openDialogCambiarEstado:true,
            formNewEstado:{
                estado:{
                    name:'estado',
                    value:'',
                    validacion:''
                },
                fechaEstado:{
                    name:'fechaEstado',
                    value:'',
                    validacion:''
                },
                idEstadoSolicitud:{
                    name:'idEstadoSolicitud',
                    value:'',
                    validacion:''
                },
                observaciones:{
                    name:'observaciones',
                    value:'',
                    validacion:''
                },
            }
        });
    }

    const validaFormuCambioEstado = () => {
        if (estado.value === '') {
            setState({
                ...state,
                formNewEstado:{
                    ...formNewEstado,
                    estado:{
                        ...estado,
                        validacion:textosInfoWarnig.campoRequerido
                    }
                }
            })
        } else if(observaciones.value === ''){
            setState({
                ...state,
                formNewEstado:{
                    ...formNewEstado,
                    observaciones:{
                        ...observaciones,
                        validacion:textosInfoWarnig.campoRequerido
                    }
                }
            })
        }else{
            setState({
                ...state,
                openDialogCambiarEstado:false,
                openDialogConfirmacionSiNo:{
                    ...openDialogConfirmacionSiNo,
                    open:true
                }
            })
        }
    }

    const descargarDocumentos = async() => {
        updateStore({...store, openBackDrop:true, llama:"L263FVerEstado"});
        try {
            const headers = {token: store.user.token};
            const response = await downloadFile(headers, enviroment.getArchivoSolicitud+'/'+detalleTramite.idSolicitud);
            if (response.error) {
                falloLaPeticion(response.error);
            } else {
                const blobResponse = await response.blob();
                var url = window.URL.createObjectURL(blobResponse);
                var a = document.createElement('a');
                a.href = url;
                a.download = detalleTramite.numeroRadicado+'.zip';
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();    
                a.remove();  //afterwards we remove the element again   
                updateStore({...store, openBackDrop:false, llama:"L278FVerEstado"});
            }
        } catch (error) {
            falloLaPeticion(error);
        }
    }
    return (
        <div>
           
            <div className="row contenTitulo">
                <div className="decorationTitle bgc2"></div>
                <p className="titulo color2">ESTADO: {estadosSolicitud[estadosSolicitud.length - 1].estado}</p>
            </div>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">Trazabilidad</p>
                {
                    (modoTramite === "Seguimiento" && showBtnCambiarEstado) &&
                    <div className="row" style={{width:'100%', justifyContent:'flex-end'}}>
                        <Tooltip
                            title="Cambiar estado"
                            onClick={()=>{opendeModalFormCambiarEstado()}}>
                            <AddBoxIcon sx={{color:'orange'}}/>
                        </Tooltip>
                    </div>

                }
            </div>
            <DataGrid
                columns={columns}
                rows={estadosSolicitud}
                autoHeight
                density="compact"
                hideFooter={estadosSolicitud.length < 4}
                hideFooterSelectedRowCount
                pageSize={3}
                // scrollbarSize={10}
                loading={estadosSolicitud.length <= 0}
                rowsPerPageOptions={[3]}
                key={Math.random()}
            />

            {
                modoTramite === "Seguimiento" &&
                <div className="tituloBtnCenter">
                    <p className="btnSalirRegresar" onClick={()=>descargarDocumentos()}>
                        Descargar documentos
                    </p>
                    <FileDownloadIcon sx={{color:'gray'}} onClick={()=>descargarDocumentos()}/>
                </div>
            }

            <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}} 
                onClick={()=>{setFormsAndlastForm(lastForm)}}
                >
                <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                <p className="btnSalirRegresar" style={{marginLeft:'10px'}}>Volver atrás</p>
            </div>
            

            <Dialog
                open={openDialogDetalleEstado}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setState({...state, openDialogDetalleEstado:false})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Detalle del estado</DialogTitle>
                <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                        <div style={{margin:'0px 20px'}}>
                                <div style={{}}>
                                    <label className="labels">Solicitud</label>
                                    <p>{registroSeleccionado.idSolicitud}</p>
                                </div>
                                <div style={{}}>
                                    <label className="labels">Fecha</label>
                                    <p>{registroSeleccionado.fechaEstado}</p>
                                </div>
                                <div style={{}}>
                                    <label className="labels">Estado</label>
                                    <p>{registroSeleccionado.estado}</p>
                                </div>
                                <div style={{}}>
                                    <label className="labels">Obervaciones</label>
                                    <p>{registroSeleccionado.observaciones}</p>
                                </div>
                                
                        </div>
                    </DialogContentText>
                </DialogContent>
                
            </Dialog>
            <Dialog
                open={openDialogCambiarEstado}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setState({...state,openDialogCambiarEstado:false})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Cambiar estado'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div style={{margin:'10px 0px'}}>
                            <div style={{display:'flex', width:'100%',
                                marginBottom:'20px'}}>
                                <FieldSelect label={'Estado'} 
                                    value={estado.value}
                                    options={tiposEstado} 
                                    handleOnchange={({value})=>setState({
                                        ...state,
                                        formNewEstado:{
                                            ...formNewEstado,
                                            estado:{
                                                ...estado,
                                                validacion:'',
                                                value
                                            }
                                        }
                                    })} 
                                    messageValidate={estado.validacion}
                                    name={estado.name}
                                    styleOwn={{width:'100%'}}
                                />

                                {/* <img onClick={()=>{}} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/> */}
                            </div>
                            <div className="row">
                                <div className="fieldTextWidtLabel labels">
                                    
                                    <FieldInput
                                        label="Observaciones"
                                        tipo="TextArea"
                                        rowstextArea={10}
                                        colstextArea={50}
                                        required={true}
                                        value={observaciones.value}
                                        disabled={false}
                                        placeholder="Escriba en este campo la observación del cambio de estado."
                                        messageValidate={observaciones.validacion}
                                        maxLength={200}
                                        handleOnchange={({value})=>
                                            setState({
                                                ...state,
                                                formNewEstado:{
                                                    ...formNewEstado,
                                                    observaciones:{
                                                        ...observaciones,
                                                        validacion:'',
                                                        value
                                                    }
                                                }
                                            })
                                        }
                                    />
                                </div>
                                
                            </div>
                            
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                validaFormuCambioEstado();
                            }} className='btnAceptar'>Agregar</button>
                            <button onClick={()=>{
                                //resetForm();
                                setState({
                                    ...state,
                                    openDialogCambiarEstado:false
                                })
                            }} className='btnAceptar'>Cancelar</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDialogConfirmacionSiNo.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setState({...state,openDialogConfirmacionSiNo:{open:false}})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Cambiar estado'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p> ¿ Está seguro de cambiar el estado de este trámite ?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                setState({
                                    ...state,
                                    openDialogConfirmacionSiNo:{
                                        open:false,
                                        respuesta:'Si'
                                    }
                                });
                            }} className='btnAceptar'>Si</button>
                            <button onClick={()=>{
                                //resetForm();
                                setState({
                                    ...state,
                                    openDialogConfirmacionSiNo:{
                                        open:false,
                                        respuesta:'No'
                                    }
                                })
                            }} className='btnAceptar'>No</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

import React, { useState } from 'react'
import Salir_Icon from '../../../assets/Iconos/Salir_Icon.png'
import { FieldInput } from '../../../componets/FieldInput'
import { stylesApp } from '../../../helpers/utils'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transition } from '../../auth/Signin';
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel';
import { FieldSelect } from '../../../componets/FieldSelect';


export const VerEstado = ({setForms, detalleTramite, formularioTramite, modoTramite}) => {

    const {estadosSolicitud} = detalleTramite;

    const [state, setState] = useState({
        openDialogDetalleEstado:false,
        openDialogCambiarEstado:false,
        registroSeleccionado:{},
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
    const {openDialogDetalleEstado, registroSeleccionado, formNewEstado,
        openDialogCambiarEstado }=state;
    const {
        estado,
        fechaEstado,
        idEstadoSolicitud,
        observaciones,
    } = formNewEstado;

    const opendeModal = (registroSeleccionado) => {
        setState({
            ...state,
            registroSeleccionado,
            openDialogDetalleEstado:true
        })
    }

    const [columns, setColumns] = useState([
        { field: 'id', headerName:'ID', hide:true, },
        { field: 'idSolicitud', headerName:'Solicitud', },
        { field: 'fechaEstado', headerName:'Fecha', flex:0.2, },
        { field: 'estado', headerName:'Estado', flex:0.2, },
        { field: 'observaciones', headerName:'Obervaciones', flex:0.2, },
        {
            field: '',
            // type: 'actions',
            hide:'',
            align:'center',
            width: 70,
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

    const abrirFormCambiarEstado = () => {
        setState(
            {
                ...state,
                openDialogCambiarEstado: true,
                formNewEstado:{
                    estado:{...estado, value:'', validacion:''},
                    fechaEstado:{...fechaEstado, value:'', validacion:''},
                    idEstadoSolicitud:{...idEstadoSolicitud, value:'', validacion:''},
                    observaciones:{...observaciones, value:'', validacion:''},
                },
            });
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
        })
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
                    modoTramite === "Seguimiento" &&
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
                rowsPerPageOptions={[]}
                key={Math.random()}
            />


            <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}} 
                onClick={()=>{setForms(1)}}
                >
                <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                <p className="btnSalirRegresar">Volver atrás</p>
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
                            <div className="row">
                                <FieldTextWidtLabel value={'newTitularDerecho.nombres.value'} name="nombres" label={'Nombres'}  maxLength={99}
                                    handleChange={({value})=>{/* 
                                        if(value.length < 100) setNewTitularDerecho({...newTitularDerecho, nombres: {...newTitularDerecho.nombres,value}})
                                     */}} 
                                    messageValidate={'newTitularDerecho.nombres.validacion'}
                                />
                                <FieldTextWidtLabel  value={'newTitularDerecho.apellidos.value'} name="apellidos" label={'Apellidos'} maxLength={99}
                                    handleChange={({value})=>{/* 
                                        if(value.length < 100) setNewTitularDerecho({...newTitularDerecho, apellidos: {...newTitularDerecho.apellidos,value}})
                                     */}}
                                    messageValidate={'newTitularDerecho.apellidos.validacion'} styleOwn={{marginLeft:'10px'}}
                                />
                            </div>
                            <div style={{display:'flex', width:'100%'}}>
                                {/* <FieldSelect label={'Tipo de documento'} value={'newTitularDerecho.tipoDeDocumento.value'} options={{}} 
                                    handleOnchange={({value})=>
                                    setNewTitularDerecho({...newTitularDerecho,
                                         tipoDeDocumento: {...newTitularDerecho.tipoDeDocumento, value}})
                                        } 
                                    messageValidate={'newTitularDerecho.tipoDeDocumento.validacion'} name={'newTitularDerecho.tipoDeDocumento.name'} styleOwn={{width:'50%'}}
                                /> */}
                                

                                {/* <img onClick={()=>{}} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/> */}
                            </div>
                            
                            <div className="row"></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                            <button onClick={()=>{
                                //agregarEditEliminarTitularDeDerecho();
                            }} className='btnAceptar'>Agregar</button>
                            <button onClick={()=>{
                                //resetForm();
                                //setOpenDialog(false);
                            }} className='btnAceptar'>Cancelar</button>
                    </div>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

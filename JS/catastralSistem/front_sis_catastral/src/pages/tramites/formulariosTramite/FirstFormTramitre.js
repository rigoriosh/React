import React, { useContext, useEffect, useState } from 'react'
import { GrEdit } from "react-icons/gr";
import { GrFormTrash } from "react-icons/gr";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FieldSelect } from '../../../componets/FieldSelect'
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';

import PasodePagDer_Icon from '../../../assets/Iconos/PasodePagDer_Icon.png'
import GestiondeUS_CrearUs_Icon from '../../../assets/Iconos/GestiondeUS_CrearUs_Icon.png'
import { getInfoGET } from '../../../api'
import { StoreContext } from '../../../App'
import enviroment from '../../../helpers/enviroment'
import { constantesGlobales, textosInfoWarnig, tiposDocumentoToTest } from '../../../helpers/utils'
import { Transition } from '../../auth/Signin';
import { constntesCrearTramites } from '../CrearTramite';



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
}

export const FirstFormTramitre = ({handleFormChange, tiposTramites, tipoSolicitud, tiposSolicitante, avancePagina,
    formularioTramite, setFormularioTramite, openInfoFiles}) => {

        const {store, updateStore} = useContext(StoreContext);
        const {dialogTool} = store;
        const [openDialog, setOpenDialog] = useState(false);
        const {tipoTramite, motivoSolicitud, tipoSolicitante, razonSolicitud, titularesDeDerecho} = formularioTramite;
        const [tiposDocumento, setTiposDocumento] = useState([]);

        const [stateFirsFormTramite, setStateFirsFormTramite] = useState(initialState);
        const {modoFormulario, registroSeleccionado, formularioTotalOk} = stateFirsFormTramite;

        const [newTitularDerecho, setNewTitularDerecho] = useState(initForm);

        const [validaciones, setValidaciones] = useState({campo:'', msgValidacion:''});

        const agregarEditEliminarTitularDeDerecho = () => {
            let clonetitularesDeDerecho = [...titularesDeDerecho];
            console.log(clonetitularesDeDerecho);
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
                        },
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
                } else {
                    console.log(formularioTramite)
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
                    },
                });
            } else {
                // ajusta tipos de documentos a ser renderizados
                const tiposDocumento = [
                    // {
                    //     descripcionValor: 'Seleccione ...',
                    //     idValorLista: 1,
                    //     valor: 'seleccione',
                    //     nombreLista: 'seleccione'
                    // }
                ];
                getTiposDocumento.resultado.dominios.forEach(dominio => {
                    tiposDocumento.push(dominio);
                });
                setTiposDocumento(tiposDocumento);
                updateStore({ ...store, tiposDocumento, });
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

        useEffect(() => {
            // get Tipos documentos
            setTimeout(() => {
                updateStore({
                    ...store,
                    dialogTool:{
                        open:true,
                        msg :constantesGlobales.tipoNotas.nota1,
                        tittle:'Nota', 
                        response:false,
                        actions:false, 
                        styles:{backgroundColor: 'rgba(10,10,10,0.8)', color:'white'},
                        textColor:{color:'white'},
                    },
                });
            }, 1);
            if (store.tiposDocumento.length === 0) {
                // getTiposDocumento();
                setTiposDocumento(tiposDocumentoToTest);
            } else {
                setTiposDocumento(store.tiposDocumento);
            }
            return () => {}
        }, [])

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
                console.log(formularioTramite)
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
                }});
            }
        }

        useEffect(() => {
            if (dialogTool.response) {
                aliminarTitular(formularioTramite.registroSeleccionado, true);
                updateStore({
                    ...store,
                    dialogTool:{open:false, msg :'',tittle:'', response:false}
                });
            }
            return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dialogTool])

        const [columns, setColumns] = useState([
            { field: 'id', headerName:'ID', hide:true, },
            { field: 'nombre', headerName:'Nombres', flex:0.2, },
            { field: 'apellido', headerName:'Apellidos', flex:0.2, },
            {
                field: 'Habilitar',
                // type: 'actions',
                align:'center',
                width: 70,
                renderCell: ({row}) => [
                    <div style={{display:'flex', alignItems:'center'}}>
                        <GrEdit onClick={()=>{editarTitular(row)}} style={{width:'17px', height:'15px', cursor:'pointer'}}/>
                        <GrFormTrash onClick={()=>{aliminarTitular(row, false)}} style={{width:'24px', height:'22px', cursor:'pointer'}}/>
                    </div>
                ],
            },
        ]);

        useEffect(() => {
            console.log("validando formulario formularioTotalOk");
            let validacion = false;
            if (tipoTramite.value !== '' && motivoSolicitud.value !== '' &&
             tipoSolicitante.value !== '' && razonSolicitud.value !== '' &&
             titularesDeDerecho.length > 0) {
                validacion = true;
            }
            setStateFirsFormTramite({...stateFirsFormTramite, formularioTotalOk: validacion});

            return () => {
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tipoTramite, motivoSolicitud, tipoSolicitante, titularesDeDerecho, razonSolicitud])

    return (
        <div>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">TRÁMITES CATASTRALES</p>
            </div>
            <div style={{margin:'10px 20px'}}>
                <div className="row aife">
                    <FieldSelect
                        label={'Trámite'}
                        value={tipoTramite.value}
                        options={tiposTramites} 
                        handleOnchange={(target)=>handleFormChange(target)}
                        messageValidate={tipoTramite.validation}
                        name={tipoTramite.name}
                    />
                    <AiOutlinePaperClip className="pointer" onClick={()=>openInfoFiles()}/>
                </div>

                <FieldSelect label={'Solicitud'} value={motivoSolicitud.value} options={tipoSolicitud}  styleOwn={{marginTop:'5px'}}
                    handleOnchange={(target)=>handleFormChange(target)} messageValidate={motivoSolicitud.validation} name={motivoSolicitud.name}/>

                <FieldSelect label={'Tipo de solicitante'} value={tipoSolicitante.value} options={tiposSolicitante}  styleOwn={{marginTop:'5px'}}
                    handleOnchange={(target)=>handleFormChange(target)} messageValidate={tipoSolicitante.validation} name={tipoSolicitante.name}/>

            </div>

            <div className="row contenTitulo">
                <div className="decorationTitle bgc2"></div>
                <p className="titulo color2" style={{width:'65%'}}>TITULARES DE DERECHO</p>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>{abrirFormAgregarTitular()}} className="color2 pointer">Agregar titular</p>
                    <img onClick={()=>{abrirFormAgregarTitular()}} className="imgWidth" src={GestiondeUS_CrearUs_Icon} alt="" style={{width:'20px', height:'min-content', alignSelf:'center', cursor:'pointer', margin:'5px 1px 0 5px'}}/>
                </div>
            </div>

            {
                titularesDeDerecho.length < 1
                ? <p className="subTitulo" style={{marginBottom:'10px'}}>Recuerda, se requiere mínimo un titular</p>
                : <div style={{ height: 'auto', width: '100%', }}>
                    <DataGrid
                        columns={columns}
                        rows={titularesDeDerecho}
                        autoHeight
                        density="compact"
                        hideFooter={false}
                        hideFooterSelectedRowCount
                        pageSize={2}
                        scrollbarSize={10}
                        loading={titularesDeDerecho.length <= 0}
                        // rowsPerPageOptions={titularesDeDerecho.length}
                        key={Math.random()}
                    />
                </div>
            }
            

            <div className="row contenTitulo">
                <div className="decorationTitle bgc3"></div>
                <p className="titulo color3">OTROS</p>
            </div>

            <div style={{margin:'10px 20px'}} >
                <div className="fieldTextWidtLabel labels">
                    <p>Razones de la solicitud</p>
                    <textarea onChange={({target})=>{
                        setFormularioTramite({...formularioTramite, razonSolicitud:{...razonSolicitud, value:target.value}})
                    }} className="textArea" name="textarea" rows="10" cols="50" placeholder="Escriba en este campo las razones por las cuales esta generando la solicitud."></textarea>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>{avancePagina(formularioTotalOk, true)}} className={`${formularioTotalOk?'color1 pointer':'grey2'}  `}>Siguiente <span style={{fontWeight:'bold'}}>{'>'}</span> </p>
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
                        <div style={{margin:'10px 20px'}}>
                            <div className="row">
                                <FieldTextWidtLabel value={newTitularDerecho.nombres.value} name="nombres" label={'Nombres'} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, nombres: {...newTitularDerecho.nombres,value}})} messageValidate={newTitularDerecho.nombres.validacion}/>
                                <FieldTextWidtLabel  value={newTitularDerecho.apellidos.value} name="apellidos" label={'Apellidos'} handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, apellidos: {...newTitularDerecho.apellidos,value}})} messageValidate={newTitularDerecho.apellidos.validacion} styleOwn={{marginLeft:'10px'}}/>
                            </div>
                            <div style={{display:'flex', width:'100%'}}>
                                <FieldSelect label={'Tipo de documento'} value={newTitularDerecho.tipoDeDocumento.value} options={tiposDocumento} 
                                handleOnchange={({value})=>setNewTitularDerecho({...newTitularDerecho, tipoDeDocumento: {...newTitularDerecho.tipoDeDocumento, value}})} 
                                messageValidate={newTitularDerecho.tipoDeDocumento.validacion} name={newTitularDerecho.tipoDeDocumento.name} styleOwn={{width:'50%'}}/>
                                
                                <FieldTextWidtLabel name={"numeroDocumento"} value={newTitularDerecho.numeroDeDocumento.value} label={'Numero de documento'} 
                                    handleChange={({value})=>setNewTitularDerecho({...newTitularDerecho, numeroDeDocumento: {...newTitularDerecho.numeroDeDocumento,value}})} 
                                    messageValidate={newTitularDerecho.numeroDeDocumento.validacion} type='number' maxLength={20} styleOwn={{marginLeft:'10px'}}/>

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
        </div>
    )
}

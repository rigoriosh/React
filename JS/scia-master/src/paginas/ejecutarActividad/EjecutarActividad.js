import React, { useEffect, useState } from 'react'
import { IconContext } from "react-icons"
import SweetAlert from 'react-bootstrap-sweetalert'
import { FcSupport, FcOldTimeCamera, FcSearch,FcFullTrash, FcInspection } from "react-icons/fc"
import { colores } from '../../componentes/Actividades/constantes'
import noImg from '../../imagenes/no-photo-available.png'
import { ModalCamera } from '../../componentes/Actividades/ModalCamera'
import { GetEjecutarActividad } from '../../componentes/ConsumirApiRest'

const initState = {
    respuestaGetEjecutarActividad:{
        datatable:[],
        etapatarea:'',
        listadoobjetosestado:[
            {
                activo:false,
                id:'',
                nombre:'',
                visible:true
            }
        ]
    },
    form:{
        TxtFecha: {id:'', nombre:'', activo:false, visible:'', value:''},
        TxtCantidad:{id:'', nombre:'', activo:false, visible:'', value:''},
        TxtObservacion:{id:'', nombre:'', activo:false, visible:'', value:''},
        TxtObsConcepto:{id:'', nombre:'', activo:false, visible:'', value:''},
    },

    openCamera:false,
}

export const EjecutarActividad = (props) => {

    const [stateEjecutarActividad, setStateEjecutarActividad] = useState(initState);
    const {form} = stateEjecutarActividad;
    const {TxtFecha, TxtCantidad, TxtObservacion, TxtObsConcepto} = form;

    const [openCamera, setOpenCamera] = useState(false);
    // const [form, setForm] = useState({});

    const cerrar = () => props.setShowEjecutar(false)
    const handleForm = (target) => {
        const {form} = stateEjecutarActividad;
        setStateEjecutarActividad({...stateEjecutarActividad, form: {...form, [target.name]:{...form[target.name], value:target.value}}});
    }

    const btnSelected = (btnSlected) => {
        console.log(btnSlected)
    }

    const camera = ()=>{
        setOpenCamera(true)
    }
    // Relaliza la petición al back y pasa a renderizar labels y valores de la vista
    const consultaEjecucion = async(idtarea, idreporte) => {
        const response = await GetEjecutarActividad(idtarea, idreporte);
        // setStateEjecutarActividad({...stateEjecutarActividad, respuestaGetEjecutarActividad: response});
        renderizarLabelsValores(response);
    }
    useEffect(() => {
        if (props.showEjecutar) {
            // ejecutar consulta 
            const {arbol, idAbrirActividad} = props;
            const tareaSeleccionada = arbol.filter(e => e.id === idAbrirActividad);
            const {idtarea, idreporte} = tareaSeleccionada[0];
            consultaEjecucion(idtarea, idreporte);
        }
        
        return () => {
            // TODO: limpiar stateEjecutarActividad
        }
    }, [props.showEjecutar])

    // obtiene el valor de los labels para cada elemento del dom
    const getLabel = (id)=> {
        const {respuestaGetEjecutarActividad} = stateEjecutarActividad;
        const {listadoobjetosestado, datatable, etapatarea} = respuestaGetEjecutarActividad;

        if (datatable.length > 0) {
            const data = datatable.filter(e => e.etapatarea === etapatarea)[0];
            const dataById = listadoobjetosestado.filter(e => e.id === id);
    
            if (dataById.length > 0) {
                if (dataById[0].nombre.includes('Datatable')) {
                    const nombre = dataById[0].nombre.split('.')[1];
                    const nombreFromDataTable = data[nombre.toLocaleLowerCase()];
                    return nombreFromDataTable;
                } else {
                    return dataById[0].nombre ? dataById[0].nombre : '';
                }
                
            }
        }
    }

    // Renderiza labels y valores de la vista
    const renderizarLabelsValores = (response) => {
        // renderizar valores form
        const {listadoobjetosestado, datatable, etapatarea} = response;
        const data = datatable.filter(e => e.etapatarea === etapatarea)[0];
        const propForm = Object.keys(form);
        const valuesForm = {};
        propForm.forEach(prop => {
            const tempDato = listadoobjetosestado.filter(e => e.id === prop)[0];
            if (tempDato) {
                if (tempDato.nombre.includes('Datatable')) {
                    const nombre = tempDato.nombre.split('.')[1];
                    const nombreFromDataTable = data[nombre.toLocaleLowerCase()];
                    tempDato.value = nombreFromDataTable;
                } else {
                    tempDato.value = tempDato.nombre ? tempDato.nombre : '';
                }
            }
            valuesForm[prop] = tempDato;
            
        });
        setStateEjecutarActividad({...stateEjecutarActividad, respuestaGetEjecutarActividad: response, form: valuesForm})
        
    }

    const getVisibleActivoElement = (id, propiedad) => {
        const {respuestaGetEjecutarActividad} = stateEjecutarActividad;
        const {listadoobjetosestado} = respuestaGetEjecutarActividad;
        const dataById = listadoobjetosestado.filter(e => e.id === id);

        if (dataById.length > 0) {
            return dataById[0][propiedad];
        }else{
            return true
        }
    }
    return (
        <SweetAlert
            show={props.showEjecutar}
            title={''}
            onConfirm={()=>null}
            showCancel={false}
            showConfirm={false}
            confirmBtnText={"Aceptar"}
            closeOnClickOutside={false}
            showCloseButton={true}>
            <div>
                <div style={{...estilos.fila, borderBottom:'2px #0000002b solid', marginBottom:'5px', paddingBottom:'5px'}}>
                    {
                        getVisibleActivoElement("LblTituloPantalla", "visible") && 
                        <h5 style={{width:'100%', textAlign:'center', color: getVisibleActivoElement("LblTituloPantalla", "activo") ? 'black': 'gray'}} id="LblTituloPantalla">{getLabel("LblTituloPantalla")}</h5>
                    }
                    {
                        getVisibleActivoElement("CmdCerrar", "visible") &&
                        <button onClick={()=>{
                                if(getVisibleActivoElement("CmdCerrar", "activo")) cerrar();
                            }}
                            type="button" className="btn btn-outline-danger btn-sm" id="CmdCerrar" style={{color:getVisibleActivoElement("CmdCerrar", "activo") ? 'black': 'gray'}}>{getLabel("CmdCerrar")}</button>
                    }
                    </div>
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'4em' }}>
                    <div style={{...estilos.fila, justifyContent:'space-around'}}>
                        {
                            getVisibleActivoElement("CmdRecursos", "visible") &&
                            <div style={{textAlign:'center'}}>
                                <FcSupport onClick={()=>{
                                        if(getVisibleActivoElement("CmdRecursos", "activo")) btnSelected('personEquipos')
                                    }} name="Agregar" className="cursor" title='Personal/Equipos' 
                                    style={{
                                        ...estilos.estiloIcono,
                                         cursor: getVisibleActivoElement("CmdRecursos", "activo") ? 'pointer' :'default'}}
                                />
                                <p style={{fontWeight:'600', color:getVisibleActivoElement("CmdRecursos", "activo") ? 'black': 'gray'}}>{getLabel("CmdRecursos")}</p>
                            </div>
                        }
                        {
                            getVisibleActivoElement("CmdVariables", "visible") &&
                            <div style={{textAlign:'center'}}>
                                <FcInspection onClick={()=>{
                                        if(getVisibleActivoElement("CmdVariables", "activo")) btnSelected('variables')
                                    }} 
                                    className="cursor" title='Variables' style={{
                                        ...estilos.estiloIcono,
                                         cursor: getVisibleActivoElement("CmdVariables", "activo") ? 'pointer' :'default'}}
                                />
                                <p style={{
                                    fontWeight:'600',
                                    color:getVisibleActivoElement("CmdVariables", "activo") ? 'black': 'gray',
                                    }}>{getLabel("CmdVariables")}</p>
                            </div>
                        }
                    </div>
                    
                </IconContext.Provider>
                { getVisibleActivoElement("LblDescripcion", "visible") && <h3 id="LblDescripcion" style={{textAlign:'center', color:getVisibleActivoElement("LblDescripcion", "activo") ? 'black': 'gray'}}>
                    {getLabel("LblDescripcion")}</h3> 
                }
                <div style={{...estilos.fila}}>
                    { getVisibleActivoElement("LblProgramacion", "visible") && <p id="LblProgramacion" style={{fontSize:'small', color:getVisibleActivoElement("LblProgramacion", "activo") ? 'black': 'gray'}}>
                        {getLabel("LblProgramacion")}</p>
                    }
                </div>
                <div>
                    { getVisibleActivoElement("LblFecha", "visible") && <p style={{fontWeight:'bold', color:getVisibleActivoElement("LblFecha", "activo") ? 'black': 'gray'}}>
                        {getLabel("LblFecha")}</p> 
                    }
                    <div className="input-group mb-3">
                        { getVisibleActivoElement("TxtFecha", "visible") &&
                            <input onChange={({target})=>handleForm(target)} disabled={!getVisibleActivoElement("TxtFecha", "activo")} name="TxtFecha" type="datetime-local" className="form-control" aria-label="TxtFecha"
                            aria-describedby="basic-addon1" value={TxtFecha.value}/>
                        }
                    </div>
                </div>
                <div>
                    { getVisibleActivoElement("LblCantidad", "visible") && <p id="LblCantidad" style={{fontWeight:'bold', color:getVisibleActivoElement("LblCantidad", "activo") ? 'black': 'gray'}}>
                        {getLabel("LblCantidad")}</p> 
                    }
                    <div className=" mb-3" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <input id="TxtCantidad" style={{marginRight:'5px', width:'60%', display: getVisibleActivoElement("TxtCantidad", "visible") ? 'block' : 'none'}} 
                            onChange={({target})=>handleForm(target)} name="TxtCantidad" type="number" className="form-control"
                            disabled={!getVisibleActivoElement("TxtCantidad", "activo")} placeholder="Ingresa una cantidad" aria-label="TxtCantidad" aria-describedby="basic-addon1" 
                            value={TxtCantidad.value}/>
                        <p id="LblUnidadMedida" 
                            style={{
                                fontWeight:'bold',
                                display: getVisibleActivoElement("LblUnidadMedida", "visible") ? 'block' : 'none',
                                color:getVisibleActivoElement("LblUnidadMedida", "activo") ? 'black': 'gray'}}
                            >
                            {getLabel("LblUnidadMedida")}</p>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'space-around', marginBottom:'15px'}}>
                        <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'3em' }}>
                            <div style={{display:'flex', flexDirection:'column', }}>
                                <FcOldTimeCamera onClick={()=>{
                                    if(getVisibleActivoElement("CmdCapturar", "activo")) camera();
                                    }} className="cursor" title='Capturar foto' style={{
                                        ...estilos.estiloIcono,
                                        cursor: getVisibleActivoElement("CmdCapturar", "activo") ? 'pointer' :'default',
                                        display: getVisibleActivoElement("CmdCapturar", "visible") ? 'block' : 'none'}} />
                                <FcSearch onClick={()=>{
                                    if(getVisibleActivoElement("CmdBuscar", "activo")) btnSelected('search')}
                                    } className="cursor" title='Buscar' style={{
                                        ...estilos.estiloIcono,
                                        cursor: getVisibleActivoElement("CmdBuscar", "activo") ? 'pointer' :'default',
                                        display: getVisibleActivoElement("CmdBuscar", "visible") ? 'block' : 'none'}}/>
                                <FcFullTrash onClick={()=>{
                                    if(getVisibleActivoElement("CmdBorrar", "activo")) btnSelected('trash')
                                    }} className="cursor" title='Eliminar' style={{
                                        ...estilos.estiloIcono,
                                        cursor: getVisibleActivoElement("CmdBorrar", "activo") ? 'pointer' :'default',
                                        display: getVisibleActivoElement("CmdBorrar", "visible") ? 'block' : 'none' }}/>
                            </div>
                        </IconContext.Provider>
                        <img src={form.foto ? form.foto : noImg} alt="./assets/" style={{width:'280px', borderRadius:'20px'}}/>
                </div>
                <div id="btnsGroup1" style={{display:'flex', justifyContent:'space-around', marginBottom:'10px', textAlign:'center', width:'100%'}}>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdInicio", "activo")) btnSelected('Inicio')
                        }} style={{
                            ...estilos.botonEjeAct,
                            color:getVisibleActivoElement("CmdInicio", "activo") ? 'white': 'gray',
                            display: getVisibleActivoElement("CmdInicio", "visible") ? 'block' : 'none',
                            cursor: getVisibleActivoElement("CmdInicio", "activo") ? 'pointer' :'default'}}>
                                {getLabel("CmdInicio")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdEjecucion", "activo")) btnSelected('Ejecucion')
                        }} style={{
                            ...estilos.botonEjeAct,
                            color:getVisibleActivoElement("CmdEjecucion", "activo") ? 'white': 'gray',
                            display: getVisibleActivoElement("CmdEjecucion", "visible") ? 'block' : 'none',
                            cursor: getVisibleActivoElement("CmdEjecucion", "activo") ? 'pointer' :'default'}}>
                                {getLabel("CmdEjecucion")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdFin", "activo")) btnSelected('Fin')
                        }} style={{
                            ...estilos.botonEjeAct,
                            color:getVisibleActivoElement("CmdFin", "activo") ? 'white': 'gray', width:'50px',
                            display: getVisibleActivoElement("CmdFin", "visible") ? 'block' : 'none',
                            cursor: getVisibleActivoElement("CmdFin", "activo") ? 'pointer' :'default'}}>
                                {getLabel("CmdFin")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdRelevante", "activo")) btnSelected('Relevante')
                        }} style={{
                            ...estilos.botonEjeAct,
                            color:getVisibleActivoElement("CmdRelevante", "activo") ? 'white': 'gray',
                            display: getVisibleActivoElement("CmdRelevante", "visible") ? 'block' : 'none',
                            cursor: getVisibleActivoElement("CmdRelevante", "activo") ? 'pointer' :'default'}}>
                                {getLabel("CmdRelevante")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdAmarillado", "activo")) btnSelected('Amarillado')
                        }} style={{
                            ...estilos.botonEjeAct,
                            color:getVisibleActivoElement("CmdAmarillado", "activo") ? 'white': 'gray',
                            display: getVisibleActivoElement("CmdAmarillado", "visible") ? 'block' : 'none',
                            cursor: getVisibleActivoElement("CmdAmarillado", "activo") ? 'pointer' :'default'}}>
                                {getLabel("CmdAmarillado")}
                    </button>
                </div>
                <div style={{marginBottom:'10px', textAlign:'center', width:'100%'}}>
                    <textarea onChange={({target})=>handleForm(target)} name="TxtObservacion" className="form-control" value={TxtObservacion.value ? TxtObservacion.value : ''}
                    disabled={!getVisibleActivoElement("TxtObservacion", "activo")} aria-label="With textarea" placeholder="Observaciones en la ejecución de la actividad" 
                        style={{height: "100px", display: getVisibleActivoElement("TxtObservacion", "visible") ? 'block' : 'none'}} />
                        
                    <textarea onChange={({target})=>handleForm(target)} name="TxtObsConcepto" className="form-control"
                    disabled={!getVisibleActivoElement("TxtObsConcepto", "activo")} aria-label="With textarea" placeholder="Observaciones en la confirmación o rechazo de la actividad" 
                    style={{height: "100px", marginTop:'10px', display: getVisibleActivoElement("TxtObsConcepto", "visible") ? 'block' : 'none'}} value={TxtObsConcepto.value ? TxtObsConcepto.value : ''}/>
                </div>
                <div id="btnsGroup2" style={{display:'flex', justifyContent:'space-around', marginBottom:'10px', textAlign:'center', width:'100%'}}>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdTerminar", "activo")) btnSelected('Terminar')
                        }}  style={{
                            ...estilos.botonEjeAct,
                             color:getVisibleActivoElement("CmdTerminar", "activo") ? 'white': 'gray',
                             display: getVisibleActivoElement("CmdTerminar", "visible") ? 'block' : 'none',
                             cursor: getVisibleActivoElement("CmdTerminar", "activo") ? 'pointer' :'default'}}>
                                 {getLabel("CmdTerminar")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdConfirmar", "activo")) btnSelected('Confirmar')
                        }} style={{
                            ...estilos.botonEjeAct,
                             color:getVisibleActivoElement("CmdConfirmar","activo") ? 'white': 'gray',
                             display: getVisibleActivoElement("CmdConfirmar", "visible") ? 'block' : 'none',
                             cursor: getVisibleActivoElement("CmdConfirmar", "activo") ? 'pointer' :'default'}}>
                                 {getLabel("CmdConfirmar")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdRechazar", "activo")) btnSelected('Rechazar')
                        }}  style={{
                            ...estilos.botonEjeAct,
                             color:getVisibleActivoElement("CmdRechazar", "activo") ? 'white': 'gray',
                             display: getVisibleActivoElement("CmdRechazar", "visible") ? 'block' : 'none',
                             cursor: getVisibleActivoElement("CmdRechazar", "activo") ? 'pointer' :'default'}}>
                                 {getLabel("CmdRechazar")}
                    </button>
                    <button onClick={()=>{
                        if(getVisibleActivoElement("CmdAprobar", "activo")) btnSelected('Aprobar')
                        }}   style={{
                            ...estilos.botonEjeAct,
                             color:getVisibleActivoElement("CmdAprobar", "activo") ? 'white': 'gray',
                             display: getVisibleActivoElement("CmdAprobar", "visible") ? 'block' : 'none',
                             cursor: getVisibleActivoElement("CmdAprobar", "activo") ? 'pointer' :'default'}}>
                                 {getLabel("CmdAprobar")}
                    </button>
                </div>

                <ModalCamera openModal={openCamera} setOpenModal={setOpenCamera} btnSelected={btnSelected} handleForm={handleForm}/>
            </div>
        </SweetAlert>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px', marginTop:'5px'},
    botonEjeAct:{
        borderRadius: '10px',
        padding:'10px 5px',
        backgroundColor: colores.primario,
        color:'white',
        fontWeight:'bold',
        fontSize:'15px',
        marginLeft:'2px',
        border:'blue'
    },
    estiloIcono: {marginLeft:'0px', marginRight:'0px',}
}
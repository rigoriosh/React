import React, {useEffect, useState} from 'react'
import { useTable,usePagination, useSortBy } from 'react-table'
import { FaEdit, FaFileExcel, FaSignOutAlt, FaUserSecret, FaLock, FaCalendar} from 'react-icons/fa'
import {Table} from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import '../componentes/estilos/maestras.css'
import {GetDatosMaestra} from '../componentes/ConsumirApiRest'
import Cargando from '../componentes/Cargar'

import EditableCell from '../componentes/Maestras/editableCell'
import {AgregarRegistro} from '../componentes/Maestras/agregarRegistro'
import {GuardarMaestra, EliminarMaestra} from '../componentes/ConsumirApiRest'

import {NoInternet} from '../componentes/controlErrores'
import {CambiarImagen, getBase64Image} from '../componentes/cambiarImagen.js'


const getEquivalenteCampoSelect = (id,nombre) =>{
    let apiMaestra = JSON.parse(window.localStorage.getItem('tablaMaestra'))
    for (let i = 0; i < apiMaestra.objetosDataColumn.length; i++) {
        let itemLista = apiMaestra.objetosDataColumn[i]
        if(id===itemLista.id && nombre===itemLista.nombre.toLowerCase()) {
            return itemLista.descripcion
        }
    }
    return null
}

export default function TablaMaestras(props) {

    const [cambiarImagen,setCambiarImagen] = useState({show:false, idImagenCambiar:null, nombre: null})
    const [skipPageReset, setSkipPageReset] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const [dataOriginal,setDataOriginal] = useState([])
    const [perfil,setPerfil] = useState(false)
    const [auditoria,setAuditoria] = useState(false)
    const [cronograma,setCronograma] = useState(false)
    const [columns, setColumns] = useState([])
    const [cargando, setCargando] = useState(true)
    const [titulo, setTitulo] = useState(props.configuracion.pantalla)
    const [tituloAntes, setTituloAntes] = useState(null)
    const [popupInternet,setPopupInternet] = useState(false)
    const [callUseEfect, setCallUseEfect] = useState(false)
    const [nuevoRegistro, setNuevoRegistro] = useState(null)
    const [registroPreModificacion, setRegistroPreModificacion] = useState(null)
    const [crudEjecutadoBien, setCrudEjecutadoBien] = useState({accion:'', 
                                                                titulo:'', 
                                                                mensaje: '',
                                                                btnCancelar: false, 
                                                                mostrar: false,
                                                                tipoMensaje: '',
                                                                rowId: null    
                                                            })
    const [estadoBotones, setEstadoBotones] = useState({CmdNuevo: {visible:true,activo:true}, 
                                                        CmdModificar: {visible:true,activo:true},  
                                                        CmdEliminar: {visible:true,activo:true}, 
                                                        CmdGuardar: {visible:true,activo:true}, 
                                                        CmdCancelar: {visible:true,activo:true},  
                                                        CmdExportar: {visible:true,activo:true}, 
                                                        CmdCerrar: {visible:true,activo:true}, 
                                                        CmdCronograma: {visible:true,activo:true},  
                                                        CmdCambiarClave: {visible:true,activo:true}, 
                                                        CmdAuditoria: {visible:true,activo:true}})


    //Activa y guarda datos de modo offline
    const onCambiarOffline = (estado, error) =>{
        let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
        if(!sinInternet.modeOffline){
            setPopupInternet(estado)
        }
    }
    
    useEffect(()=>{
        setNuevoRegistro(null)
        setRegistroPreModificacion(null)
        setDataOriginal([])
        setCambiarImagen({show:false, idImagenCambiar:null, nombre: null})

        const dato = async ()=>{
            setCargando(true)
            let offline = JSON.parse(window.localStorage.getItem('offline'))
            let tablaMaestra = JSON.parse(window.localStorage.getItem('tablaMaestra'))

            let apiMaestra = await GetDatosMaestra(props, onCambiarOffline)
                                .then((datos)=>{ return datos })

            if(apiMaestra!==false){
                setTituloAntes(props.configuracion.pantalla)
            }
            props.setPantalla({...props.pantalla, btnOnOffLine: offline.modeOffline})

            if(apiMaestra===false && offline.modeOffline){
                setTitulo(tituloAntes+'(OffLine)')
                apiMaestra = tablaMaestra
            }else{
                setTitulo(props.configuracion.pantalla)
            }

            
            if(apiMaestra!==false&&apiMaestra!==null){

                let elementoVisible = {}
                for (let i = 0; i < apiMaestra.listadoObjetosEstado.length; i++) {
                    const btn = apiMaestra.listadoObjetosEstado[i]
                    elementoVisible[btn.id] = { visible: btn.visible, activo: btn.activo}
                }
                setEstadoBotones({
                    ...elementoVisible
                })
                
                window.localStorage.setItem('tablaMaestra', JSON.stringify(apiMaestra))

                let encabezado = []
                apiMaestra.objetosDataColumnName.forEach(info => {
                    if(info.visible)
                        encabezado.push({nombreMostrar: info.nombreMostrar, id: info.nombre})
                });

                let columnas = []
                for (let i = 0; i < encabezado.length; i++) {
                    if(encabezado[i].id.toLowerCase()!=='id')
                    columnas[i] =  { Header: encabezado[i].nombreMostrar, accessor: encabezado[i].id.toLowerCase()}
                }
                //Para agregar los botones de cada registro (Guardar, eliminar, modificar,etc..)
                columnas.push({Header: 'Acciones', accessor: 'acciones'})

                let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
                
                let datos =    
                    apiMaestra.datatable.map(function(objeto,index) {
                        let value = {}
                        apiMaestra.objetosDataColumnName.forEach(info => {
                            const etiqueta = info.nombre
                            switch (info.tipoCampo) {
                                case 'bool':
                                    value[etiqueta.toLowerCase()] =  {tipo: info.tipoCampo, valor: objeto[etiqueta], editable: false}
                                    break;
                                case 'guid':
                                    if( etiqueta!=='id'){
                                        let defaultValue = null
                                        for (let i = 0; i < apiMaestra.objetosDataColumn.length; i++) {
                                            let itemLista = apiMaestra.objetosDataColumn[i]
                                            if(etiqueta===itemLista.nombre){
                                                if(itemLista.id===objeto[etiqueta] && itemLista.id!==null){
                                                    defaultValue = itemLista.descripcion
                                                }
                                            }
                                        }
                                        value[etiqueta.toLowerCase()] = defaultValue
                                    }else{
                                        value[etiqueta.toLowerCase()] = objeto[etiqueta]
                                    }
                                    break;
                                case 'link':
                                    value[etiqueta.toLowerCase()] = {tipo: info.tipoCampo, valor: objeto[etiqueta], editable: false}
                                    break;
                                default:
                                    if(etiqueta==='fechavigencia'){
                                        value[etiqueta.toLowerCase()] = objeto['fechaVigencia']
                                    }else
                                    value[etiqueta.toLowerCase()] = objeto[etiqueta]
                                    break;
                            }
                        });

                        value['acciones'] =  {tipo:'boton', cancelar: false, eliminar: true, guardar: false, modificar: true, disabled: sinInternet.modeOffline}
                        return value
                    }) 
                
                setError(null)
                setData(datos)
                setColumns(columnas)
                setCargando(false)
            }else{
                setError('No existen datos en el dispositivo asociados con la maestra ')
                setData([])
                setColumns([])
                setCargando(false)
            }
        }
        dato()
    },[props.nuevallamada, callUseEfect])


    const defaultColumn = {
        Cell: EditableCell,
    }

    //Crud llamado por updateMyData
    const guardar = (rowIndex) =>{
        setCargando(true)
                
        const registro = {}
        async function guardarRegistro(){
            Object.keys(data[rowIndex]).forEach((regis,i) => {
                if(regis!=='id'&&regis!=='acciones'){
                    const campo = data[rowIndex][regis]
                    if(typeof campo === 'object' && campo !== null){
                        if(campo.tipo === 'guid'){
                            registro[regis] = (campo.valor==='Seleccionar')?null: campo.valor
                        }else if(campo.tipo === 'bool'){
                            registro[regis] = campo.activo
                        }else if(campo.tipo === 'string'||
                        campo.tipo==='email'||campo.tipo==='date'){
                            registro[regis] = campo.valor
                        }
                    }else{
                        registro[regis] = campo
                    }
                }
            });
            
            let datosImagen = null
            if(cambiarImagen.idImagenCambiar!==null){
                let preview = document.getElementById(cambiarImagen.idImagenCambiar)
                let tieneImagen = cambiarImagen.nombre!==null? getBase64Image(preview):""
                datosImagen = {pantalla: props.configuracion.pantalla,
                                id: null,
                                filename: cambiarImagen.nombre||'.',
                                data64File: tieneImagen}
            }
            const resultado = await GuardarMaestra(registro, onCambiarOffline, setCrudEjecutadoBien, props.configuracion.microServicio,datosImagen)

            if(resultado){
                setCrudEjecutadoBien({accion:'guardar', 
                                        titulo:'Confirmación', 
                                        mensaje: 'Se guardó con éxito',
                                        btnCancelar: false, 
                                        mostrar: true, 
                                        tipoMensaje: 'success', 
                                        rowId:rowIndex})
                let registroNuevo = data
                registroNuevo = registroNuevo[rowIndex]
                let opciones = {tipo:'boton', cancelar: false, eliminar: true, guardar: false, modificar: true}
                registroNuevo['acciones'] =  opciones
                

                let arrayDatos = Object.keys(registroNuevo)
                for (let i = 0; i < arrayDatos.length; i++) {
                    let nombreCampo = arrayDatos[i]
                    if(registroNuevo[nombreCampo].tipo==='string'){
                        registroNuevo[nombreCampo] = registroNuevo[nombreCampo].valor
                    }else if(registroNuevo[nombreCampo].tipo==='bool'){
                        let valorSelect = registroNuevo[nombreCampo].valor
                        registroNuevo[nombreCampo] = {tipo: "bool", valor: valorSelect, editable: false}
                    }else if(registroNuevo[nombreCampo].tipo==='guid'){
                        let idSelect = registroNuevo[nombreCampo].valor 
                        registroNuevo[nombreCampo] = getEquivalenteCampoSelect(idSelect,nombreCampo)
                    }
                }     

                setData((state, props) => (
                    state.map((row,id)=>{
                            if(id===rowIndex){
                            return registroNuevo
                            }
                        return row
                    })
                ));
            }
            setCargando(false)
        }
        guardarRegistro()
    }

    const eliminarRegistro = (rowIndex) =>{
        setCargando(true)

        let valor = data.filter((element)=>element===data[rowIndex])
        const ejeuctarAsincrono = async () =>{
            let datos = {
                id:valor[0].id,
                codigo:valor[0].codigo,
                nombre:valor[0].nombre
            }

            const resultado =  
            await EliminarMaestra(datos, onCambiarOffline, setCrudEjecutadoBien, props.configuracion.microServicio)
            if(resultado){
                setData((state,props)=> state.filter((element,index) => index !== rowIndex) )
                setCargando(false)
                setTimeout(function(){
                    setCrudEjecutadoBien({accion:'', 
                                        titulo:'Confirmación', 
                                        mensaje: 'Registro Eliminado',
                                        btnCancelar: false, 
                                        mostrar: true, 
                                        tipoMensaje:'success',
                                        rowId: null})
                },100)
            }
            setCargando(false)
        }
        ejeuctarAsincrono()
    }

    const guardarModificacion = (rowIndex) =>{
        setCargando(true)
        let contenidoActual = data.filter((element)=>element===data[rowIndex])
        let union = {}
        Object.keys(registroPreModificacion).map(key=>{
            if(key!=='acciones'){
                let celda = contenidoActual[0][key]
                if(celda!==undefined)
                switch (celda.tipo) {
                    case 'guid':
                        union[key] = (celda.valor==='Seleccionar')?null: celda.valor
                        break;
                    case 'bool':
                        union[key] = celda.activo
                        break;
                    case 'date':
                        union[key] = celda.valor
                        break;
                    case 'string':
                        union[key] = celda.valor
                        break;
                    case 'email':
                        union[key] = celda.valor
                        break;
                    case 'link':
                        break;
                    default:
                        union[key] = celda
                        break;
                }
            }
            return ''
        })
        
        union['id'] = registroPreModificacion['id']
        
        let datosImagen = null
        if(cambiarImagen.idImagenCambiar!==null){
            let preview = document.getElementById(cambiarImagen.idImagenCambiar)
            let tieneImagen = cambiarImagen.nombre!==null? getBase64Image(preview):""
            datosImagen = {pantalla: props.configuracion.pantalla,
                            id: registroPreModificacion['id'],
                            filename: cambiarImagen.nombre||'.',
                            data64File: tieneImagen}
        }
        const ejeuctarAsincrono = async () =>{
            const resultado = await GuardarMaestra(union, onCambiarOffline, setCrudEjecutadoBien, props.configuracion.microServicio,datosImagen)
            if(resultado){
                setData((state,props)=> state.filter((element,index) => index !== rowIndex) )
                setCargando(false)
                setTimeout(function(){
                    setCrudEjecutadoBien({accion:'', 
                                        titulo:'Confirmación', 
                                        mensaje: 'Se guardo con exito',
                                        btnCancelar: false, 
                                        mostrar: true, 
                                        tipoMensaje:'success',
                                        rowId: null})
                },100)
            }
            setCargando(false)
        }
        ejeuctarAsincrono()
    }

    //Fin Crud
    const modificar = (rowIndex) =>{
        if(registroPreModificacion===null){
            setCargando(true)
            let contenidoActual = data.filter((element)=>element===data[rowIndex])

            const apiMaestra =  JSON.parse(window.localStorage.getItem('tablaMaestra'))
            let registro = {}
            let campos = apiMaestra.objetosDataColumnName
            for (let i = 0; i < campos.length; i++){
                
                let campo = campos[i]
                let nombreCampo = campo.nombre.toLowerCase()
                let valorCelda = contenidoActual[0][nombreCampo]

                switch (campo.tipoCampo) {
                    case 'string':
                        registro[nombreCampo] = {tipo:campo.tipoCampo, valor:valorCelda, editable: true}
                        break;
                    case 'bool':
                        valorCelda = (valorCelda===undefined)?false:valorCelda.valor
                        registro[nombreCampo] =  {tipo:campo.tipoCampo, valor:valorCelda, editable: true, activo: valorCelda}
                        break;
                    case 'guid':
                        if(campo.nombre==='id'){
                            registro[nombreCampo] = valorCelda
                        }else{
                            let opciones = []
                            let idsOpcion = []
                            for (let i = 0; i < apiMaestra.objetosDataColumn.length; i++) {
                                if(nombreCampo===apiMaestra.objetosDataColumn[i].nombre.toLowerCase()){
                                    opciones.push(apiMaestra.objetosDataColumn[i].descripcion)
                                    idsOpcion.push(apiMaestra.objetosDataColumn[i].id)
                                    if(valorCelda===apiMaestra.objetosDataColumn[i].descripcion){
                                        valorCelda = apiMaestra.objetosDataColumn[i].id
                                    }
                                }
                            }
                            valorCelda = (valorCelda===null)?'Seleccionar':valorCelda
                            registro[nombreCampo] =  {tipo:campo.tipoCampo, valor:valorCelda, editable: true, opciones: opciones, idsOpcion: idsOpcion}
                        }
                        break;
                    case 'date':
                        registro[nombreCampo] = {tipo:campo.tipoCampo, valor:valorCelda, editable: true}
                        break;
                    case 'email':
                        registro[nombreCampo] = {tipo:campo.tipoCampo, valor:valorCelda, editable: true}
                        break;
                    case 'link':
                        registro[nombreCampo] = {tipo:campo.tipoCampo, valor:valorCelda.valor, editable: true}
                        break;
                    default:
                        break;
                }
            }

            registro['acciones'] = {tipo:'boton', cancelar: false, eliminar: false, guardar: false, modificar: false, cancelarEdicion:true, guardarEdicion:true}

            setData((state,props)=> state.map((row,index)=>{
                if(index===rowIndex){
                    setRegistroPreModificacion(row)
                    return registro
                }
                return row
            }))
            setCargando(false)

            setTimeout(() => {
                document.getElementById(rowIndex).focus()
            }, 100)
        }
    }


    const cancelarNuevoRegistro = (rowIndex) =>{
        setCargando(true)
        setNuevoRegistro(null)
        setData((state,props)=>
            state.filter((element,index) => index !== rowIndex)
        )
        setCargando(false)
    }

    const updateMyData = (rowIndex, columnId, value, accion) => {
        setSkipPageReset(true)

        switch (accion) {
            case 'guardar':
                guardar(rowIndex)
                break;
            case 'modificar':
                modificar(rowIndex)
                break;
            case 'eliminarRegistro':
                setCrudEjecutadoBien({accion:'eliminar', 
                                  titulo:'Confirmación', 
                                  mensaje: '¿Esta seguro que desea eliminar el registro?',
                                  btnCancelar: true, 
                                  mostrar: true,
                                  tipoMensaje:'warning',
                                  rowId: rowIndex})
                break;
            case 'cancelarNuevoRegistro':
                cancelarNuevoRegistro(rowIndex)
                break;
            case 'cancelarModificacion':
                setData(old=>old.map((row, index) => { 
                    return (index === rowIndex)?registroPreModificacion:row
                }))
                setRegistroPreModificacion(null)
                break;
            case 'guardarModificacion':
                guardarModificacion(rowIndex)
                break;
            case 'cambiarImagen':
                setCambiarImagen({...cambiarImagen, show:true, idImagenCambiar:columnId})
                break;
            default:
                setData(old=>old.map((row, index) => { 
                        return (index === rowIndex)?{ ...old[rowIndex], [columnId]: value }:row
                    }))
        }
        
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: columns,
            data: data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
            disableMultiSort: false
        },
        useSortBy,
        usePagination)

    const onConfirmGuardar = (e) => {
        setCallUseEfect(callUseEfect?false:true)
        setCrudEjecutadoBien({accion:'', titulo:'', mensaje: '',btnCancelar: false, mostrar: false, tipoMensaje: '', rowId: null})
    }

    const onConfirmErrorGuardar = (e) =>{
        if(crudEjecutadoBien.accion==='eliminar'){
            eliminarRegistro(crudEjecutadoBien.rowId)
        }
        setCrudEjecutadoBien({accion:'', titulo:'', mensaje: '',btnCancelar: false, mostrar: false, tipoMensaje: '', rowId: null})
    }

    const onCancelar = () => {
        setCrudEjecutadoBien({accion:'', titulo:'', mensaje: '',btnCancelar: false, mostrar: false, tipoMensaje: '', rowId: null})
    }

    const onAgregarRegistro = () => {
        if(nuevoRegistro===null){
            setNuevoRegistro(AgregarRegistro({data,columns,setSkipPageReset,setData,updateMyData}))
            setTimeout(() => {
                document.getElementById(data.length-1).focus()
            }, 100)
        }else{
            document.getElementById(data.length-1).focus()
        }
    }

    const onCerrarMaestra = () => {
        setCargando(true)
        setTimeout(() =>{
            props.setPantalla(antes=>{
                return {...antes,
                        maestras: {activa: false, configuracion: null, nuevallamada: false}, 
                        principal:{activa: true}}
            })
            setCargando(false)
        },200)
    }

    const onConfirmSinConexion = () => {
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: true}))
        setPopupInternet(false)
        setError(null)
        setCallUseEfect(callUseEfect?false:true)
    }

    const onCancelSinConexion = () =>{
        window.localStorage.setItem('offline', JSON.stringify({modeOffline: false}))
        setPopupInternet(false)
        setError('No existen datos en el dispositivo asociados con la maestra ')
    }

    const onLimpiarFiltros = () =>{
        if(dataOriginal.length!==0){
            setData(old=>{return dataOriginal})
            setDataOriginal(old=>{return []})
        }
        for (let i = 1; i < columns.length; i++) {
            const nombreColumn = columns[i].Header
            document.getElementById(nombreColumn).value = ''
        }
    }

    const onCambiarFiltro = () =>{
        setSkipPageReset(true)

        if(dataOriginal.length===0){
                setDataOriginal(old=>{return data})
        }else{
            setData(old=>{return dataOriginal})
        }

        let filtros = []
        for (let i = 0; i < columns.length; i++) {
            let filtro = document.getElementById(columns[i].Header).value
            if(filtro!=='')
                filtros.push({campo:columns[i].accessor, valor: filtro})
        }

        setData(old=>old.filter((row, index) => { 
            let contTrue = 0
            for (let i = 0; i < filtros.length; i++) {
                 if(typeof row[filtros[i].campo] !== 'object' && row[filtros[i].campo].indexOf(filtros[i].valor)!==-1){
                    contTrue++
                 }
            }
            if(contTrue===filtros.length){
                return true
            }else{
                return false
            }
        }))
    }

    const onAuditoria = () => setAuditoria(true)
    const onPerfil = () => setPerfil(true)
    const onCronograma = () => setCronograma(true)

    const onBtnAceptar = () => {
        setAuditoria(false)
        setPerfil(false)
        setCronograma(false)
    }

    if(cargando)
        return <Cargando />

    if(popupInternet)
        return <NoInternet
                    show={popupInternet}
                    title={'¡Sin conexión de Internet!'}
                    onConfirm={()=>onConfirmSinConexion}
                    onCancel={()=>onCancelSinConexion}
                    mensaje={'¿Desea activar el modo offline?'}/>

    if(error!==null)
        return <div>
                    <div className="panel panel-default">
                        <div className="panel-heading text-center border"><b>Tabla maestra - {titulo}</b></div>
                        <div className="panel-body border">
                            <div className="alert alert-danger text-center m-2 "> {error}{titulo}</div>
                        </div>
                    </div>
                </div>

    return (
        <div>
            <CambiarImagen cambiarImagen={cambiarImagen} setCambiarImagen={setCambiarImagen}/>
            <div className="panel panel-default">
                <div className="panel-heading text-center border"><b>Tabla maestra - {titulo}</b></div>
                <div className="panel-body border">
                    {estadoBotones.CmdNuevo.visible && <button className="btn btn-light botonesSuperior" 
                                                                    onClick={()=>onAgregarRegistro()}
                                                                    disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline}>
                                                                <span><FaEdit className="tamanoImg"/>
                                                                    <p className="tamanoLetraImg">Nuevo</p>
                                                                </span> 
                                                        </button>}
                    {estadoBotones.CmdExportar.visible && 
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            className="btn btn-light botonesSuperior"
                            buttonText={<span><FaFileExcel className="tamanoImg"/>
                                                <p className="tamanoLetraImg">Exportar</p>
                                        </span>}/>
                    }
                    {estadoBotones.CmdCerrar.visible && <button className="btn btn-light botonesSuperior"
                                                                    onClick={()=>onCerrarMaestra()}>
                                                                <span><FaSignOutAlt className="tamanoImg"/>
                                                                    <p className="tamanoLetraImg">Cerrar</p>
                                                                </span>
                                                        </button>}
                    {estadoBotones.CmdAuditoria.visible && <button className="btn btn-light botonesSuperior" disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} onClick={() => onAuditoria()}><span><FaUserSecret className="tamanoImg" /><p className="tamanoLetraImg">Auditoria</p></span></button>}
                    {estadoBotones.CmdCambiarClave.visible && <button className="btn btn-light botonesSuperior" disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} onClick={() => onPerfil()}><span><FaLock className="tamanoImg" /><p className="tamanoLetraImg">Cambiar Clave</p></span></button>}
                    {estadoBotones.CmdCronograma.visible && <button className="btn btn-light botonesSuperior" disabled={JSON.parse(window.localStorage.getItem('offline')).modeOffline} onClick={() => onCronograma()}><span><FaCalendar className="tamanoImg" /><p className="tamanoLetraImg">Cronograma</p></span></button>}
                </div>
            </div>
            <div style={{overflowX: 'scroll'}}>
                <button type="button" onClick={() => onLimpiarFiltros()} className="btn btn-link btn-sm">Limpiar filtros</button>
                <Table id="table-to-xls" {...getTableProps()} striped bordered hover  style={{ border: 'solid 1px black' }} >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="text-center m-0 p-1 b-0" {...column.getHeaderProps()}>
                                    <input id={column.render('Header')} style={{width: '100%', height: '20px'}} onChange={onCambiarFiltro}/>
                                </th>
                            ))}
                            </tr>
                        ))} 
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="text-center colorTexto th" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                    </span>
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                return <td className="text-center colorTexto td" {...cell.getCellProps()}>
                                    {cell.render('Cell')}</td>
                                })}
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}> {'<'} </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}> {'>'} </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
                Pagina <strong> {pageIndex + 1} of {pageOptions.length} </strong>
            </div>
            

            <SweetAlert
                    show={crudEjecutadoBien.mostrar && crudEjecutadoBien.tipoMensaje==='success'}
                    success
                    title={crudEjecutadoBien.titulo}
                    onConfirm={()=>onConfirmGuardar()}
                    showCancel={crudEjecutadoBien.btnCancelar}
                    confirmBtnText={"Aceptar"}
                    closeOnClickOutside={false}
                    showCloseButton={true}>
                        <p>{crudEjecutadoBien.mensaje}</p>
                </SweetAlert>

            <SweetAlert
                    show={crudEjecutadoBien.mostrar && crudEjecutadoBien.tipoMensaje==='warning'}
                    warning
                    title={crudEjecutadoBien.titulo}
                    onConfirm={()=>onConfirmErrorGuardar()}
                    onCancel={()=>onCancelar()}
                    showCancel={crudEjecutadoBien.btnCancelar}
                    confirmBtnText={"Aceptar"}
                    closeOnClickOutside={false}
                    showCloseButton={true}>
                        <p>{crudEjecutadoBien.mensaje}</p>
                </SweetAlert>

            <SweetAlert
                show={auditoria}
                title={'Auditoria'}
                onConfirm={()=>onBtnAceptar()}
                showCancel={false}
                confirmBtnText={"Aceptar"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <p></p>
                </SweetAlert>

            <SweetAlert
                show={perfil}
                title={'Cambiar Clave'}
                onConfirm={()=>onBtnAceptar()}
                showCancel={false}
                confirmBtnText={"Aceptar"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <p></p>
                </SweetAlert>
            
            <SweetAlert
                show={cronograma}
                title={'Cronograma'}
                onConfirm={()=>onBtnAceptar()}
                showCancel={false}
                confirmBtnText={"Aceptar"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <p></p>
                </SweetAlert>
        </div>
    )
}
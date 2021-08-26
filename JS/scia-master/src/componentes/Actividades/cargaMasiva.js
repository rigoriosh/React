import React from 'react'
import {useState,useEffect} from 'react'
import XLSX from 'xlsx'
import SweetAlert from 'react-bootstrap-sweetalert'
import {FaUpload, FaSearch} from 'react-icons/fa'
import {GetDatosMaestra,GuardarCargaMasiva} from '../../componentes/ConsumirApiRest'
import '../../componentes/estilos/cargaMasiva.css'
import Cargando from '../../componentes/Cargar'


export default function CargaMasiva(props){
    
    const [datosCargaMasiva, setDatosCargaMasiva] = useState(null)
    const [listaCombos,setListaCombos] = useState([])
    const [confirmCargar,setConfirmCargar] = useState({show: false, mensaje:null})
    const [cargando, setCargando] = useState(false)
    const [selectCombos, setSelectCombos] = useState({proyecto:'Seleccionar',especialidad:'Seleccionar'})
    const [crudEjecutadoBien, setCrudEjecutadoBien] = useState({titulo:'', 
                                                                mensaje: '',
                                                                mostrar: false,
                                                                tipoMensaje: ''
                                                            })

    useEffect(() => {
        const obtieneDatos = async ()=>{
            if(props.cargaMasiva.show){
                document.getElementById('btnCargar').disabled = true
                document.getElementById('btnBuscar').disabled = true
                let apiActividades = await GetDatosMaestra(props.cargaMasiva, ()=>console.log).then((datos)=>{ return datos })
                setListaCombos(apiActividades.objetosDataColumn)
            }
            
        }
        obtieneDatos()
    },[props.cargaMasiva.show])

    const onCerrar = () =>{
        props.setCargaMasiva({
           ...props.cargaMasiva,
           show: false
       })
    }

    const deSerialAFecha = (serial) =>{
        let utc_days  = Math.floor(serial - 25569);
        let utc_value = utc_days * 86400;                                        
        let date_info = new Date(utc_value * 1000);
        return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate()+1);
    }

    const onExcel = (event) =>{
        let archivo = event.target.files[0]
        if(archivo.name.includes('.xls')){
            let reader = new FileReader()
            reader.readAsArrayBuffer(archivo)
            document.getElementById('nombreArchivo').innerHTML = 'Archivo: '+archivo.name
            reader.onloadend = (e) =>{
                
                let data =new Uint8Array(e.target.result)
                let libro = XLSX.read(data,{type: 'array'})
                let hoja = libro.SheetNames[0]
                let datos = XLSX.utils.sheet_to_json(libro.Sheets[hoja])
                let uno = 0
                datos.forEach((fila,idFila)=>{
                        for (const col in fila) {
                            const nombreColumna = col.replaceAll("_","")
                            datos[idFila][nombreColumna] = datos[idFila][col]
                            delete datos[idFila][col]

                            if(nombreColumna==='startdate'||nombreColumna==='enddate'){
                                let fecha =  deSerialAFecha(datos[idFila][nombreColumna])
                                let ano = fecha.getFullYear()
                                let mes = fecha.getMonth()
                                let dia = fecha.getDate()
                                datos[idFila][nombreColumna] = `${dia}-${mes+1}-${ano}`
                            }
                        }
                })
                
                if(datos.length!==0 && datos[0]['taskcode']==='Activity ID'){
                    datos = datos.slice(1)
                }
                document.getElementById('btnCargar').disabled = false
                const nameProyecto = document.getElementById('idProyecto').selectedOptions[0].innerHTML
                const nameEspecialidad = document.getElementById('idEspecialidad').selectedOptions[0].innerHTML

                const mensaje = `Esta seguro que desea realizar la carga masiva de actividades 3W 
                                 desde el archivo de Excel ${archivo.name}, al proyecto ${nameProyecto} 
                                 en la especialidad ${nameEspecialidad}?`
                setConfirmCargar({...confirmCargar, mensaje: mensaje})
                setDatosCargaMasiva(datos)
            }
        }else{
            setDatosCargaMasiva(null)
            document.getElementById('nombreArchivo').innerHTML = 'Archivo: '
            document.getElementById('btnCargar').disabled = true
        }
    }

    const onBuscarArchivo = () =>document.getElementById('fileCargado').click()
    const onConfirmaCarga = () => setConfirmCargar({...confirmCargar, show: true})
    const onCancelCarga   = () => setConfirmCargar({...confirmCargar, show: false})

    const onImportar = () =>{
        setCargando(true)
        const idProyecto = document.getElementById('idProyecto').value
        const idEspecialidad = document.getElementById('idEspecialidad').value
        
        const objDatos = {
            idProyecto: idProyecto,
            idEspecialidad: idEspecialidad,
            actividades: datosCargaMasiva,
        }

        const enviarDatos = async ()=>{
            const resultado = await GuardarCargaMasiva(objDatos, ()=>console.log, setCrudEjecutadoBien)
            setCargando(false)
            onCancelCarga()
        }
        enviarDatos()

    }

    const onConfirmGuardar = () =>{
        setConfirmCargar({...confirmCargar, show: false})
        if(crudEjecutadoBien.tipoMensaje==='success'){
            onCerrar()
        }
        setCrudEjecutadoBien({titulo:'', mensaje: '',mostrar: false, tipoMensaje: ''})
    }

    const onCambiarEspecialidad = (e) => {
        setSelectCombos({
            ...selectCombos,
            especialidad: e.target.value
        })
        if( e.target.value!=='Seleccionar'&& selectCombos.proyecto!=='Seleccionar'){
            document.getElementById('btnBuscar').disabled = false
        }else{
            document.getElementById('btnBuscar').disabled = true
        }
    }

    const onCambiarProyecto = (e) => {
        setSelectCombos({
            ...selectCombos,
            proyecto: e.target.value
        })
        if(selectCombos.especialidad!=='Seleccionar'&&  e.target.value!=='Seleccionar'){
            document.getElementById('btnBuscar').disabled = false
        }else{
            document.getElementById('btnBuscar').disabled = true
        }
    }

    const titulo =  <div>
                        <label style={{fontSize: '1.2rem'}}>Importar Actividades 3W</label>
                        <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={onCerrar}>Cerrar</button>
                    </div>

   
    return <div>
                <SweetAlert
                    show={props.cargaMasiva.show}
                    title={titulo}
                    onConfirm={()=>null}
                    showCancel={false}
                    showConfirm={false}
                    confirmBtnText={"Aceptar"}
                    closeOnClickOutside={false}
                    showCloseButton={true}>
                        <label style={{float: 'left'}}>Proyecto:</label>
                        <select id="idProyecto" className="form-select" value={selectCombos.proyecto} onChange={onCambiarProyecto}>
                                {listaCombos!== undefined &&
                                 listaCombos.filter(opcion=>opcion.nombre==='idProyecto')
                                            .map(function(opcion,index){
                                                return <option value={opcion.id}>{opcion.descripcion}</option>
                                            })
                                }
                        </select>
                        <br/>
                        <label style={{float: 'left'}}>Especialidad:</label>
                        <select id="idEspecialidad" className="form-select" value={selectCombos.especialidad} onChange={onCambiarEspecialidad}>
                        {listaCombos!== undefined &&
                                 listaCombos.filter(opcion=>opcion.nombre==='idEspecialidad')
                                            .map(function(opcion,index){
                                                return <option value={opcion.id}>{opcion.descripcion}</option>
                                            })
                                }
                        </select>
                        <br/>
                        <div>
                            <label id="nombreArchivo" style={{float: 'left', margin:'20px'}}>Archivo: </label>
                            <input id='fileCargado' type="file" accept=".xlsx" onChange={onExcel} hidden/>
                            <div style={{float:'right'}}  >
                                <button id="btnBuscar" className="btn btn-link" onClick={() =>onBuscarArchivo()}>
                                    <FaSearch className="tamanoImg"/><br/>
                                    Buscar
                                </button>
                                <button id="btnCargar" className="btn btn-link" onClick={() =>onConfirmaCarga()} >
                                    <FaUpload className="tamanoImg"/><br/>
                                    Cargar
                                </button>
                            </div>
                        </div>
                </SweetAlert>
                <SweetAlert
                    show={confirmCargar.show}
                    warning
                    title={"Confirmación"}
                    onConfirm={() =>onImportar()}
                    onCancel={() =>onCancelCarga()}
                    showCancel={true}
                    confirmBtnText={"Confirmar"}
                    cancelBtnText={"Cancelar"}
                    closeOnClickOutside={false}
                    showCloseButton={true}>
                        {cargando && <Cargando />}
                        {!cargando && <p>{confirmCargar.mensaje}</p>}
                </SweetAlert>
                <SweetAlert
                    show={crudEjecutadoBien.mostrar}
                    danger={crudEjecutadoBien.tipoMensaje==='warning'?true:false}
                    success={crudEjecutadoBien.tipoMensaje==='success'?true:false}
                    title={crudEjecutadoBien.titulo}
                    onConfirm={()=>onConfirmGuardar()}
                    confirmBtnText={"Aceptar"}
                    closeOnClickOutside={false}
                    showCloseButton={true}>
                        <div style={{maxHeight:'200px', overflow:'scroll'}}>
                            {typeof crudEjecutadoBien.mensaje==='object' &&
                                crudEjecutadoBien.mensaje.map(msj=>{
                                    return <p>Linea {msj.linea} - {msj.mensaje}</p>
                                })
                            }
                            {typeof crudEjecutadoBien.mensaje==='string' &&
                                <p>{crudEjecutadoBien.mensaje}</p>
                            }
                        </div>
                </SweetAlert>
            </div>
}
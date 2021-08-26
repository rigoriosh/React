import React from 'react'
import {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import { FaAngleDown, FaSearch} from 'react-icons/fa'
import {GetDatosMaestra} from '../../componentes/ConsumirApiRest'

export default function ArbolDatos(props){
    
    const [listadoArbol, setListadoArbol] = useState([])
    const [originalArbol, setOriginalArbol] = useState([])
    const [valorFiltro, setValorFiltro] = useState(null)
    const [listaCombos,setListaCombos] = useState([])
    const [selectCombos, setSelectCombos] = useState({proyecto:'Seleccionar',especialidad:'Seleccionar',periodo:'Seleccionar'})

    let objetoArbol = [];
    let objetoSeleccionado = []
    props.arbol.forEach((registro)=>{
        //Verifica si existe el id en el objeto objetoArbol
        const resultado = objetoArbol.find( rama => rama.padre===registro.padre);
        //No existe agrega (padre)
        if(!resultado){
            objetoArbol.push({padre:registro.padre,
                              hijo:[{id:registro.id, 
                                     incidencia:registro.incidencia, 
                                     descripcion:registro.descripcion,
                                     idProyecto:registro.idProyecto,
                                     idEspecialidad:registro.idEspecialidad,
                                     rangoFecha:registro.rangoFecha}]})
        }else{//Existe lo actualiza (Hijo)
            const index = objetoArbol.findIndex(rama => rama.padre === registro.padre )
            objetoArbol[index].hijo.push({id:registro.id, 
                                          incidencia:registro.incidencia, 
                                          descripcion:registro.descripcion,
                                          idProyecto:registro.idProyecto,
                                          idEspecialidad:registro.idEspecialidad,
                                          rangoFecha:registro.rangoFecha})
        }
        objetoSeleccionado.push({estado:false, idSelect: registro.id})
        
        
    })
    let [registroChecked, setRegistroChecked] = useState(objetoSeleccionado)
    const abrirArbol = (identificador) =>{
        let hijorRama = document.getElementById(identificador)
        hijorRama.hidden=hijorRama.hidden?false:true
    }

    const onFiltrarArbol = (e) =>{
        setValorFiltro(e.target.value)
    }

    const onCambiarEspecialidad = (e) => {
        setSelectCombos({
            ...selectCombos,
            especialidad: e.target.value
        })
    }

    const onCambiarProyecto = (e) => {
        setSelectCombos({
            ...selectCombos,
            proyecto: e.target.value
        })
    }

    const onCambiarPeriodo = (e) => {
        setSelectCombos({
            ...selectCombos,
            periodo: e.target.value
        })
    }

    const onChangeCheck = (id) => {
        let campoSelect = document.getElementById(id)
        console.log(campoSelect)
        if(campoSelect.checked){
            registroChecked.map((obj,idRow)=>{
                registroChecked[idRow] = {...registroChecked[idRow], estado:false}

                let item = document.getElementById(registroChecked[idRow].idSelect)
                if(item!==null) {
                    item.checked = false
                    if(registroChecked[idRow].idSelect===id){
                        registroChecked[idRow] = {...registroChecked[idRow], estado:true}
                        item.checked = true
                        props.setIdAbrirActividad(old=>{return registroChecked[idRow].idSelect})
                    }
                }
            })
        }else{
            campoSelect.checked = false
            props.setIdAbrirActividad(old=>{return null})
        }
    }

    useEffect(() => {
        let datosArbol = []
        let arbol = []
        if(valorFiltro!==null||selectCombos.proyecto!=='Seleccionar'||selectCombos.especialidad!=='Seleccionar'){
            arbol = [...originalArbol]
            
            if(selectCombos.proyecto!=='Seleccionar')
                arbol = arbol.filter(objArbol => {
                        let hijo = objArbol.hijo
                        let estado = false
                        for(let i=0;i < hijo.length;i++){
                            if(hijo[i]!==undefined&&hijo[i].idProyecto === selectCombos.proyecto){
                                estado = true
                            }
                        }
                        return estado
                    }
                )

            if(selectCombos.especialidad!=='Seleccionar')
                arbol = arbol.filter((objArbol,idRow) => {
                        let hijo = objArbol.hijo
                        let estado = false
                        for(let i=0;i < hijo.length;i++){
                            if(hijo[i]!==undefined&&hijo[i].idEspecialidad === selectCombos.especialidad){
                                estado = true
                            }
                        }
                        return estado
                    }
                )

            if(selectCombos.periodo!=='Seleccionar')
                arbol = arbol.filter(objArbol => {
                        let hijo = objArbol.hijo
                        let estado = false
                        for(let i=0;i < hijo.length;i++){
                            if(hijo[i]!==undefined&&hijo[i].periodo === selectCombos.periodo){
                                estado = true
                            }
                        }
                        return estado
                    }
                )

            if(valorFiltro!==null)
                arbol = arbol.filter(objArbol => objArbol.padre.includes(valorFiltro))
            
        }else{
            arbol=objetoArbol
            setOriginalArbol(objetoArbol)
        }

        datosArbol = arbol.map(rama=>{
            return  <div>
                        <a onClick={()=>abrirArbol(rama.padre)}>
                            <FaAngleDown />
                            <b>{rama.padre}</b>
                        </a>
                        <Table id={rama.padre} hidden>{rama.hijo.map((datosHijo,index)=>{
                            return <tr className="border">
                                    <td style={{paddingLeft:'20px', paddingRight:'10px', width:'50px'}}>
                                        <input id={datosHijo.id} 
                                               type="checkbox" 
                                               onChange={()=>onChangeCheck(datosHijo.id)}
                                               value={registroChecked[index].estado}
                                               />
                                    </td>
                                    <td > {datosHijo.descripcion} </td>
                                    <td style={{width:'80px'}}> <b>{datosHijo.incidencia}</b> </td>
                                </tr>
                        })}</Table>
                    </div>
        })
        setListadoArbol(datosArbol)

        if(valorFiltro===null && selectCombos.proyecto==='Seleccionar'){
            const cargarCombos= async () =>{
                let microServicio = null
                let loginUser = JSON.parse(window.localStorage.getItem('logearUsuario'))
                let menu = loginUser.perfilUsuario.menu
                for(let obj of menu){
                    if(obj.pantalla === 'Carga Masiva'){
                        microServicio = obj.microServicio
                        break
                    }
                }

                const obj = {configuracion:{ microServicio: microServicio}}
                let apiActividades = JSON.parse(window.localStorage.getItem('actividades'))
                setListaCombos(apiActividades.objetosDataColumn.filter(obj=>obj.activo))
            }
            cargarCombos()
        }

    },[valorFiltro, selectCombos.proyecto, selectCombos.especialidad, selectCombos.periodo])

    return <div>
                <div className="row">
                    <div className="col-4">
                        <label style={{float: 'left'}}>Proyecto:</label>
                        <select id="idProyectoArbol" className="form-select" value={selectCombos.proyecto} onChange={onCambiarProyecto}>
                                {listaCombos!== undefined &&
                                    listaCombos.filter(opcion=>opcion.nombre==='idProyecto')
                                            .map(function(opcion,index){
                                                return <option value={opcion.id}>{opcion.descripcion}</option>
                                            })
                                }
                        </select>
                    </div>
                    <div className="col-4">
                        <label style={{float: 'left'}}>Especialidad:</label>
                        <select id="idEspecialidadArbol" className="form-select" value={selectCombos.especialidad} onChange={onCambiarEspecialidad}>
                        {listaCombos!== undefined &&
                                    listaCombos.filter(opcion=>opcion.nombre==='idEspecialidad')
                                            .map(function(opcion,index){
                                                return <option value={opcion.id}>{opcion.descripcion}</option>
                                            })
                                }
                        </select>
                    </div>
                    <div className="col-4">
                        <label style={{float: 'left'}}>Periodo:</label>
                        <select id="idPeriodoArbol" className="form-select" value={selectCombos.periodo} onChange={onCambiarPeriodo}>
                        {listaCombos!== undefined &&
                                    listaCombos.filter(opcion=>opcion.nombre==='RangoFecha')
                                            .map(function(opcion,index){
                                                return <option value={opcion.id}>{opcion.descripcion}</option>
                                            })
                                }
                        </select>
                    </div>
                </div>
                <div className="col-auto mt-2">
                    <div className="input-group mb-2">
                        <span className="input-group-text">
                            <FaSearch/>
                        </span>
                        <input type="text" 
                               className="form-control" 
                               id="inlineFormInputGroup" 
                               placeholder="Filtrar el árbol"
                               onChange={onFiltrarArbol}/>
                    </div>
                </div>
                <div className="border" style={{overflow:'scroll',height: '50vh'}}>{listadoArbol}</div>
           </div>
}
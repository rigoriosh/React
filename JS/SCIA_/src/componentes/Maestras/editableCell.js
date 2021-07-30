import React, {useEffect, useState} from 'react'
import { FaEdit, FaTrash, FaSave, FaTimes} from 'react-icons/fa'

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData}) => {
    
    const [value, setValue] = useState(initialValue)
    const [valueSelect, setValueSelect] = useState(null)
    const [valueCheck, setValueCheck] = useState(null)

    if(typeof initialValue  === 'object' && initialValue!==null){
        if(initialValue.tipo === 'guid' && valueSelect===null)
            setValueSelect(old=>initialValue.valor)
        if(initialValue.tipo === 'bool' && valueCheck===null)
        setValueCheck(old=>initialValue.valor)
    }
    
    const [txtSelect,setTxtSelect] = useState('')
    
    const onEliminar = (e) => updateMyData(index, id, value, 'eliminarRegistro')
    const onCancelar = () => updateMyData(index, id, value, 'cancelarNuevoRegistro')
    const onGuardar = () => updateMyData(index, id, value, 'guardar')
    const onGuardarEdicion = () => updateMyData(index, id, value, 'guardarModificacion')
    const onCancelarEdicion = () => updateMyData(index, id, value, 'cancelarModificacion')
    const onModificar = () => updateMyData(index, id, value, 'modificar')
    const onBlur = () => updateMyData(index, id, value)

    const onChange = (e) => {
        value.valor = e.target.value
        updateMyData(index, id, value)
    }

    const onModificarSelect = (e) => {
        let opciones = e.target.options
        setTxtSelect(opciones[opciones.selectedIndex].text)

        value.valor = e.target.value
        setValueSelect(e.target.value)
        updateMyData(index, id, value)
    }

    const onModificarCheck= (e) => {
        value.activo = e.target.checked
        setValueCheck(e.target.checked)
        updateMyData(index, id, value)
    }

    const onCambiarImagen = (idImagen) => {
        updateMyData(index, idImagen, value,'cambiarImagen')
    }

    useEffect(() => { setValue(initialValue) }, [initialValue])

    if(value!==null && typeof value === 'object'){
        if(value.tipo==='bool'){
            return <div><input className="form-check-input" 
                            type="checkbox" 
                            id={index} 
                            style={{float: 'none', height: '20px', width: '20px', border: '2px solid'}} 
                            checked={valueCheck}
                            onChange={onModificarCheck}
                            disabled={value.editable?false:true}/>
                        <div hidden>{(valueCheck)?'si':'no'}</div>
                    </div>
        }else if(value.tipo==='string' && value.editable===true){
            return <input id={index}  onChange={onChange} onBlur={onBlur} value={value.valor} readOnly={value.editable?null:"readOnly"}/>
        }else if(value.tipo==='boton'){
                return  <div className="btn-group mt-1 col-12" role="group" aria-label="Basic outlined example">
                            {value.modificar &&  <button className="btn btn-outline-primary p-1" type="button" onClick={onModificar} disabled={value.disabled}>
                                                            <FaEdit/>
                                                        </button>
                            }
                            {value.eliminar &&   <button className="btn btn-outline-danger p-1" type="button" onClick={onEliminar} disabled={value.disabled}>
                                                            <FaTrash/>
                                                        </button>
                            }
                            {value.guardar &&    <button className="btn btn-outline-success p-1 m-0" type="button" onClick={onGuardar} disabled={value.disabled}>
                                                            <FaSave/>
                                                        </button>
                            }
                            {value.guardarEdicion &&    <button className="btn btn-outline-success p-1 m-0" type="button" onClick={onGuardarEdicion} disabled={value.disabled}>
                                                            <FaSave/>
                                                        </button>
                            }
                            {value.cancelar &&   <button className="btn btn-outline-secondary p-1 m-0" type="button" onClick={onCancelar} disabled={value.disabled}>
                                                            <FaTimes/>
                                                        </button>
                            }
                            {value.cancelarEdicion &&   <button className="btn btn-outline-secondary p-1 m-0" type="button" onClick={onCancelarEdicion} disabled={value.disabled}>
                                                            <FaTimes/>
                                                        </button>
                            }
                        </div>
        }else if(value.tipo==='guid'){
            return <div>
                        <select onChange={onModificarSelect} value={valueSelect}  id={index}>
                            {value.opciones.map(function(dato,i){
                                return <option value={value.idsOpcion[i]}>{dato}</option>
                            })}
                        </select>
                        <div hidden>{txtSelect}</div>
                   </div>
        }else if (value.tipo==='date'){
            return <input id={index} type="datetime-local" value={value.valor} onChange={onChange}/>
        }else if (value.tipo==='email'){
            return <input id={index} type="email" value={value.valor} onChange={onChange}/>
        }else if (value.tipo==='link'){
            return <div>
                    {value.editable &&
                        <button className="btn btn-link p-0" onClick={()=>onCambiarImagen(`previewImagen${index}`)}>
                            <img id={`previewImagen${index}`} src={value.valor} alt="" style={{width:'50px',height:'50px'}}></img>
                        </button>
                    }
                    {(value.valor !== undefined && !value.editable) &&
                       <img id={`previewImagen${index}`} src={value.valor} alt="" style={{width:'50px',height:'50px'}}></img>
                    }
                  </div>
        }
    }
    return <div>{value}</div>
}


export default EditableCell
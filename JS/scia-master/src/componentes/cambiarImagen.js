import React from 'react'
import {useState} from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { FaSearch, /* FaTrash, */ FaSave} from 'react-icons/fa'

export const CambiarImagen = (props) => {

    const [img,setImag] = useState(null)
    const [nombreImagen, setNombreImagen] = useState(null)

    const onBtnAceptar = () => {
         let preview = document.getElementById(props.cambiarImagen.idImagenCambiar)
         preview.src =  img
         props.setCambiarImagen({...props.cambiarImagen, show:false, nombre:nombreImagen})
         setImag(null)
         setNombreImagen(null)
    }

    const onBtnCancelar = () => {
        setImag(null)
        setNombreImagen(null)
        props.setCambiarImagen({...props.cambiarImagen, show:false, nombre: null})
    }

    const onSelectImagen = (e) => {
         const archivo = document.getElementById('fileCargado').files
         setNombreImagen(archivo[0].name)
         setImag(URL.createObjectURL(archivo[0]))
    }

    const onCambiarImagen = () =>{
        document.getElementById('fileCargado').click()
    }

    return <SweetAlert
                show={props.cambiarImagen.show}
                title={'Cambiar Imagen'}
                onCancel={()=>onBtnCancelar()}
                showCancel={true}
                showConfirm={false}
                cancelBtnText={"Cancelar"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={()=>onCambiarImagen()}><FaSearch/> Buscar Imagen</button>
                        <br/>
                        <img id="imgCargaPrevia"  className="p-5" src={img} alt="" style={{width:'100%',height:'100%'}}></img>
                        <br/>
                        <input id='fileCargado' type="file" accept=".png" onChange={onSelectImagen} hidden/>
                        <br/>
                        <button className="btn btn-primary mx-3" onClick={()=>onBtnAceptar()}><FaSave/> Cambiar</button>
                    </div>
                </SweetAlert>
}



export const getBase64Image = (img) =>{
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
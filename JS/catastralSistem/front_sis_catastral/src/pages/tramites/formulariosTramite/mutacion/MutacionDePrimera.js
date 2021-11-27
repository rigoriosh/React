import React from 'react'
import { FieldSelect } from '../../../../componets/FieldSelect'
import { FieldTextWidtLabel } from '../../../../componets/FieldTextWidtLabel'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import Salir_Icon from '../../../../assets/Iconos/Salir_Icon.png'
import { stylesApp } from '../../../../helpers/utils';


export const nota1 = () => {
    return (
        <div>
            <p className="labels1" style={{fontWeight:'bold'}}>¡Recuerda que debes adjuntar todos los archivos para que el trámite sea exitoso!</p> <br />
            <p className="labels1">Copia de la cédula de ciudadania o documento de identidad del propietario, poseedor, ocupante y/o apoderado.</p><br />
            <p className="labels1">Cambio de propietario: Copia del título de dominio (Escritura Pública. Acto administrativo o Sentencia) debidamente registrado.</p><br />
            <p className="labels1">Cambio de poseedor u ocupante: Documentos que establezcan la posesión u ocupación como constancias de pago de impuestos, servicios públicos, contribuciones, valorización etc</p><br />
            <p className="labels1">El cambio de nombre entre poseedores u ocupantes estará sujeto al estudio de los documentos aportados por el solicitante.</p>
        </div>
    )
}

export const MutacionDePrimera = ({
    handleFormChange,
    formularioTramite,
    setFormularioTramite,
    tiposDeSuelo,
    municipios,
}) => {

    const {fichaCatastral, matricula, tipoDeSuelo, municipio, files, } = formularioTramite;


    const fileHandler = ({target}) => {
        console.log(target)
        const file = target.file[0];
    }

    const onSubmit = (e)=> {
        e.preventDefault();
        console.log('onSubmit')
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">DATOS DEL INMUEBLE</p>
            </div>
            <FieldTextWidtLabel
                label={'Ficha Catastral'}
                value={fichaCatastral.value} 
                name={fichaCatastral.name}
                messageValidate={fichaCatastral.validation}
                required={true}
                handleChange={(target)=>{handleFormChange(target)}}
            />
            <FieldTextWidtLabel
                label={'Matricula'}
                value={matricula.value} 
                name={matricula.name}
                messageValidate={matricula.validation}
                required={true}
                handleChange={(target)=>{handleFormChange(target)}}
            />
            <div style={{display:'flex', width:'100%'}}>
                <FieldSelect
                    label={'Tipo de suelo'}
                    value={tipoDeSuelo}
                    options={tiposDeSuelo} 
                    handleOnchange={(target)=>{handleFormChange(target)}} 
                    messageValidate={tipoDeSuelo.validation}
                    name={tipoDeSuelo.name}
                    styleOwn={{width:'50%'}}
                    required={true}
                />
                
                <FieldSelect
                    label={'Municipio'}
                    value={municipio.value}
                    options={municipios} 
                    handleOnchange={(target)=>{handleFormChange(target)}} 
                    messageValidate={municipios.validation}
                    name={municipios.name}
                    styleOwn={{width:'50%', marginLeft:'10px'}}
                    required={true}
                />
            </div>
            <div className="row contenTitulo" style={{marginTop:'10px', justifyContent:'space-between'}}>
                <div className="row contenTitulo">
                    <div className="decorationTitle bgc3"></div>
                    <p className="titulo color3">OTROS</p>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <input type="file" name="file" id="file" accept=".zip, .rar" onChange={(e)=>fileHandler(e)} style={{display:'none'}}/>
                    <label htmlFor="file" className="row aicenter">
                        <p className="labels pointer">Adjuntar archvio</p>
                        <IconButton id='file' color="primary" aria-label="upload picture" component="span">
                            <AttachFileIcon />
                        </IconButton>
                    </label>
                </div>
            </div>

            <div>
                <FieldTextWidtLabel value={''} ph="Adjunte en este campo los documentos solicitados en un archivo .ZIP o .RAR"
                    name="fichaCatastral" label={''} messageValidate={''}
                    handleChange={({value})=>console.log(value)} />
                
                <div className="nota">
                    {nota1()}
                </div>
                <button type="submit"  className='btnAceptar'>CREAR TRÁMITE</button>
                <div style={{display:'flex', justifyContent:'center'}} onClick={()=>{/* setOpenDialog({open:true, msg :textosInfoWarnig.cancelarRegistro, tittle:''}) */}}>
                    <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                    <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Volver atrás</p>
                </div>
            </div>
            
        </form>
    )
}

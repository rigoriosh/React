import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import Salir_Icon from '../../../assets/Iconos/Salir_Icon.png'
import { stylesApp } from '../../../helpers/utils';
import { FieldSelect } from '../../../componets/FieldSelect';
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel';




export const SecondFormTramitre = ({
    handleFormChange,
    formularioTramite,
    tiposDeSuelo,
    municipios,
    setFormularioTramite,
    avancePagina,
    onSubmitFinal,
}) => {

    const {
        fichaCatastral,
        matricula,
        tipoDeSuelo,
        municipio,
        file,
        tipoTramite,
        propiedadHorizontal,
        motivoSolicitud,
        proyectoUrbanistico,
        objetoPeticion,
        consideraMejora,
        avaluoTerreno,
        avaluoConstruccion,
        areaTerreno,
        areaConstruccion,
        autoestimacionAvaluo,
        diferenciaMayoEsta,
        revisionBusca,
        noEscrituraPublica,
        anioEscritura,
        notariaOtorgante,
        objetoRectificacion,
        municipioNotaria,
    } = formularioTramite;


    const fileHandler = ({target}) => {
        setFormularioTramite({
            ...formularioTramite,
            zip:target.files[0],
            file: {
                name:'file',
                value:target.files[0].name,
                validation:''
            }
        })

    }

    const onSubmit = (e)=> {
        e.preventDefault();
        console.log('onSubmit')
        onSubmitFinal();
        
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="row contenTitulo">
                <div className="decorationTitle bgc1"></div>
                <p className="titulo color1">DATOS DEL INMUEBLE</p>
            </div>
            {/* Aplica para todos los formularios */}
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
                    value={tipoDeSuelo.value}
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
                    messageValidate={municipio.validation}
                    name={municipio.name}
                    styleOwn={{width:'50%', marginLeft:'10px'}}
                    required={true}
                />
            </div>
            {/* Renderiza dependiendo del tipo de formulario */}

            {
                (tipoTramite.value === "MS" || tipoTramite.value === "MT" || tipoTramite.value === "MO") &&
                <div className="row" style={{marginTop:'5px'}}>
                    <FieldSelect
                        label={'Propiedad horizontal'}
                        value={propiedadHorizontal.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={propiedadHorizontal.validation}
                        name={propiedadHorizontal.name}
                        styleOwn={{width:'50%'}}
                        required={true}
                    />
                    {
                        motivoSolicitud.value === "DDP" &&
                        <FieldSelect
                            label={'Proyecto Urbanistico'}
                            value={proyectoUrbanistico.value}
                            options={[]} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={proyectoUrbanistico.validation}
                            name={proyectoUrbanistico.name}
                            styleOwn={{width:'50%', marginLeft:'10px',}}
                            required={true}
                        />
                    }
                </div>
            }   
            {
                (tipoTramite.value === "MT") &&
                <div className="row" style={{marginTop:'5px'}}>
                    <FieldSelect
                        label={'Objeto de la Petición'}
                        value={objetoPeticion.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoPeticion.validation}
                        name={objetoPeticion.name}
                        styleOwn={{width:'50%'}}
                        required={true}
                    />
                    
                    <FieldSelect
                        label={'¿Considera una mejora la mutación?'}
                        value={consideraMejora.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={consideraMejora.validation}
                        name={consideraMejora.name}
                        styleOwn={{width:'50%', marginLeft:'10px',}}
                        required={true}
                    />
                    
                </div>
            } 
            {
                (tipoTramite.value === "MC" && motivoSolicitud.value !== "RAC") &&
                    <div style={{marginTop:'5px'}}>
                        <div className="row contenTitulo">
                            <div className="decorationTitle bgc2"></div>
                            <p className="titulo color2">ÁREA</p>
                        </div>
                        <div className='row'>
                            <FieldTextWidtLabel
                                label={'Terreno'}
                                value={areaTerreno.value} 
                                name={areaTerreno.name}
                                messageValidate={areaTerreno.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconRight={true}
                            />
                            <FieldTextWidtLabel
                                label={'Construcción'}
                                value={areaConstruccion.value} 
                                name={areaConstruccion.name}
                                messageValidate={areaConstruccion.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconRight={true}
                                styleOwn={{marginLeft:'10px'}}
                            />
                        </div>
                        <div className="row contenTitulo">
                            <div className="decorationTitle bgc4"></div>
                            <p className="titulo grey2">AVALÚO COMERCIAL</p>
                        </div>
                        <div className='row'>
                            <FieldTextWidtLabel
                                label={'Terreno'}
                                value={avaluoTerreno.value} 
                                name={avaluoTerreno.name}
                                messageValidate={avaluoTerreno.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconLeft="$"
                            />
                            <FieldTextWidtLabel
                                label={'Construcción'}
                                value={avaluoConstruccion.value} 
                                name={avaluoConstruccion.name}
                                messageValidate={avaluoConstruccion.validation}
                                required={true}
                                handleChange={(target)=>{handleFormChange(target)}}
                                type="number"
                                whitIconLeft="$"
                                styleOwn={{marginLeft:'10px'}}
                            />
                        </div>
                        <FieldTextWidtLabel
                            label={'Autoestimación Total del Avalúo'}
                            value={autoestimacionAvaluo.value} 
                            name={autoestimacionAvaluo.name}
                            messageValidate={autoestimacionAvaluo.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            type="number"
                            whitIconLeft="$"
                        />
                    </div>
            }
            {
                (tipoTramite.value === "MC" && motivoSolicitud.value === "RAC") &&
                <div>
                    <FieldSelect
                        label={'Considera que la diferencia mayor esta en'}
                        value={diferenciaMayoEsta.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={diferenciaMayoEsta.validation}
                        name={diferenciaMayoEsta.name}
                        styleOwn={{width:'100%',marginTop:'5px'}}
                        required={true}
                    />
                    <FieldSelect
                        label={'La revisión busca'}
                        value={revisionBusca.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={revisionBusca.validation}
                        name={revisionBusca.name}
                        styleOwn={{width:'100%',marginTop:'5px'}}
                        required={true}
                    />
                </div>
            }
            {
                ((tipoTramite.value === "MQ" || 
                (tipoTramite.value === "RE" && motivoSolicitud.value !== "ACN"))  ) &&
                <div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldTextWidtLabel
                            label={'Número de Escritura Pública RPH'}
                            value={noEscrituraPublica.value} 
                            name={noEscrituraPublica.name}
                            messageValidate={noEscrituraPublica.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                        />
                        <FieldTextWidtLabel
                            label={'Año de la Escritura'}
                            value={anioEscritura.value} 
                            name={anioEscritura.name}
                            messageValidate={anioEscritura.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            styleOwn={{width:'60%', marginLeft:'10px'}}
                        />
                    </div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldTextWidtLabel
                            label={'Notaria Otorgante'}
                            value={notariaOtorgante.value} 
                            name={notariaOtorgante.name}
                            messageValidate={notariaOtorgante.validation}
                            required={true}
                            handleChange={(target)=>{handleFormChange(target)}}
                            whitIconLeft="#"
                        />
                        <FieldSelect
                            label={'Municipio de la Notaria'}
                            value={municipioNotaria.value}
                            options={[]} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={municipioNotaria.validation}
                            name={municipioNotaria.name}
                            styleOwn={{width:'100%', marginLeft:'10px'}}
                            required={true}
                        />
                    </div>
                    
                </div>
            }
            {
                (tipoTramite.value === "MQ") &&
                <div>
                    <div className="row" style={{marginTop:'5px'}}>
                        <FieldSelect
                            label={'Especificación del Trámite Solicitado'}
                            value={diferenciaMayoEsta.value}
                            options={[]} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={diferenciaMayoEsta.validation}
                            name={diferenciaMayoEsta.name}
                            styleOwn={{width:'100%',}}
                            required={true}
                        />
                        <FieldSelect
                            label={'Motivo de la Solicitud'}
                            value={diferenciaMayoEsta.value}
                            options={[]} 
                            handleOnchange={(target)=>{handleFormChange(target)}} 
                            messageValidate={diferenciaMayoEsta.validation}
                            name={diferenciaMayoEsta.name}
                            styleOwn={{width:'100%', marginLeft: '10px'}}
                            required={true}
                        />
                    </div>
                </div>
            }
            
            {
                (tipoTramite.value === "RE" && (motivoSolicitud.value === "RUD" ||
                motivoSolicitud.value === "RAT") ) &&
                <div className="row">
                   { motivoSolicitud.value === "RAT" &&
                    <FieldSelect
                        label={'Motivo de la Solicitud'}
                        value={objetoRectificacion.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoRectificacion.validation}
                        name={objetoRectificacion.name}
                        styleOwn={{width:'100%', marginRight:'10px'}}
                        required={true}
                    />}
                    <FieldSelect
                        label={'Objeto de Rectificación'}
                        value={objetoRectificacion.value}
                        options={[]} 
                        handleOnchange={(target)=>{handleFormChange(target)}} 
                        messageValidate={objetoRectificacion.validation}
                        name={objetoRectificacion.name}
                        styleOwn={{width:'100%', }}
                        required={true}
                    />
                    
                </div>
            }

            {
                (tipoTramite.value === "SC" && (motivoSolicitud.value === "SCPPC") ) &&

                <FieldSelect
                    label={'Motivo de la Solicitud'}
                    value={diferenciaMayoEsta.value}
                    options={[]} 
                    handleOnchange={(target)=>{handleFormChange(target)}} 
                    messageValidate={diferenciaMayoEsta.validation}
                    name={diferenciaMayoEsta.name}
                    styleOwn={{width:'100%', marginTop:'5px' /* marginLeft: '10px' */}}
                    required={true}
                />
            }








            {/* Aplica para todos los formularios */}
            <div className="row contenTitulo" style={{marginTop:'10px', justifyContent:'space-between'}}>
                <div className="row contenTitulo">
                    <div className="decorationTitle bgc3"></div>
                    <p className="titulo color3">OTROS</p>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <input type="file" name="file" id="file" accept=".zip, .rar" 
                        onChange={(e)=>fileHandler(e)} style={{display:'none'}}
                    />
                    <label htmlFor="file" className="row aicenter">
                        <p className="labels pointer">Adjuntar archvio</p>
                        <IconButton id='file' color="primary" aria-label="upload picture" component="span">
                            <AttachFileIcon />
                        </IconButton>
                    </label>
                </div>
            </div>

            <div>
                <FieldTextWidtLabel
                    value={file.value}
                    ph="Adjunte en este campo los documentos solicitados en un archivo .ZIP o .RAR"
                    name={file.name}
                    label={''}
                    messageValidate={file.validation}
                    // handleChange={({value})=>console.log(value)}
                    required={true}
                    // disabled={true}
                />
                <button type="submit"  className='btnAceptar'>CREAR TRÁMITE</button>
                <div style={{display:'flex', justifyContent:'center'}} 
                    onClick={()=>{avancePagina(true, false)}}
                    >
                    <img src={Salir_Icon} alt="" style={{cursor:'pointer', width:'20px', alignSelf:'center'}}/>
                    <p style={{alignSelf:'end', fontSize:'12px', margin:'5px 0',color:stylesApp.gray1, cursor:'pointer'}}>Volver atrás</p>
                </div>
            </div>
            
        </form>
    )
}

import React from 'react'
import { FieldInput } from '../../../componets/FieldInput'

export const ModeTramiteDetalle = ({formularioTramite}) => {
    const {
        avaluoTerreno,
        avaluoConstruccion,
        anioEscritura,
        areaTerreno,
        areaConstruccion,
        autoestimacionAvaluo,
        consideraMejora,
        ConsideraUnaMejoraLaMutacion,
        ConsideraQueLaDiferenciaMayorEstaEn,
        diferenciaMayoEsta,
        fichaCatastral,
        file,
        LaRevisionBusca,
        matricula,
        municipio,
        modoTramite,
        motivoSolicitud,
        municipioNotaria,
        MunicipioDeLaNotaria,
        motivoDeLaSolicitud,
        MotivosSolicitud,
        noEscrituraPublica,
        notariaOtorgante,
        tipoDeSuelo,
        tipoTramite,
        propiedadHorizontal,
        proyectoUrbanistico,
        prediosAsociados,
        revisionBusca,
        objetoPeticion,
        ObjetosDeLaPeticion,
        objetoRectificacion,
        TiposInscripcion,
        tipoInscripcion,
        ObjetosRectificacion,
    } = formularioTramite;
    return (
        <div style={{width:'100%'}}>
            <div className="row">
                {
                    (propiedadHorizontal.value !== '' && propiedadHorizontal.value !== null) &&
                        <FieldInput
                            disabled={true}
                            label="Propiedad horizontal"
                            value={propiedadHorizontal.value === 'S' ? 'Si' : 'NO'}
                            tipo="input"
                        />
                }
                {
                    (proyectoUrbanistico.value !== '' && proyectoUrbanistico.value !== null) &&
                        <FieldInput
                            disabled={true}
                            label="Proyecto Urbanistico"
                            value={proyectoUrbanistico.value === 'S' ? 'Si' : 'NO'}
                            tipo="input"
                            styleOwn={{marginLeft: propiedadHorizontal.value !== '' ? '10px':'0'}}
                        />
                }
                {
                    (consideraMejora.value !== ''&&consideraMejora.value !== null) &&
                        <FieldInput
                            disabled={true}
                            label="¿Considera una mejora la mutación?"
                            value={consideraMejora.value}
                            tipo="input"
                            styleOwn={{marginLeft: (proyectoUrbanistico.value !== '' && proyectoUrbanistico.value !== null) ? '10px':'0'}}
                        />
                }
            </div>
            <div className="row">
                {
                    (noEscrituraPublica.value !== ''&&noEscrituraPublica.value !== null) &&
                        <FieldInput
                            disabled={true}
                            label="Número de Escritura Pública RPH"
                            value={noEscrituraPublica.value}
                            tipo="input"
                        />
                }
                {
                    anioEscritura.value !== '' &&
                        <FieldInput
                            disabled={true}
                            label="Año de la Escritura"
                            value={anioEscritura.value}
                            tipo="input"
                            styleOwn={{marginLeft: (noEscrituraPublica.value !== ''&&noEscrituraPublica.value !== null) ? '10px':'0', width:'30%'}}
                        />
                }
            </div>
            
            <div className="row">
                
                {
                    (objetoPeticion.value !== '' && objetoPeticion.value !== null) &&
                        <FieldInput
                            disabled={true}
                            label="Objeto de la Petición"
                            value={objetoPeticion.value}
                            tipo="input"
                        />
                }
            </div>
            <div className="row">
                {
                    (diferenciaMayoEsta.value !== ''&&diferenciaMayoEsta.value !==null) &&
                        <FieldInput
                            disabled={true}
                            label="Considera que la diferencia mayor esta en"
                            value={diferenciaMayoEsta.value}
                            tipo="input"
                        />
                }
                {
                    revisionBusca.value !== '' &&
                        <FieldInput
                            disabled={true}
                            label="La revisión busca"
                            value={revisionBusca.value}
                            tipo="input"
                            styleOwn={{marginLeft: (diferenciaMayoEsta.value !== ''&&diferenciaMayoEsta.value !==null) ? '10px':'0'}}
                        />
                }
            </div>
            <div className="row">
                {
                    (notariaOtorgante.value !== ''&&notariaOtorgante.value !==null) &&
                        <FieldInput
                            disabled={true}
                            label="Notaria Otorgante"
                            value={notariaOtorgante.value}
                            tipo="input"
                        />
                }
                {
                    (municipioNotaria.value !== ''&&municipioNotaria.value !==null) &&
                        <FieldInput
                            disabled={true}
                            label="Municipio de la Notaria"
                            value={municipioNotaria.value}
                            tipo="input"
                            styleOwn={{marginLeft: (notariaOtorgante.value !== ''&&notariaOtorgante.value !==null) ? '10px':'0'}}
                        />
                }
            </div>
            <div className="row">
                {
                    (tipoInscripcion.value !== ''&&tipoInscripcion.value !==null) &&
                        <FieldInput
                            disabled={true}
                            label="Tipo de inscripción"
                            value={tipoInscripcion.value}
                            tipo="input"
                            styleOwn={{width:'40%'}}
                        />
                }
                {
                    motivoDeLaSolicitud.value !== '' &&
                        <FieldInput
                            disabled={true}
                            label="Motivo de la solicitud"
                            value={motivoDeLaSolicitud.value}
                            tipo="input"
                            styleOwn={{marginLeft: (tipoInscripcion.value !== ''&&tipoInscripcion.value !==null) ? '10px':'0'}}
                        />
                }
                
            </div>
            <div className="row">
                {
                    (objetoRectificacion.value !== ''&&objetoRectificacion.value !==null) &&
                        <FieldInput
                            disabled={true}
                            label="Objeto de Rectificación"
                            value={objetoRectificacion.value}
                            tipo="input"
                        />
                }
            </div>

            {
                ((areaTerreno.value !== null&&areaTerreno.value !=='') || (areaConstruccion.value !== null&&areaConstruccion.value !=='')) &&
                    <div className="row contenTitulo" style={{marginTop:'0px'}}>
                        <div className="decorationTitle bgc2"></div>
                        <p className="titulo color2">ÁREA</p>
                    </div>
            }
            <div className="row">
                {
                    (areaTerreno.value !== null&&areaTerreno.value !=='') &&
                        <FieldInput
                            disabled={true}
                            label="Terreno"
                            value={areaTerreno.value}
                            tipo="input"
                            whitIconRight={true}
                        />
                }
                {
                    (areaConstruccion.value !== null&&areaConstruccion.value !=='') &&
                        <FieldInput
                            disabled={true}
                            label="Construcción"
                            value={areaConstruccion.value}
                            tipo="input"
                            whitIconRight={true}
                            styleOwn={{marginLeft: (areaTerreno.value !== null&&areaTerreno.value !=='') ? '10px':'0'}}
                        />
                }
            </div>
            {
                ((avaluoTerreno.value !== null&&avaluoTerreno.value !=='') ||
                 (avaluoConstruccion.value !== null&&avaluoConstruccion.value !=='') ||
                 (autoestimacionAvaluo.value !== null&&autoestimacionAvaluo.value !=='')) &&
                <div>
                    <div className="row contenTitulo" style={{marginTop:'0px'}}>
                        <div className="decorationTitle bgc4"></div>
                        <p className="titulo grey2">AVALÚO COMERCIAL</p>
                    </div>
                    <div className="row">
                        {
                            (avaluoTerreno.value !== null&&avaluoTerreno.value !=='') &&
                                <FieldInput
                                    disabled={true}
                                    label="Terreno"
                                    value={avaluoTerreno.value}
                                    tipo="input"
                                    whitIconLeft="$"
                                />
                        }
                        {
                            (avaluoConstruccion.value !== null&&avaluoConstruccion.value !=='') &&
                                <FieldInput
                                    disabled={true}
                                    label="Construcción"
                                    value={avaluoConstruccion.value}
                                    tipo="input"
                                    whitIconLeft="$"
                                    styleOwn={{marginLeft: (avaluoTerreno.value !== null&&avaluoTerreno.value !=='') ? '10px':'0'}}
                                />
                        }
                        {
                            (autoestimacionAvaluo.value !== null&&autoestimacionAvaluo.value !=='') &&
                                <FieldInput
                                    disabled={true}
                                    label="Autoestimación Total del Avalúo"
                                    value={autoestimacionAvaluo.value}
                                    tipo="input"
                                    whitIconLeft="$"
                                    styleOwn={{marginLeft: (avaluoTerreno.value !== null&&avaluoTerreno.value !=='') ? '10px':'0'}}
                                />
                        }
                    </div>

                </div>
            }
        </div>
    )
}

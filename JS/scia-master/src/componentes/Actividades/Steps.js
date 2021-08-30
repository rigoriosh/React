import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SweetAlert from 'react-bootstrap-sweetalert'

import { GuardarUnaActividad } from '../../componentes/ConsumirApiRest'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['1', '2', '3'];
}

export default function Steps({ updateStateActividades, stateActividades, cerrar, apiActividad, idActividad, setIdActividad }) {

  const [/* cargando,  */setCargando] = useState(true)
  const [crudEjecutadoBien, setCrudEjecutadoBien] = useState({accion:'', 
                                                                titulo:'', 
                                                                mensaje: '',
                                                                btnCancelar: false, 
                                                                mostrar: false,
                                                                tipoMensaje: ''
                                                            })

  let /* lblVentana = null, */ lblEliminar = null, lblSiguiente = null
  if (apiActividad !== null) {
    // lblVentana = apiActividad
    lblSiguiente = apiActividad.lblobjeto10
    // lblVentana = apiActividad.lblobjeto11
    lblEliminar = apiActividad.lblobjeto12
  }

  const { step } = stateActividades;
  const classes = useStyles();
  const steps = getSteps();

  const handleBack = () => {
    updateStateActividades('step', (step - 1))
  };

  const handleReset = () => {
    updateStateActividades('step', 0)
    cerrar()
  };

  const onClickNext = () => {
    let notificacion = null
    if (step === 0) {
      let descripcion = document.getElementById('idDescripcion')
      let unidadMedida = document.getElementById('idUnidadMedida')
      let cantidad = document.getElementById('idCantidad')
      let fechaIniProg = document.getElementById('fechaInicio')
      let fechaFinProg = document.getElementById('fechaFin')

      const objtGuardar = {
        idactividad: idActividad,
        idnotificacion: notificacion,
        descripcion: descripcion.value,
        idunidadmedida: unidadMedida.value,
        cantidad: Number(cantidad.value),
        fechainiprog: fechaIniProg.value,
        fechafinprog: fechaFinProg.value,
      }
      
      if(objtGuardar.fechainiprog!=="" && objtGuardar.fechafinprog!=="" 
          && objtGuardar.cantidad!=="" && objtGuardar.descripcion!=="" 
          && objtGuardar.idunidadmedida!=="Seleccionar"){
        
        const ejeuctarAsincrono = async () => {
          const retorno =  await GuardarUnaActividad(objtGuardar, () => console.log, setCrudEjecutadoBien,'programacion')
          if(retorno !==false){
            setIdActividad(retorno)
            updateStateActividades('step', (step + 1))
            setCargando(false)
          }
        }
        ejeuctarAsincrono()

      }
    }else if (step === 1) {
      updateStateActividades('step', (step + 1))
    }else if (step === 2) {
      const objtGuardar = {
        idactividad: idActividad,
        idnotificacion: notificacion,
        personas: document.getElementById('varPersonas').checked,
        hse: document.getElementById('varHSE').checked,
        documentos: document.getElementById('varDocumentos').checked,
        calidad: document.getElementById('varCalidad').checked,
        area: document.getElementById('varArea').checked,
        materiales: document.getElementById('varMateriales').checked,
        herarmientas: document.getElementById('varHerramientas').checked,
        equipos: document.getElementById('varEquipos').checked,    
        observacion: document.getElementById('varObservations').value,
      }

      const ejeuctarAsincrono = async () => {
        await GuardarUnaActividad(objtGuardar, () => console.log, setCrudEjecutadoBien, 'variable')
        updateStateActividades('step', (step + 1))
        setCargando(false)
      }
      ejeuctarAsincrono()
    }
  }

  const onConfirmGuardar = () => {
    setCrudEjecutadoBien({
          accion: '',
          titulo: '',
          mensaje: '',
          btnCancelar: false,
          mostrar: false,
          tipoMensaje: ''
        })
  }

  return (
    <div>
      <div className='m-2'>
        {step === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Todos los pasos completados</Typography>
            <Button className={classes.backButton} onClick={handleReset}>Cerrar</Button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button color="primary" variant="contained"
                disabled={step === 0}
                onClick={handleBack}>
                {lblEliminar}
              </Button>
              <Button variant="contained" color="primary" onClick={()=>onClickNext()}>
                {lblSiguiente}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Stepper activeStep={step} alternativeLabel className="border">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <SweetAlert
          show={crudEjecutadoBien.mostrar}
          success={crudEjecutadoBien.tipoMensaje==='success'}
          warning={crudEjecutadoBien.tipoMensaje==='warning'}
          title={crudEjecutadoBien.titulo}
          onConfirm={()=>onConfirmGuardar()}
          showCancel={crudEjecutadoBien.btnCancelar}
          confirmBtnText={"Aceptar"}
          closeOnClickOutside={false}
          showCloseButton={true}>
              <p>{crudEjecutadoBien.mensaje}</p>
          </SweetAlert>
    </div>
  );
}

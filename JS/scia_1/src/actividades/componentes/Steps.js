import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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


export default function Steps({updateStateActividades, stateActividades}) {

  const {step} = stateActividades;
  const classes = useStyles();
  //const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = (state) => {
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (step === 1.1) {
      updateStateActividades('step', 1)  
    }else{
      updateStateActividades('step', (Math.round(step) + 1))
    }
    console.log(state)
  };

  const handleBack = () => {
    console.log(22)
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    updateStateActividades('step', (Math.round(step) - 1))
  };

  const handleReset = () => {
    //setActiveStep(0);
    updateStateActividades('step', 0)
  };

  return (
    <div className={classes.root} style={{position:'relative', bottom:'0', paddingRight:'0px', marginTop:'20px'}}>
      
      <div>
        {step === steps.length ? (
          <div style={{textAlign:'center'}}>
            <Typography className={classes.instructions}>Todos los pasos completados</Typography>
            <button onClick={handleReset} type="button" class="btn btn-outline-danger btn-sm" style={{marginTop:'10px'}}>Cerrar</button>
            {/* <Button className="" onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div >
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button color="primary" variant="contained"
                disabled={step === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Eliminar Act Campo
              </Button>
              <Button variant="contained" color="primary" 
                onClick={()=>handleNext(step === steps.length - 1 ? 'Guardar' : 'Siguiente/Guardar')}>
                {step === 0 ? 'Siguiente/Guardar' : 'Guardar'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

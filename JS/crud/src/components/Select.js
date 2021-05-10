import { memo } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import '../css/seleccionar.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '-webkit-fill-available'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Seleccionar = memo(({id, label, optInit, options, referencia, handleSelect, valorSeleccionado='', requerido}) => {
    //console.log({id, label, optInit, options, referencia, handleSelect, valorSeleccionado, requerido})
    
    const classes = useStyles();

    const handleChange = ({target}) => {
        handleSelect(target.value);
    }
    return (
        
        
        <div className="columna1 ali-item-cent input">
            {/* <label htmlFor={id}>{label}</label> */}
            <div>
                {/* <select id={id}  name={id} className="select" ref={referencia}>
                    <option value={optInit}>{optInit}</option>
                    {
                        options.map((e, i) => {
                            return <option key={e+i} value={e}>{e}</option>
                        })
                    }
                </select>   */}  
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id={id}>{label}</InputLabel>    
                    <Select labelId={id} id={id} value={valorSeleccionado} onChange={handleChange} ref={referencia} label={label}
                        required={requerido}
                    >
                        
                            {
                                options.map((e, i) => {
                                    return <MenuItem key={e+i} value={e}>{e}</MenuItem>
                                })
                            }                    
                    </Select>  
                </FormControl>  
            </div>
        </div>
        
    )
})

Seleccionar.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    optInit: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    valorSeleccionado: PropTypes.string.isRequired,
    requerido: PropTypes.bool.isRequired
}

export default Seleccionar

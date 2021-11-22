import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const FieldSelect = ({label, value, handleOnchange, options, messageValidate}) => {
    return (
        <div className="fieldTextWidtLabel" style={{borderColor:'red'}}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <Select
                error={messageValidate !== ""}
                value={value}
                onChange={({target})=>handleOnchange(target)}
                name="tipoDocumento"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.valor} value={option.valor}>
                        {option.descripcionValor}
                        </MenuItem>
                    ))}
            </Select>
            {
                 messageValidate !== "" && 
                <label htmlFor="usuario" className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
            
        </div>
    )
}

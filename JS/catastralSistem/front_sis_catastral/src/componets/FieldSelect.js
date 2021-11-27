import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const FieldSelect = ({label, value, handleOnchange, options, messageValidate , name, styleOwn,
    required}) => {
    return (
        <div className="fieldTextWidtLabel" style={{...styleOwn, borderColor:'red'}}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <Select
                id={name}
                error={messageValidate !== ""}
                value={value}
                onChange={({target})=>handleOnchange(target)}
                name={name}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                required={required}
                >
                    {options.map((option) => (
                        <MenuItem key={option.valor} value={option.valor}>
                        {option.descripcionValor}
                        </MenuItem>
                    ))}
            </Select>
            {
                 messageValidate !== "" && 
                <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
            
        </div>
    )
}

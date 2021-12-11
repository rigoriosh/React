import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const FieldSelect = ({label, value, handleOnchange, options, messageValidate , name, styleOwn,
    required}) => {
    return (
        <div className="fieldTextWidtLabel" 
        style={{...styleOwn, borderColor:'red'}}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <select
                style={{borderColor: (messageValidate !== "") ? 'red' : ''}}
                className='inputSelect'
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
                        <option  key={option.valor} value={option.valor}>
                        {option.descripcionValor}
                        </option>
                    ))}
            </select>
            {
                 messageValidate !== "" && 
                <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
            
        </div>
    )
}

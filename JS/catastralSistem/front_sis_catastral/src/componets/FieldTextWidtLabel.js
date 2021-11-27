import React from 'react'
import Alert from '@mui/material/Alert';


export const FieldTextWidtLabel = ({label='El label es requerido', handleChange=()=>{}, name='',
    messageValidate='', type='text', maxLength = 30, value, styleOwn, ph, required
}) => {
    return (
        <div className="fieldTextWidtLabel" style={{...styleOwn }}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <div className="fieldText" style={{marginTop:'0px', border: messageValidate !== "" ? '1px solid red' : ''}}>
                <input
                    type={type}
                    name={name}
                    id={name}
                    onChange={({target})=>{handleChange(target)}}
                    value={value}
                    className='styleInputtext'
                    maxLength={maxLength}
                    max={maxLength}
                    placeholder={ph}
                    required={required}
                />
            </div>
            {
                 messageValidate !== "" && 
                <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
        </div>
    )
}

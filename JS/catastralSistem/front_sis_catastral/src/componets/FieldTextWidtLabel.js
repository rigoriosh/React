import React from 'react'
import Alert from '@mui/material/Alert';


export const FieldTextWidtLabel = ({label='El label es requerido', handleChange=()=>{}, name='', messageValidate='', type='text',
            maxLength = 30, value, styleOwn
}) => {
    return (
        <div className="fieldTextWidtLabel" style={{...styleOwn }}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <div className="fieldText" style={{marginTop:'0px', border: messageValidate !== "" ? '1px solid red' : ''}}>
                <input type={type} name={name} id={name} onChange={({target})=>{handleChange(target)}} value={value}
                    className='styleInputtext' /* placeholder=={name}" */ maxLength={maxLength} max={maxLength}
                />
            </div>
            {
                 messageValidate !== "" && 
                <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
            {/* {
                messageValidate !== "" && 
                    <Alert severity="error" sx={{
                        //   bgcolor: 'background.paper',
                        boxShadow: 1,
                        //   borderRadius: 1,
                        p: '0 20px',
                        minWidth: 300,
                        fontSize:'12px'
                        }}>{messageValidate}</Alert>
            } */}
        </div>
    )
}

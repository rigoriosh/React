import React from 'react'


export const FieldTextWidtLabel = ({label='El label es requerido', handleChange=()=>{}, name='',
    messageValidate='', type='text', maxLength, value, styleOwn, ph,
    required, disabled = false, whitIconRight=false, whitIconLeft="",
    showLengthCaracters = false,
}) => {
    return (
        <div className="fieldTextWidtLabel" style={{...styleOwn }}> 
            <label htmlFor="usuario" className="labels">{label}</label>
            <div className="fieldText" style={{marginTop:'0px', border: messageValidate !== "" ? '1px solid red' : ''}}>
                {
                    whitIconLeft !== "" &&
                    <p className="row">{whitIconLeft}</p>
                }
                <input
                    type={type}
                    name={name}
                    id={name}
                    onChange={({target})=>{handleChange(target)}}
                    value={value}
                    className='styleInputtext'
                    maxLength={maxLength}
                    // max={maxLength}
                    placeholder={ph}
                    required={required}
                    disabled={disabled}
                />
                {
                    whitIconRight &&
                    <p className="row">M<span style={{fontSize:'10px'}}>2</span></p>
                }
            </div>
            {
                showLengthCaracters &&
                <p className="labels">{`${value.length} Carácteres ingresados`}</p>
            }
            {
                 messageValidate !== "" && 
                <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
            }
        </div>
    )
}

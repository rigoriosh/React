import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const FieldInput = ({
    label,
    value,
    handleOnchange,
    options,
    messageValidate = '' ,
    name,
    styleOwn,
    required,
    whitIconLeft,
    whitIconRight,
    type,
    maxLength,
    placeholder,
    disabled,
    showLengthCaracters,
    rowstextArea,
    colstextArea,
    tipo = 'input', // input, select, textArea
}) => {
    return (
        <div className="fieldTextWidtLabel" 
            style={{...styleOwn, borderColor: messageValidate !== "" ?'red':''}}> 
                <label htmlFor="usuario" className="labels">{label}</label>
                {
                    tipo === 'select'
                    ?
                        <Select
                            id={name}
                            error={messageValidate !== ""}
                            value={value}
                            onChange={({target})=>handleOnchange(target)}
                            name={name}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            required={required}
                            disabled={disabled}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.valor} value={option.valor}>
                                    {option.descripcionValor}
                                    </MenuItem>
                                ))}
                        </Select>
                    : tipo === 'input'
                        ?
                            <div style={{width:'100%'}}>
                                <div className="fieldText" style={{marginTop:'0px', border: messageValidate !== "" ? '1px solid red' : ''}}>
                                    {
                                        whitIconLeft !== "" &&
                                        <p className="row">{whitIconLeft}</p>
                                    }
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        onChange={({target})=>{handleOnchange(target)}}
                                        value={value}
                                        className='styleInputtext'
                                        maxLength={maxLength}
                                        max={maxLength}
                                        placeholder={placeholder}
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
                            </div>
                        :
                        <textarea
                            onChange={({target})=>{handleOnchange(target)}}
                            className="textArea"
                            name="textarea"
                            rows={rowstextArea}
                            cols={colstextArea}
                            placeholder="Escriba en este campo las razones por las cuales está generando la solicitud."
                            required={true}
                            value={value}
                            disabled={disabled}
                        >
                    </textarea>
                }


                {
                    messageValidate !== "" && 
                    <label htmlFor={name} className="labels" style={{color:'red'}}>{messageValidate}</label>
                }


        </div>
    )
}

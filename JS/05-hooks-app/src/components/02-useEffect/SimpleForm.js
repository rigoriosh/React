
import React, { useEffect, useState } from 'react'
import { FormWithCustomeHook } from './formWithCustomHook/FormWithCustomHook';
import { Message } from './Message';

export const SimpleForm = () => {    

    const [stateForm, setsForm] = useState(
        {
            name: '',
            email: ''
        })

    const {name, email} = stateForm;

    useEffect(() => {
        //console.log(name)
        //console.log('name')
    }, [name] );

    useEffect(() => {
        //console.log('email')
        //console.log(email)
    }, [email] );

    const handledInputChange = ({target}) => {
        //console.log(target.value)
        setsForm(
            {
                ...stateForm, [target.name]: target.value
            }
        )
        
    }

    return (
        <>
        <h1>UseEffect</h1>            
        <hr/>
        
        <div className="form-group">
            <p>{name}</p>
            <input type="text" name="name" className="form-control" placeholder="Tu nombre"
                autoComplete="off" value={name} onChange={handledInputChange}/>
        </div>
        <div className="form-group">
            <p>{email}</p>
            <input type="text" name="email" className="form-control" placeholder="email@email.com"
                autoComplete="off" value={email} onChange={handledInputChange}/>
        </div>
        {(name === '123') && <Message/>}        

        <FormWithCustomeHook/>
        </>
    )
}


import React, { useEffect } from 'react'
import { useForm } from '../../../hooks/useForm';


export const FormWithCustomeHook = () => {    

    const [fields, handledInputChange] = useForm(
        {
            name: '',
            email: '',
            password: ''
        })

    const {name, email, password} = fields;

    useEffect(() => {
        //console.log('inicio monitore cambios en el campo email')
        return () => {
            //console.log('fin monitore cambios en el campo email')
        }
    }, [email])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(fields)
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>FORM WITH CUSTOME HOOK</h1>            
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

        <div className="form-group">
            <p>{password}</p>
            <input type="password" name="password" className="form-control" placeholder="************"
                value={password} onChange={handledInputChange}/>
        </div>

        <button type="submit" name="" id="" className="btn btn-primary btn-lg btn-block">Guardar</button>
        
        </form>
    )
}

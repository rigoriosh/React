import { useState } from "react"

interface FormData {email: string, nombre: string, edad: number};

export const Formulario = () => {

    const [formulario, setFormulario] = useState<FormData>({
        email: 'r@r.com', nombre: 'rigo', edad: 39
    });
    const {email, nombre, edad} = formulario

    
    return (
        <form autoComplete="off">
            <div className="mb-3">
                <label htmlFor="" className="form-label">Email:</label>
                <input value={email} onChange={({target})=> setFormulario({...formulario, email: target.value})} type="email" className="form-control" name="email"/>
                
                <label htmlFor="" className="form-label">Nombre:</label>
                <input value={nombre} onChange={({target})=> setFormulario({...formulario, nombre: target.value})} type="text" className="form-control" name="nombre"/>
                
                <label htmlFor="" className="form-label">Nombre:</label>
                <input value={edad} onChange={({target})=> setFormulario({...formulario, edad: Number(target.value)})} type="number" className="form-control" name="nombre"/>
                <br/><br/><br/>
                

                <pre>{JSON.stringify(formulario)}</pre>
            </div>
        </form>
    )
}

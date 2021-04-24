import { FormData } from "../tipos/tipos"


type argumentos = {
    formulario: FormData,
    setFormulario: (c: FormData) => void,
    label: string
}

export const Input = ({formulario, setFormulario, label}:argumentos) => {
    return (
        <>
            <label className="form-label">{label}</label>
            <input type="text" className="form-control" placeholder="Drink name" required name="name" value={formulario.nombre} onChange={s => setFormulario({...formulario, nombre: s.target.value})}/>
        </>
    )
}

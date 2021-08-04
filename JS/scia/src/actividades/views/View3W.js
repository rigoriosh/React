import React from 'react'

export const View3W = () => {

    const handleForm = (target) => {
        console.log(target.name, target.value);
    }

    return (
        <div>
            <div>
                <p style={{fontWeight:'bold'}}>Nombre Proyecto y especialidad</p>
                <select onChange={({target})=>handleForm(target)} name="projectName" className="form-select form-select-sm mb-3" aria-label=".form-select-sm ">
                    <option >Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="input-group">
                <textarea onChange={({target})=>handleForm(target)} name="activityDescription" className="form-control" aria-label="With textarea" placeholder="Descripción de la actividad" style={{height: "100px"}}></textarea>
            </div>
            <div style={{marginBottom:'15px', marginTop:'15px'}}>
                <p style={{fontSize:'small'}}>inicio Planeado: 21-mar-21   Terminó Planeado: 5-abr-21 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos rem, atque laboriosam doloremque distinctio molestias pariatur a non et maxime quibusdam reiciendis? Dolorem, totam necessitatibus tenetur quae ex maiores eveniet?</p>
            </div>
            {/* <div style={{...estilos.fila, display:'block'}}> */}
            <div>
                <p style={{fontWeight:'bold'}}>Unidad de medida</p>
                <div>
                    <select onChange={({target})=>handleForm(target)} name="unitMeasurement"  className="form-select form-select-sm mb-3" aria-label=".form-select-sm ">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div>
                <p style={{fontWeight:'bold'}}>Cantidad Programada</p>
                <div className="input-group mb-3">
                    <input onChange={({target})=>handleForm(target)} name="amount" type="number" className="form-control" placeholder="Ingresa una cantidad" aria-label="amount" aria-describedby="basic-addon1"/>
                </div>
            </div>
            <div>
                <p style={{fontWeight:'bold'}}>Inicio Programado</p>
                <div className="input-group mb-3">
                    <input onChange={({target})=>handleForm(target)} name="scheduledStart" type="datetime-local" 
                    className="form-control" aria-label="scheduledStart" aria-describedby="basic-addon1"/>
                </div>
            </div>
            <div>
                <p style={{fontWeight:'bold'}}>Fin Programado</p>
                <div className="input-group mb-3">
                    <input  onChange={({target})=>handleForm(target)} name="scheduledEnd" step={1} type="datetime-local" data-date-inline-picker="true" className="form-control" aria-label="scheduledEnd" />
                </div>
            </div>
        </div>
    )
}

/* const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'}
} */
